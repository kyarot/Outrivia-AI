from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from app.api.websockets import manager
from app.core.database import supabase
from app.models.schemas import GoalCreate, ApprovalRequest
from app.tasks import start_outreach_pipeline, send_approved_emails_task
import uuid

app = FastAPI(title="Outrivia Command Center API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Outrivia Command Center API", "status": "online"}

@app.post("/goal")
async def create_goal(goal_in: GoalCreate, background_tasks: BackgroundTasks):
    # Inserts goal into Supabase
    res = supabase.table("goals").insert({
        "input_text": goal_in.input_text,
        "status": "pending"
    }).execute()
    
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create goal")
        
    goal_id = res.data[0]["id"]
    
    # Trigger background task
    background_tasks.add_task(start_outreach_pipeline, goal_id, goal_in.input_text)
    
    return {"job_id": goal_id}

@app.websocket("/logs/{job_id}")
async def websocket_logs(websocket: WebSocket, job_id: str):
    await manager.connect(job_id, websocket)
    try:
        while True:
            await websocket.receive_text() # Keep connection alive
    except WebSocketDisconnect:
        manager.disconnect(job_id, websocket)

@app.get("/prospects/{job_id}")
async def get_prospects(job_id: str):
    res = supabase.table("prospects").select("*").eq("goal_id", job_id).execute()
    return res.data

@app.get("/messages/{job_id}")
async def get_messages(job_id: str):
    # Fetch messages associated with prospects of this goal
    p_res = supabase.table("prospects").select("id").eq("goal_id", job_id).execute()
    p_ids = [p["id"] for p in p_res.data]
    
    if not p_ids:
        return []
        
    m_res = supabase.table("messages").select("*").in_("prospect_id", p_ids).execute()
    return m_res.data

@app.post("/approve")
async def approve_prospects(request: ApprovalRequest):
    # Mark messages as approved
    res = supabase.table("messages").update({"status": "approved"}).in_("prospect_id", request.prospect_ids).execute()
    return {"status": "success", "count": len(res.data)}

@app.post("/send")
async def send_emails(request: ApprovalRequest, background_tasks: BackgroundTasks):
    # Trigger background task for sending
    background_tasks.add_task(send_approved_emails_task, request.prospect_ids)
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
