"use client";

import { getGeminiResponse } from "@/lib/gemini-chat";
import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import type { Content } from "@google/generative-ai";

export default function Home() {
  const [chatMessages, setChatMessages] = useState<Content[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat messages from local storage
  useEffect(() => {
    const messages = localStorage.getItem("chatMessages");
    if (messages) {
      setChatMessages(JSON.parse(messages));
    }
  }, []);

  // Save chat messages to local storage, ensure they are saved before user leaves the page or refreshes the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [chatMessages]);

  /** Get the response for the prompt */
  const sendPrompt = async (message: string) => {
    // Save the prompt in the chat messages
    setChatMessages((prev) => [...prev, {parts: [{text: message}], role: "user"}]);

    // Add a typing indicator
    const response = await getGeminiResponse(message, chatMessages);

    // Add the response to the chat messages
    setChatMessages((prev) => [...prev, {parts: [{text: response}], role: "model"}]);
  };

  /** Clear all the messages and the prompt */
  const clearPrompt = () => {
    setChatMessages([]);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };
  return (
    <div className="bg-slate-300 w-full h-screen flex flex-col items-center gap-2 p-2">
      <div className="bg-white rounded-lg border w-3/4 flex-1 overflow-y-auto flex flex-col">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${
              index % 2 === 0 ? "text-black" : "text-blue-500"
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: marked(message.parts.map(part => part.text).join(' ')) }} />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border w-3/4 h-fit overflow-hidden p-2">
        <textarea
          ref={textareaRef}
          cols={3}
          placeholder="Enter your prompt here"
          className="w-full text-black resize-none focus:outline-none focus:border-none"
        />
        <div className="w-full h-fit flex gap-1 justify-end">
          <button className="p-2 bg-slate-400 text-white" onClick={clearPrompt}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
          <button
            className="p-2 bg-slate-400 text-white"
            onClick={() => {
              if (textareaRef.current) {
                sendPrompt(textareaRef.current.value);
                textareaRef.current.value = "";
              }
            }}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
