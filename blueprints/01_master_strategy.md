# BLUEPRINT: Master Strategy (PRD)

## <PHILOSOPHY>
**"System 2" Cognitive Architecture:**
We are not building a chatbot. We are building a **Multi-Agent Flight School**.
* **System 1 (Fast):** The "Greeting Agent" and "Talker" layer handle immediate interactions and "Vibe."
* **System 2 (Slow):** The "Specialist" and "Admin" agents perform deep reasoning, RAG search, and asynchronous grading.

## <ARCHITECTURE>
**The "Two-Engine" Stack:**
1.  **Engine 1 (Operational & Memory):** **Cloud Firestore**.
    * *Role:* Stores `users/{uid}/pilot_metrics` (structured habits) and session logs.
    * *Constraint:* No SQL. Flexible schema via Maps.
2.  **Engine 2 (Knowledge):** **Vertex AI Search**.
    * *Role:* "The Library." Stores unstructured FAA Manuals (FAR/AIM, PHAK).
    * *Constraint:* Layout Aware Chunking enabled for reading charts/tables.

## <AGENT_ROSTER>
### 1. Greeting Agent (The Sales Rep)
* **Type:** `LlmAgent` (Fast)
* **Role:** Landing Page conversion.
* **Goal:** Move user to Auth. *Does not access internal tools.*

### 2. Indoc Agent (The HR Manager)
* **Type:** `SequentialAgent` (Strict Linear Logic)
* **Role:** Onboarding & Data Integrity.
* **Trigger:** Runs on Login IF `pilot_metrics` is stale (>30 days).
* **Action:** Updates Firestore with current hours/ratings.

### 3. Specialist Agent (The Ground Instructor)
* **Type:** `ParallelAgent` (Talker-Reasoner Pattern)
* **Role:** Deep Technical Q&A.
* **Logic:**
    * *Lane 1 (Talker):* Holds the user's attention ("That's a tricky regulation...").
    * *Lane 2 (Reasoner):* Queries Vertex AI Search for citations.

### 4. Instructor/DPE Agents (The Voice)
* **Type:** `Gemini Live` via WebSocket
* **Role:** Real-time oral exam simulation.
* **Infrastructure:** Connects via a **Cloud Run WebSocket Proxy** (No browser keys).

### 5. Admin Agent (The Grader)
* **Type:** Asynchronous Background Worker
* **Role:** Post-Session Analysis.
* **Trigger:** Runs *after* a Voice Session ends.
* **Logic:** Reads the transcript, grades against ACS Standards, updates `pilot_metrics` in Firestore.

## <KEY_FEATURES>
### The "Smart Drawer" (Generative UI)
* **Concept:** Agents do not render HTML. They return a `DrawerSchema` JSON.
* **Frontend:** React detects the JSON and slides up a UI component (e.g., `<QuizCard />`, `<GradeReport />`).

### Voice Simulation Grid
* **UI:** Dashboard cards that trigger the WebSocket connection for specific lesson plans.
