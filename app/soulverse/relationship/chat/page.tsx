"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSummary from "@/components/ProfileSummary";

/* ================= TYPES ================= */

type Message = {
  role: "user" | "system";
  text: string;
};

type RelationshipProfile = {
  yourName: string;
  partnerName: string;
  yourDOB: string;
  partnerDOB: string;
  yourPlace: string;
  partnerPlace: string;
};

type Phase =
  | "confirm_profile"
  | "language_select"
  | "handoff_ready";

/* ================= COMPONENT ================= */

export default function RelationshipChatPage() {
  const router = useRouter();

  /* ---------- STATE ---------- */
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [profile, setProfile] = useState<RelationshipProfile | null>(null);
  const [phase, setPhase] = useState<Phase>("confirm_profile");
  const [language, setLanguage] = useState<"hi" | "en" | null>(null);
  const [initialized, setInitialized] = useState(false);

  /* ================= LOAD ================= */

  useEffect(() => {
    const p = localStorage.getItem("relationship_profile");
    if (p) setProfile(JSON.parse(p));

    const chat = localStorage.getItem("relationship_chat");
    if (chat) setMessages(JSON.parse(chat));
  }, []);

  /* ================= INITIAL SYSTEM MESSAGE ================= */

  useEffect(() => {
    if (!profile || initialized) return;

    const first: Message = {
      role: "system",
      text: "Please confirm — are these details correct?",
    };

    setMessages([first]);
    localStorage.setItem("relationship_chat", JSON.stringify([first]));
    setInitialized(true);
  }, [profile, initialized]);

  /* ================= HELPERS ================= */

  function pushSystem(text: string, delay = 1200) {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => {
        const updated = [...prev, { role: "system", text }];
        localStorage.setItem("relationship_chat", JSON.stringify(updated));
        return updated;
      });
      setIsTyping(false);
    }, delay);
  }

  function normalize(text: string) {
    return text.toLowerCase().trim();
  }

  /* ================= SEND MESSAGE ================= */

  function sendMessage() {
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    setMessages(prev => {
      const updated = [...prev, { role: "user", text: userText }];
      localStorage.setItem("relationship_chat", JSON.stringify(updated));
      return updated;
    });

    const text = normalize(userText);

    /* ---------- PHASE 1A: PROFILE CONFIRM ---------- */
    if (phase === "confirm_profile") {
      if (["yes", "haan", "ha", "y"].includes(text)) {
        pushSystem("Thank you for confirming your details.");
        pushSystem(
          "Which language would you like to continue in?\n\n1️⃣ Hindi\n2️⃣ English",
          1600
        );
        setPhase("language_select");
      }
      return;
    }

    /* ---------- PHASE 1B: LANGUAGE SELECT ---------- */
    if (phase === "language_select") {
      if (text === "1" || text.includes("hindi")) {
        setLanguage("hi");
        pushSystem("Shukriya. Aap Hindi mein baat kar sakte hain.");
        pushSystem(
          "Ab aap bata sakte ho — aap kya baat share karna chahte ho.",
          1600
        );
        setPhase("handoff_ready");
      }

      if (text === "2" || text.includes("english")) {
        setLanguage("en");
        pushSystem("Thank you. We’ll continue in English.");
        pushSystem(
          "You can now share whatever feels important to you.",
          1600
        );
        setPhase("handoff_ready");
      }
      return;
    }

    /* ---------- PHASE 1C: HANDOFF READY ---------- */
    if (phase === "handoff_ready") {
      // 🔒 SYSTEM SILENT
      // Messages are stored for admin panel
      console.log("User message saved for human guide:", userText);
      return;
    }
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">

      {/* HEADER */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="font-medium">Relationship Insight</h2>
      </div>

      {/* CHAT */}
      <div className="flex-1 px-6 py-6 overflow-y-auto space-y-4">
        {profile && phase === "confirm_profile" && (
          <ProfileSummary {...profile} />
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[22rem] text-sm ${
                m.role === "user"
                  ? "bg-black text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-gray-500 animate-pulse">
            typing…
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="px-6 py-4">
        <div className="max-w-xl mx-auto flex gap-2 bg-white rounded-full shadow px-4 py-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            className="flex-1 outline-none text-sm"
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded-full text-sm"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
}
