"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  
  const sendMessage = () => {
    if (!text) return;
    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF7F5]">
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#B11226] text-white px-4 py-2 rounded-2xl w-fit ml-auto"
          >
            {msg}
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-white flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-xl px-4 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-[#B11226] text-white px-6 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
