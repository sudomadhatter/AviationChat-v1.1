import os
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask App
app = Flask(__name__)

# Initialize Firebase Admin
# Note: In Cloud Run, credentials are auto-detected. Locally, set GOOGLE_APPLICATION_CREDENTIALS.
try:
    firebase_admin.initialize_app()
    db = firestore.client()
    print("Firebase Admin Initialized")
except Exception as e:
    print(f"Error initializing Firebase Admin: {e}")

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "service": "AviationChat Agent Backend"}), 200

# Placeholder for Agent Endpoint
@app.route("/agent/indoc", methods=["POST"])
def indoc_agent():
    data = request.json
    # TODO: Implement ADK Agent Logic here
    return jsonify({"response": "Indoc Agent Placeholder Response", "input": data}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
