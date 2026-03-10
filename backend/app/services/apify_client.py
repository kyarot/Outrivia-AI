from apify_client import ApifyClient
from app.core.config import settings

class ApifyService:
    def __init__(self):
        self.client = ApifyClient(settings.APIFY_API_KEY)
        self.actor_id = "apimaestro/linkedin-profile-detail"

    def enrich_profile(self, linkedin_url: str) -> dict:
        # Extract username from URL
        username = linkedin_url.split("/in/")[-1].strip("/")
        
        run_input = {
            "username": username,
            "includeEmail": True
        }
        
        run = self.client.actor(self.actor_id).call(run_input=run_input)
        
        # In a real scenario, this returns a list of items or a single detail
        # We'll assume the actor returns the profile detail in the dataset
        results = list(self.client.dataset(run["defaultDatasetId"]).iterate_items())
        
        if not results:
            return {}
            
        profile = results[0]
        
        return {
            "name": profile.get("name"),
            "title": profile.get("jobTitle") or profile.get("headline"),
            "company": profile.get("company"),
            "location": profile.get("location"),
            "email": profile.get("email"),
            "skills": profile.get("skills"),
            "about": profile.get("about"),
            "profile_image": profile.get("profileImage"),
            "experience": profile.get("experience"),
            "linkedin_username": username
        }

apify_service = ApifyService()
