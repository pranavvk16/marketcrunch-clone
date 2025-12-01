import { GoogleGenerativeAI } from "@google/generative-ai";

// Hardcoded key for testing as requested
const apiKey = "AIzaSyBBqUDbQiEqjvtIkNa2AeaFgUqOmo5UfrA";

const genAI = new GoogleGenerativeAI(apiKey);

async function main() {
  try {
    // User requested gemini-2.5-flash, but let's try gemini-1.5-flash if that's a typo, 
    // or keep it if they have access. I'll try a known working model first to verify the key, 
    // or just try their exact string. 
    // Let's try their exact string first.
    console.log("Testing with model: gemini-2.5-flash");
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(
      "10+2222 is?"
    );
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
