# **App Name**: AviationChat

## Style Guidelines:

- Background color: Void Black (#000000) for pure, OLED black. No grey. Infinite depth.
- Primary color: PFD Cyan (#00C2FF), the specific 'Sky Blue' from the artificial horizon. Used for Active Tabs & User Bubbles.
- Secondary color: Route Green (#24FF00), the 'Active Flight Plan' line color. Used for Success States & Correct Answers.
- Accent color: Director Magenta (#E000FF), the 'Flight Director' crosshairs. Used for Specialist Agent & Critical Alerts.
- Headline font: 'Space Grotesk', sans-serif, for a modern techy feel; Body font: 'Inter', sans-serif, for a clean and neutral readability. A pairing
- Code font: 'Source Code Pro' for displaying code snippets.
- Use aviation-themed icons.
- Subtle animations on UI elements, such as button presses.

# Product Requirements Document (PRD)
**Project Name:** AviationChat
Platform (The Flight School Tutor App)
**Version:** 1.0 (MVP)
**Status:** Approved for "Vibe Coding"
**Architecture Type:** Multi-Agent / Two-Engine Hybrid

---

## 1. Executive Summary
**Vision:** To build an AI-first flight training platform that moves beyond static multiple-choice questions. The system uses a "Two-Engine" architecture to combine rigid pilot data (Engine 1) with unstructured aviation knowledge (Engine 2). It features a multi-agent roster that adapts to the student's learning style, offering both text-based technical support and low-latency voice simulations.

**Core Value Proposition:**
* **Hyper-Personalization:** The AI remembers the student's weaknesses via a shared "Long Term Memory" (JSONB).
* **Real-Time Simulation:** Voice agents act as Instructors and Examiners, not just chatbots.
* **Verifiable Accuracy:** All technical answers are grounded in official FAA manuals (RAG).

---

## 2. The "Golden Stack" (Technical Constraints)
* **Development Environment:** Firebase Studio (Vibe Coding Console).
* **Frontend:** React / Next.js (Deployed via Firebase App Hosting).
* **Backend / Agent Framework:** Google GenKit for all Agents
* **Database (Engine 1):** Cloud SQL for PostgreSQL (Operational Data & Memory).
* **Knowledge Base (Engine 2):** Vertex AI Search (RAG for PDF Manuals).
* **Voice Interface:** Gemini Live API (WebSocket) for low-latency voice interaction.

---

## 3. User Experience & Interface Architecture

## 3.1. Login (Landing Page)
* **Login in User Athentication, INDOC Agent:**
    * **Funciton:** Log in, create profile, or talk to the Indoc Agent who will explain why you should sign up. It will act as a sales agent if you are not logged in. Once logged in it us just checking to make use the long term memory is up to date with checkrides you are preparing for as well as other personal details.

### 3.1. The Dashboard (Home)
* **Hero Section (The Specialist Agent):**
    * **Design:** A prominent, centered Chat/Search interface. No static banners.
    * **Function:** Immediate access to the "Librarian" for technical queries.
* **Voice Simulation Grid:**
    * **Card 1:** The Instructor (Mentor) – "Start Voice Session."
    * **Card 2:** The DPE (Examiner) – "Begin Mock Exam."
* **Learning Resources:**
    * **Video Section:** Horizontal scroll of training briefings.
    * **Library:** Grid of downloadable PDFs (ACS, PHAK).

### 3.2. The "Smart Drawer" Pattern
* **Concept:** A Server-Driven UI component.
* **Trigger:** When an agent needs to show complex data (a quiz, a citation, or a diagram), it returns a JSON payload instead of text.
* **Behavior:** A drawer slides up from the bottom of the screen containing the rendered content, keeping the chat interface clean.

---

## 4. Data Architecture (The Two-Engine Model)

### Engine 1: The Memory (Cloud SQL - PostgreSQL)
* **Purpose:** Stores structured data and the "Brain" of the user.
* **Critical Schema:**
    * `users`: Identity (Firebase UID).
    * `pilot_metrics` (**JSONB**): The shared brain.
        * *Example structure:* `{"weaknesses": ["airspace", "landings"], "learning_style": "visual", "last_interview_date": "2023-10-27"}`
    * `chat_history`: Raw logs of text and voice transcripts for async analysis.
    * `quiz_results`: Empirical performance data.

### Engine 2: The Library (Vertex AI Search)
* **Purpose:** The source of truth for aviation data.
* **Data Source:** PDF Manuals (PHAK, AIM, ACS) uploaded to Cloud Storage.
* **Configuration:**
    * **Mode:** Hybrid Search (Vector + Keyword).
    * **Chunking:** Layout Aware Chunking (to preserve tables and lists in manuals).

---

## 5. Agent Roster & Logic Specifications

### Agent 1: The Indoc Agent (Onboarding)
* **Type:** Linear Flow / Form Filler.
* **Trigger:** New Account Creation OR `pilot_metrics.last_interview_date` > 30 days.
* **Role:** The "Gatekeeper." It interviews the user to establish a baseline.
* **Output:** Writes initial JSON object to `pilot_metrics` in Cloud SQL.

### Agent 2: The Specialist Agent (The Librarian)
* **Type:** Text/Chat Primary (The "Hero" Section).
* **Architecture:** Parallel Agent (Sprinter/Pacer).
* **Capabilities:**
    * **RAG:** Queries Vertex AI Search for every technical question.
    * **Citations:** Must return sources inline.
    * **UI Trigger:** Can trigger the "Smart Drawer" for quizzes.

### Agent 3: The Instructor Agent (The Mentor)
* **Type:** Voice Primary (Gemini Live API).
* **Personality:** Socratic, patient, guiding.
* **Logic Loop:**
    1.  User speaks.
    2.  Agent reads `pilot_metrics` (Cloud SQL) to check user's history/weaknesses.
    3.  Agent generates response adjusting for difficulty.
    4.  Response is streamed via WebSocket.

### Agent 4: The DPE Agent (The Examiner)
* **Type:** Voice Primary (High Latency Tolerance, High Accuracy).
* **Personality:** Professional, curt, neutral (FAA Examiner persona).
* **Function:**
    * Simulates a "Check Ride."
    * Does *not* offer help.
    * **Grading:** Transcribes the session and uses a tuned model to grade "Pass/Fail" based on ACS standards.

### Agent 5: The Administrative Agent (The Analyst)
* **Type:** Asynchronous Background Worker.
* **Trigger:** Cloud Function (triggered after a Voice Session ends).
* **Role:** The "Subconscious."
* **Task:** Reads `chat_history` -> extracts patterns -> updates `pilot_metrics` (e.g., adds "Weakness: Crosswind Landings" to the JSONB blob).

---