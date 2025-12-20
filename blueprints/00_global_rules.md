# BLUEPRINT: Global Architecture & Rules (The Constitution)

## 1. The "Google Stack" (NON-NEGOTIABLE)
* **IDE/Dev:** Firebase Studio (Project IDX) & Google Agent Development Kit (ADK).
* **Compute:** **Cloud Run** (Hosting Python ADK Agents & WebSocket Proxy).
* **Frontend:** React / Next.js (Deployed via Firebase Hosting).
* **Operational DB (Engine 1):** **Firebase Firestore** (NoSQL).
    * *Constraint:* Use the `firebase-admin` Python SDK.
    * *Structure:* Collection `users` -> Document `{uid}` -> Field `pilot_metrics` (Map/Dictionary).
* **Knowledge Base (Engine 2):** **Vertex AI Search** (RAG).
    * *Constraint:* Used strictly for searching PDF Manuals (FAR/AIM).
    * *Chunking:* "Layout Aware Chunking" enabled.
* **Voice:** **Gemini Live API** via a **WebSocket Proxy** (handled on Cloud Run).
* **Environment:**
    * *Constraint:* Always use the `.venv` executables (e.g., `.venv/bin/python`, `.venv/bin/pip`) for Python commands to ensure dependencies are isolated and correct.

## 2. Coding Standards
* **Python:** Use `Pydantic` for ALL tool inputs/outputs.
* **Security:** NEVER commit API keys. Use `os.environ` variables loaded from `.env`.
* **Frontend:** Use "Generative UI" patterns.
    * *Rule:* Agents do not return HTML. They return JSON. The Client renders the UI (e.g., `<QuizDrawer />`).

## 3. Data Schema Standards (Firestore)
All agents must adhere to this `pilot_metrics` structure in Firestore:
```json
{
  "pilot_metrics": {
    "rating": "Student | Private | Commercial",
    "total_hours": 150,
    "goals": ["Checkride Prep", "Radio Comms"],
    "weaknesses": ["Airspace", "Weather"],
    "last_session": "2023-10-27T10:00:00Z"
  }
}
