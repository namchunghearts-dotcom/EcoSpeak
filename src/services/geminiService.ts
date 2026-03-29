import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function evaluatePronunciation(word: string, audioBase64: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            { text: `Evaluate the pronunciation of the word "${word}" in this audio. Provide a score from 1 to 5 stars and a short encouraging feedback in English for a primary school student.` },
            { inlineData: { mimeType: "audio/wav", data: audioBase64 } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING }
          },
          required: ["score", "feedback"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error evaluating pronunciation:", error);
    return { score: 3, feedback: "Keep trying! You are doing great!" };
  }
}

export async function getGuideResponse(userText: string, zone: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a friendly guide robot for kids in the ${zone} zone. The kid says: "${userText}". Respond in a very simple, friendly way (max 2 sentences) to help them learn English.`,
    });
    return response.text;
  } catch (error) {
    return "That's interesting! Let's explore more!";
  }
}
