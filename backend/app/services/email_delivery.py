import resend
from app.core.config import settings

resend.api_key = settings.RESEND_API_KEY

class EmailDeliveryService:
    def send_email(self, to_email: str, subject: str, body: str):
        if not settings.RESEND_API_KEY:
            print("Resend API key missing. Email not sent.")
            return None
            
        params = {
            "from": settings.FROM_EMAIL,
            "to": to_email,
            "subject": subject,
            "html": body.replace("\n", "<br>"),
        }
        
        try:
            email = resend.Emails.send(params)
            return email
        except Exception as e:
            print(f"Error sending email: {e}")
            return None

email_delivery_service = EmailDeliveryService()
