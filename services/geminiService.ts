import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

export const analyzeValidationImage = async (base64Data: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert in project validation methods. Analyze the uploaded image and identify which validation method it represents. 
    
    The available methods are:
    Proof of Concept (POC), Technical Spike, Prototype, Rapid Prototyping, Minimum Viable Product (MVP), Concierge MVP, Wizard of Oz Testing, Concept Testing, Landing Page Test, Feasibility Study, Pilot Program, A/B Testing, Wireframing, Mockups, Paper Prototyping, Interactive Prototypes, Smoke Testing, Usability Testing, Load Testing, Sandbox Testing.

    Return the result strictly in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            text: prompt
          },
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG or compatible image type from client
              data: base64Data
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            method: { type: Type.STRING },
            confidence: { type: Type.STRING, enum: ['high', 'medium', 'low'] },
            reasoning: { type: Type.STRING },
            suggestions: { type: Type.STRING }
          },
          required: ['method', 'confidence', 'reasoning', 'suggestions']
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("No response text received from Gemini.");
    }

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};
