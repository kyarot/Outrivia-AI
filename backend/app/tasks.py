from app.services.mistral_client import mistral_service
from app.services.serpapi_client import serpapi_service
from app.services.apify_client import apify_service
from app.services.email_delivery import email_delivery_service
from app.core.database import supabase
from app.api.websockets import manager
import asyncio
import json

async def start_outreach_pipeline(goal_id: str, input_text: str):
    # 1. Intent Extraction
    await manager.send_log(goal_id, "Intent extraction started")
    params = await mistral_service.parse_intent(input_text)
    
    supabase.table("goals").update({
        "parsed_params": params,
        "status": "parsed"
    }).eq("id", goal_id).execute()
    
    await manager.send_log(goal_id, f"Intent extracted: {json.dumps(params)}")
    
    # 2. Prospect Discovery
    await manager.send_log(goal_id, "Searching LinkedIn via SerpAPI")
    raw_prospects = serpapi_service.search_linkedin(params)
    await manager.send_log(goal_id, f"Found {len(raw_prospects)} LinkedIn profiles")
    
    unique_prospects = []
    skipped_count = 0
    
    for rp in raw_prospects:
        # Deduplication check
        existing = supabase.table("prospects").select("id").eq("linkedin_url", rp["linkedin_url"]).execute()
        if existing.data:
            skipped_count += 1
            continue
            
        # Store initial prospect
        res = supabase.table("prospects").insert({
            "goal_id": goal_id,
            "linkedin_url": rp["linkedin_url"],
            "name": rp["name"],
            "status": "discovered"
        }).execute()
        
        if res.data:
            unique_prospects.append(res.data[0])
            
    await manager.send_log(goal_id, f"Skipped {skipped_count} duplicates. Processing {len(unique_prospects)} new prospects.")
    
    # 3. Enrichment & Email Discovery
    for prospect in unique_prospects:
        prospect_id = prospect["id"]
        url = prospect["linkedin_url"]
        
        await manager.send_log(goal_id, f"Scraping profile for {prospect['name']} via Apify")
        enriched_data = apify_service.enrich_profile(url)
        
        if enriched_data:
            # Update with enriched data
            supabase.table("prospects").update({
                **enriched_data,
                "status": "enriched"
            }).eq("id", prospect_id).execute()
            
            # Find Email
            email = enriched_data.get("email")
            
            if email:
                supabase.table("prospects").update({
                    "email": email,
                    "status": "ready_for_generation"
                }).eq("id", prospect_id).execute()
                await manager.send_log(goal_id, f"Email found for {enriched_data['name']}: {email}")
                
                # 4. Message Generation
                await manager.send_log(goal_id, f"Generating AI message for {enriched_data['name']}")
                msg_data = await mistral_service.generate_message(enriched_data, input_text)
                
                supabase.table("messages").insert({
                    "prospect_id": prospect_id,
                    "subject": msg_data["subject"],
                    "body": msg_data["body"],
                    "status": "draft"
                }).execute()
                
                await manager.send_log(goal_id, f"AI message generated for {enriched_data['name']}")
            else:
                await manager.send_log(goal_id, f"No email found for {enriched_data['name']}. Skipping.", level="warning")
                supabase.table("prospects").update({"status": "failed_email"}).eq("id", prospect_id).execute()
        else:
            await manager.send_log(goal_id, f"Failed to enrich profile for {url}", level="error")
            supabase.table("prospects").update({"status": "failed_enrichment"}).eq("id", prospect_id).execute()

    supabase.table("goals").update({"status": "completed"}).eq("id", goal_id).execute()
    await manager.send_log(goal_id, "Pipeline execution completed successfully")

async def send_approved_emails_task(prospect_ids: list):
    for pid in prospect_ids:
        # Fetch prospect and message
        p_res = supabase.table("prospects").select("name, email").eq("id", pid).execute()
        m_res = supabase.table("messages").select("id, subject, body").eq("prospect_id", pid).eq("status", "approved").execute()
        
        if p_res.data and m_res.data:
            prospect = p_res.data[0]
            message = m_res.data[0]
            
            send_res = email_delivery_service.send_email(prospect["email"], message["subject"], message["body"])
            
            if send_res:
                supabase.table("messages").update({"status": "sent"}).eq("id", message["id"]).execute()
