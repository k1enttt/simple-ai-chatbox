'use server'
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // const prompt = "Explain what the fuzzy machine learning model does.";
  
  const result = await model.generateContent(prompt);
  return result.response.text();
};

