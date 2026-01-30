import { GoogleGenAI, Type } from "@google/genai";

// NOTE: In a real production app, this would be on the backend. 
// For this demo, we use it client-side.
// The user must provide their key in the UI or environment.

let ai: GoogleGenAI | null = null;

export const initGemini = (apiKey: string) => {
  ai = new GoogleGenAI({ apiKey });
};

export interface ParsedEventIntent {
  title: string;
  description: string;
  suggested_date: string;
  estimated_attendees: number;
  budget_level: 'Low' | 'Medium' | 'High';
  venue_criteria: string;
  suggested_topics: string[];
  required_agents: string[];
  coordinator_thought: string;
}

export const parseEventIntent = async (prompt: string): Promise<ParsedEventIntent> => {
  if (!ai) throw new Error("Gemini API Key not set");

  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `You are the Coordinator Agent for ASI:ONE, an AI-native event platform. 
    Analyze the following user intent to create an event: "${prompt}".
    
    If the date is vague (e.g., "next friday"), pick a specific concrete date in the future relative to today.
    
    Return a detailed plan in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A catchy title for the event" },
          description: { type: Type.STRING, description: "A professional short description" },
          suggested_date: { type: Type.STRING, description: "YYYY-MM-DD format" },
          estimated_attendees: { type: Type.INTEGER },
          budget_level: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          venue_criteria: { type: Type.STRING, description: "What kind of venue to look for" },
          suggested_topics: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          required_agents: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of sub-agents needed (e.g., Venue Agent, Speaker Agent)"
          },
          coordinator_thought: {
            type: Type.STRING,
            description: "A short reasoning string from the Coordinator Agent explaining the plan."
          }
        },
        required: ["title", "description", "suggested_date", "estimated_attendees", "venue_criteria", "required_agents"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as ParsedEventIntent;
  }
  
  throw new Error("Failed to parse event intent");
};