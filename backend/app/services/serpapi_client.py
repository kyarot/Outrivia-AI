from serpapi import GoogleSearch
from app.core.config import settings
import json

class SerpApiService:
    def __init__(self):
        self.api_key = settings.SERPAPI_API_KEY

    def search_linkedin(self, params: dict) -> list:
        roles = " ".join(params.get("roles", []))
        keywords = " ".join(params.get("keywords", []))
        location = params.get("location", "")
        
        query = f'site:linkedin.com/in "{roles}" {keywords}'
        if location:
            query += f' "{location}"'
        
        search_params = {
            "q": query,
            "api_key": self.api_key,
            "engine": "google",
            "num": 20 # Fetch 20 results per search
        }
        
        search = GoogleSearch(search_params)
        results = search.get_dict()
        
        prospects = []
        for result in results.get("organic_results", []):
            url = result.get("link", "")
            if "linkedin.com/in/" in url:
                # Clean URL
                if "?" in url:
                    url = url.split("?")[0]
                prospects.append({
                    "linkedin_url": url,
                    "name": result.get("title", ""),
                    "snippet": result.get("snippet", "")
                })
        
        return prospects

serpapi_service = SerpApiService()
