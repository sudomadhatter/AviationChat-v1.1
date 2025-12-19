import os
import logging
import google.generativeai as genai

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure API Key
# In a real app, ensure GOOGLE_API_KEY is set in your environment variables.
api_key = os.environ.get("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    logger.warning("GOOGLE_API_KEY not found. Agent may fail if not running on Vertex AI with correct permissions.")

class GreetingAgent:
    def __init__(self):
        self.model_name = "gemini-1.5-flash"
        self.system_instruction = """
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
        
        # Initialize the model
        self.model = genai.GenerativeModel(
            model_name=self.model_name,
            system_instruction=self.system_instruction
        )

    def query(self, user_message: str) -> str:
        """
        Sends a message to the agent and returns the text response.
        """
        try:
            # We use a chat session here if we wanted history, but for a simple "query",
            # generate_content is fine. 
            response = self.model.generate_content(user_message)
            return response.text
        except Exception as e:
            logger.error(f"Error generating content: {e}")
            return "I'm having trouble connecting to the tower (AI Error). Please try again."

# Singleton Instance
greeting_agent = GreetingAgent()
