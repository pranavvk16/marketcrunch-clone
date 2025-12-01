import { GoogleGenerativeAI } from "@google/generative-ai";

// Hardcoded key as requested
const apiKey = "AIzaSyBBqUDbQiEqjvtIkNa2AeaFgUqOmo5UfrA";
const genAI = new GoogleGenerativeAI(apiKey);

export function getGenerativeModel(modelName: string = "gemini-2.5-flash") {
  return genAI.getGenerativeModel({ model: modelName });
}

// Maintain backward compatibility for existing consumers
export function getLLMProvider() {
  return {
    getGenerativeModel: (modelName: string = "gemini-2.5-flash") => getGenerativeModel(modelName),
    generateResponse: async (prompt: string) => {
        const model = getGenerativeModel();
        const result = await model.generateContent(prompt);
        return { text: result.response.text() };
    }
  };
}

export const genAIInstance = genAI;
