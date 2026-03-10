from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class GoalBase(BaseModel):
    input_text: str

class GoalCreate(GoalBase):
    pass

class Goal(GoalBase):
    id: str
    parsed_params: Optional[dict] = None
    status: str
    created_at: datetime

class ProspectBase(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    company: Optional[str] = None
    linkedin_url: str
    linkedin_username: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[List[str]] = None
    about: Optional[str] = None
    score: Optional[float] = 0

class ProspectCreate(ProspectBase):
    goal_id: str

class Prospect(ProspectBase):
    id: str
    goal_id: str
    status: str
    created_at: datetime

class MessageBase(BaseModel):
    subject: str
    body: str

class MessageCreate(MessageBase):
    prospect_id: str

class Message(MessageBase):
    id: str
    prospect_id: str
    status: str
    created_at: datetime

class ApprovalRequest(BaseModel):
    prospect_ids: List[str]
