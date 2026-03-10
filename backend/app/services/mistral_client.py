from mistralai import Mistral
from app.core.config import settings
import json

class MistralService:
    def __init__(self):
        self.client = Mistral(api_key=settings.MISTRAL_API_KEY)
        self.model = "mistral-large-latest"

    async def parse_intent(self, user_goal: str) -> dict:
        prompt = f"""
        Extract outreach search parameters from the following user goal:
        "{user_goal}"
        
        Return a JSON object with:
        - roles: List of job roles
        - keywords: Relevant industry keywords
        - industries: List of industries
        - seniority: Desired seniority level
        - location: Location if specified, else null
        
        Example goal: "Find AI startup founders hiring backend engineers in Europe"
        Response:
        {{
            "roles": ["founder", "CTO"],
            "keywords": ["AI", "startup", "hiring", "backend engineer"],
            "industries": ["Artificial Intelligence", "Software Engineering"],
            "seniority": "any",
            "location": "Europe"
        }}
        """
        
        response = self.client.chat.complete(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)

    async def generate_message(self, prospect_data: dict, goal_text: str) -> dict:
        prompt = f"""
        Generate a personalized outreach email for the following prospect:
        {json.dumps(prospect_data, indent=2)}
        
        Outreach Goal: {goal_text}
        
        Guidelines:
        - Personalized email message
        - Short subject line
        - Natural tone
        - Under 100 words
        - Mention something specific from the prospect profile (skills, experience, or recent company)
        
        Return JSON with "subject" and "body".
        """
        
        response = self.client.chat.complete(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)

mistral_service = MistralService()
