import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Outrivia"
    
    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # AI APIs
    MISTRAL_API_KEY: str = os.getenv("MISTRAL_API_KEY", "")
    
    # Scraper & Discovery APIs
    SERPAPI_API_KEY: str = os.getenv("SERPAPI_API_KEY", "")
    APIFY_API_KEY: str = os.getenv("APIFY_API_KEY", "")
    
    # Email Sending
    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    FROM_EMAIL: str = os.getenv("FROM_EMAIL", "onboarding@resend.dev")

    class Config:
        case_sensitive = True

settings = Settings()
