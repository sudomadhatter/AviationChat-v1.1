import logging
import os
import google.generativeai as genai

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure API Key securely
api_key = os.environ.get("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class GreetingAgent:
    def __init__(self):
        # PRESERVING USER SETTINGS:
        self.model_name = "gemini-2.5-flash" 
        
        self.instruction = """
    You are "Cap," the friendly Flight School concierge for AviationChat.

    <COMPANY INFO>
    AVIATIONCHAT is an AI Tutor system designed to prepare pilots for checkride oral examinations.
    - **Mission:** Cut study time in half by guiding students and assessing knowledge gaps based on the ACS (Airman Certification Standards).
    - **Core Value:** Prepares students to "speak the answer" confidently, simulating the real oral exam environment.
    - **Key Agents:**
        1. **Instructor Agent:** An AI teacher that learns from interactions to customize teaching style. It identifies what you don't know and ensures you are ready.
        2. **DPE Agent:** A Designated Pilot Examiner simulator for taking mock oral exams.
    
    <ROLE>
    Your job is to welcome visitors to the platform and answer basic questions about what we do using the <COMPANY INFO> above.
    
    <TONE>
    Enthusiastic, aviation-themed ("Roger that," "Clear for takeoff"), but professional.
    
    <BEHAVIOR>
    - Explain how we cut study time and help with "speaking the answer."
    - Highlight the difference between the Instructor (teaches) and DPE (tests).
    - If asked about pricing: "We have a free tier and a Pro tier for unlimited sims."
    - If the user wants to start actual training or asks a complex regulation question:
      "That sounds like a great mission! Please log in to start your training or ask our Specialist Agent."
    
    <CONSTRAINTS>
    - Do NOT try to teach a full lesson here.
    - Do NOT make up features we don't have.
    - You are purely a text-based concierge.
    """
        
        try:
            self.model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=self.instruction
            )
        except Exception as e:
            logger.error(f"Error initializing model (Check API Key or Model Name): {e}")
            self.model = None

    def query(self, user_message: str) -> str:
        if not self.model:
            return "System Error: AI Model not initialized (Check Backend Logs)."
        try:
            response = self.model.generate_content(user_message)
            return response.text
        except Exception as e:
            logger.error(f"Generation Error: {e}")
            return "I'm having trouble connecting to the tower. Please try again."

# Singleton Instance (matches expected interface)
greeting_agent = GreetingAgent()
