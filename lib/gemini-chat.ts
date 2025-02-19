"use server";
import dotenv from "dotenv";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export const getGeminiResponse = async (prompt: string, history: Content[]): Promise<string> => {
  if (!apiKey) {
    throw new Error("API key is required");
  }
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
};
