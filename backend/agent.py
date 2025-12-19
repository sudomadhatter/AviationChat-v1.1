from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os

# Import the Greeting Agent
from backend.agents.greeting import greeting_agent

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint."""
    return jsonify({"status": "healthy", "service": "aviationchat-backend"}), 200

@app.route('/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint.
    Expects JSON: { "message": "User input here", "history": [...] }
    """
    try:
        data = request.json
        user_message = data.get("message", "")
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Run the Greeting Agent
        # Note: The ADK 'agent.query' usually takes just the prompt. 
        # For a real chat, we might need to pass history if the ADK supports it, 
        # or just the current message for a stateless "concierge".
        
        logger.info(f"Received message: {user_message}")
        
        # Invoke the agent (Synchronous for now)
        response_text = greeting_agent.query(user_message)
        
        return jsonify({
            "response": response_text,
            "agent": "greeting_agent"
        })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # For local testing
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)), debug=True)
