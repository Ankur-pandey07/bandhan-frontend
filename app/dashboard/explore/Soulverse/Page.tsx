"use client";

import { useState } from "react";

type Message = {
  from: "user" | "guide";
  text: string;
};

export default function SoulVersePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "guide",
      text:
        "Hi, welcome to SoulVerse. Main yahan sunne aur clarity dene ke liye hoon. Aap jo feel kar rahe ho, aaram se batao."
    }
  ]);

  const [input, setInput] = useState("");
  const [calling, setCalling] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { from: "user", text: input },
      {
        from: "guide",
        text:
          "Samajh aa raha hai aap kya keh rahe ho. Is situation me thoda slow rehna aur clearly baat rakhna help kar sakta hai."
      }
    ]);

    setInput("");
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-white">
      {/* HEADER */}
      <div className="border-b border-white/10 p-4">
        <h1 className="text-lg font-semibold">SoulVerse</h1>
        <p className="text-xs text-white/60">
          Talk to a relationship guide • No astrology • No predictions
        </p>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
              msg.from === "user"
                ? "ml-auto bg-indigo-600"
                : "mr-auto bg-white/10"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT + ACTIONS */}
      <div className="border-t border-white/10 p-3 space-y-3">
        {/* CHAT INPUT */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Guide se baat karein..."
            className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={sendMessage}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm"
          >
            Send
          </button>
        </div>

        {/* VOICE CALL */}
        {!calling ? (
          <button
            onClick={() => setCalling(true)}
            className="w-full rounded-xl border border-white/20 py-2 text-sm"
          >
            🎤 Start Voice Call
          </button>
        ) : (
          <div className="w-full rounded-xl bg-neutral-900 p-3 text-center text-sm">
            <p className="mb-2">🔊 Voice call connected with Guide</p>
            <button
              onClick={() => setCalling(false)}
              className="rounded-lg bg-red-600 px-4 py-1 text-xs"
            >
              End Call
            </button>
          </div>
        )}
 </div>