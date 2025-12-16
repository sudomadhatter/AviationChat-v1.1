import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// --- Schemas & Tools ---

const PilotMetricsSchema = z.object({
  total_hours: z.number().describe("Total flight hours logged"),
  target_rating: z.string().describe("The next rating the student is working towards (e.g., Private, Instrument)"),
  recent_checkride_result: z.string().optional().describe("Outcome of the last checkride"),
  weak_areas: z.array(z.string()).optional().describe("Areas the student feels they need improvement in"),
});

// Tool to update user metrics
const updateUserMetrics = ai.defineTool(
  {
    name: 'updateUserMetrics',
    description: 'Updates the pilot metrics for a signed-in user.',
    inputSchema: z.object({
      uid: z.string(),
      metrics: PilotMetricsSchema,
    }),
    outputSchema: z.void(),
  },
  async ({ uid, metrics }) => {
    try {
      const userRef = doc(db, 'users', uid);
      // In a real app, you might want to merge or append, but here we update top-level fields
      // and update the 'last_profile_update' timestamp.
      await updateDoc(userRef, {
        pilot_metrics: metrics,
        last_profile_update: new Date().toISOString(),
      });
      return;
    } catch (error) {
      console.error("Error updating user metrics:", error);
      throw new Error("Failed to update user metrics.");
    }
  }
);

// Tool to get user metrics
const getUserMetrics = ai.defineTool(
  {
    name: 'getUserMetrics',
    description: 'Retrieves the current pilot metrics for a signed-in user.',
    inputSchema: z.object({
      uid: z.string(),
    }),
    outputSchema: PilotMetricsSchema.optional(),
  },
  async ({ uid }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.pilot_metrics as z.infer<typeof PilotMetricsSchema>;
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching user metrics:", error);
      throw new Error("Failed to fetch user metrics.");
    }
  }
);


// --- Prompts ---

// Sales Agent Persona (Unauthenticated)
const SALES_SYSTEM_PROMPT = `
You are the INDOC Agent for AviationChat, an AI-first flight training platform.
You are talking to a potential student who has not yet signed up.
Your Goal: Explain the value of AviationChat and encourage them to create an account.

Persona:
- Friendly, low-pressure, helpful.
- Knowledgeable about aviation training struggles (book knowledge vs. oral exams).
- "Guide" archetype.

Key Selling Points:
- "Two-Engine" architecture: Combines rigid FAA data (RAG) with a flexible voice simulator.
- Hyper-personalization: We remember your weak areas (Long Term Memory).
- Real-time voice simulation for Instructor and DPE practice.

If they ask about accuracy:
- Emphasize that all technical answers are grounded in official FAA manuals (PHAK, AIM, ACS) via RAG.

Do not be pushy. Answer their questions clearly.
`;

// HR Agent Persona (Authenticated)
const HR_SYSTEM_PROMPT = `
You are the INDOC Agent for AviationChat, acting as the HR / Student Manager.
You are talking to an existing student.
Your Goal: Ensure the student's file (Long Term Memory) is up to date.

Persona:
- Efficient, professional, organized, friendly.
- "HR Manager" archetype.

Process:
1.  Check what we currently know about the student (using tool: getUserMetrics).
2.  Ask if the information is still correct or if there are updates.
3.  Specifically ask about:
    - Total flight hours.
    - Next target checkride/rating.
    - How the last checkride went (if applicable).
    - Current study focus or weak areas.
4.  If they provide new info, update their file (using tool: updateUserMetrics).

Trigger: This conversation often starts because it's been >30 days since the last update.
Open with: "Welcome back! It's been a while since we updated your file. Let's make sure our instructors know where you're at."
`;


// --- Flow Definition ---

export const indocAgentFlow = ai.defineFlow(
  {
    name: 'indocAgent',
    inputSchema: z.object({
      uid: z.string().optional().describe("The user's Firebase UID. If null/undefined, treat as unauthenticated."),
      userMessage: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ uid, userMessage }) => {
    // Decision Logic: Authenticated vs. Unauthenticated
    if (!uid) {
      // --- MODE A: SALES AGENT ---
      const response = await ai.generate({
        prompt: `
          ${SALES_SYSTEM_PROMPT}
          
          User: ${userMessage}
        `,
      });
      return response.text;
    } else {
      // --- MODE B: HR AGENT ---
      const response = await ai.generate({
        prompt: `
          ${HR_SYSTEM_PROMPT}
          
          User: ${userMessage}
        `,
        tools: [getUserMetrics, updateUserMetrics], 
      });
      return response.text;
    }
  }
);
