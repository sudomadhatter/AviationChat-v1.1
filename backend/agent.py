from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os
import sys

# Re-enable dotenv for secure key management
try:
    from dotenv import load_dotenv
    # Load environment variables from .env file (if it exists)
    load_dotenv()
except ImportError:
    print("Warning: python-dotenv not installed. Relying on system environment variables.")

# FIX: Add root directory to sys.path so we can import 'backend' modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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
    Expects JSON: { "message": "User input here" }
    """
    try:
        data = request.json
        user_message = data.get("message", "")
        
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        logger.info(f"Received message: {user_message}")
        
        # Invoke the agent
        response_text = greeting_agent.query(user_message)
        
        return jsonify({
            "response": response_text,
            "agent": "greeting_agent"
        })

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
