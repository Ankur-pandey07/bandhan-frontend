"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSummary from "@/components/ProfileSummary";
import PremiumPaywall from "@/components/PremiumPaywall";
import { buildAIReply } from "@/lib/relationshipAI";
import RelationshipTimeline from "@/components/RelationshipTimeline";
import EmotionalMeter from "@/components/EmotionalMeter";
import PatternsCard from "@/components/PatternsCard";

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


/* ================= COMPONENT ================= */

export default function RelationshipChatPage() {
  const router = useRouter();

  /* ---------- AVATARS ---------- */
  const userAvatar = "/avatars/user.png";
  const systemAvatar = "/avatars/guide.png";
const [isTyping, setIsTyping] = useState(false);

  /* ---------- STATE ---------- */
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
 
  const [profile, setProfile] = useState<RelationshipProfile | null>(null);
  const [profileConfirmed, setProfileConfirmed] = useState(false);



const [aiMemory, setAiMemory] = useState({
  lastTheme: null,
  repeatedThemeCount: 0,
  stage: "greeting",
  emotionalIntensity: "low",
  longTermNotes: [],
});

  const [isPremium, setIsPremium] = useState(false);
  const isFreeUser = !isPremium;

  /* ---------- MENU / UX ---------- */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryText, setSummaryText] = useState("");
const [showPaywall, setShowPaywall] = useState(false);
const [hasInitializedChat, setHasInitializedChat] = useState(false);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const p = localStorage.getItem("relationship_profile");
    if (p) setProfile(JSON.parse(p));

    if (localStorage.getItem("profile_confirmed") === "true") {
      setProfileConfirmed(true);
    }

    const chat = localStorage.getItem("relationship_chat");
    if (chat) setMessages(JSON.parse(chat));

    const aiMem = localStorage.getItem("relationship_ai_memory");
if (aiMem) setAiMemory(JSON.parse(aiMem));

    if (localStorage.getItem("is_premium") === "true") {
      setIsPremium(true);
    }
  }, []);

 useEffect(() => {
  localStorage.setItem("relationship_ai_memory", JSON.stringify(aiMemory));
}, [aiMemory]);

  /* ================= INITIAL MESSAGE ================= */

 useEffect(() => {
  if (!profile || profileConfirmed || hasInitializedChat) return;

  const initial: Message = {
    role: "system",
    text: "Please confirm — are these details correct?",
  };

  setMessages([initial]);
  localStorage.setItem("relationship_chat", JSON.stringify([initial]));
  setHasInitializedChat(true);
}, [profile, profileConfirmed, hasInitializedChat]);


function pushSystem(text: string) {
  setIsTyping(true);

  setTimeout(() => {
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last?.role === "system" && last.text === text) return prev;

      const updated = [...prev, { role: "system", text }];
      localStorage.setItem("relationship_chat", JSON.stringify(updated));
      return updated;
    });

    setIsTyping(false);
  }, 1400); // 👈 natural pause
}


  /* ================= CHAT OPTIONS ================= */

 function clearChat() {
  setMessages([]);
  setAiMemory({
    lastTheme: null,
    repeatedThemeCount: 0,
    stage: "greeting",
    emotionalIntensity: "low",
    longTermNotes: [],
  });

  localStorage.removeItem("relationship_chat");
  localStorage.removeItem("relationship_ai_memory");
  setIsMenuOpen(false);
}


  function restartChat() {
    clearChat();
    pushSystem("Let’s begin again. What feels important right now?");
  }

  function pauseConversation() {
    setIsPaused(true);
    setIsMenuOpen(false);
  }

  function resumeConversation() {
    setIsPaused(false);
  }

  function quickExit() {
    localStorage.removeItem("relationship_chat");
    localStorage.removeItem("relationship_memory");
    localStorage.removeItem("profile_confirmed");
    router.push("/soulverse");
  }

  function generateSummary() {
    const summary =
  "So far, it seems that themes like " +
  (aiMemory.lastTheme || "connection") +
  " have been important in this conversation.";

    setSummaryText(summary);
    setShowSummary(true);
    setIsMenuOpen(false);
  }

  function saveSummary() {
    if (isFreeUser) {
      setShowSummary(true);
      return;
    }
    localStorage.setItem("relationship_summary", summaryText);
    pushSystem("Your reflection has been saved for later.");
    setIsMenuOpen(false);
  }

  function Divider() {
  return <div className="h-px bg-black/5 mx-4" />;
}

function MenuItem({
  label,
  icon,
  onClick,
  danger,
  locked,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  danger?: boolean;
  locked?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        px-5 py-3 text-sm
        transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-800 hover:bg-black/5"
        }
      `}
    >
      
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>

      {locked && (
        <span className="text-xs text-gray-400 ml-2">
          Premium
        </span>
      )}
    </button>
  );
}

  /* ================= SEND MESSAGE ================= */

const sendMessage = () => {
  if (!input.trim() || isPaused) return;

  const userText = input.trim();

  // user message
  setMessages(prev => {
    const updated = [...prev, { role: "user", text: userText }];
    localStorage.setItem("relationship_chat", JSON.stringify(updated));
    return updated;
  });

  // AI reply
  const { reply, nextMemory } = buildAIReply(userText, aiMemory);

  pushSystem(reply);
  setAiMemory(nextMemory);

  setInput("");
};

   

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
      {/* HEADER */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="font-medium">Relationship Insight</h2>
        <button onClick={() => setIsMenuOpen(true)}>⋮</button>
      </div>

      {/* MENU */}
      {isMenuOpen && (
  <div className="fixed inset-0 z-50">
    {/* backdrop */}
    <div
      className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      onClick={() => setIsMenuOpen(false)}
    />

    {/* menu card */}
    <div
      className="
        absolute right-4 top-16 w-72
        rounded-3xl
        bg-white/90 backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        border border-black/5
        overflow-hidden
        animate-fadeIn
      "
    >
      {/* header */}
      <div className="px-5 py-4 border-b border-black/5">
        <p className="text-sm font-medium text-gray-900">
          Conversation options
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Calm & private controls
        </p>
      </div>

      {/* primary actions */}
      <div className="py-2">
        <MenuItem
          label="Clear chat"
          icon="🧹"
          onClick={clearChat}
        />
        <MenuItem
          label="Restart with same details"
          icon="🔄"
          onClick={restartChat}
        />
        <MenuItem
          label="Pause conversation"
          icon="⏸"
          onClick={pauseConversation}
        />
      </div>

      <Divider />

      {/* premium */}
      <div className="py-2">
        <MenuItem
          label="Conversation summary"
          icon="🧠"
          locked={isFreeUser}
          onClick={() => {
  if (isFreeUser) {
    setShowPaywall(true);
    return;
  }
  generateSummary();
}}

        />
        <MenuItem
          label="Save summary"
          icon="💾"
          locked={isFreeUser}
          onClick={() => {
  if (isFreeUser) {
    setShowPaywall(true);
    return;
  }
  saveSummary();
}}

        />
      </div>
      <Divider />

      {/* destructive */}
      <div className="py-2">
        <MenuItem
          label="Quick exit"
          icon="🚪"
          danger
          onClick={quickExit}
        />
      </div>
    </div>
  </div>
)}


      {/* CHAT */}
      <div className="flex-1 px-6 pr-12 py-6 overflow-y-auto space-y-4">
        {profile && !profileConfirmed && <ProfileSummary {...profile} />}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 items-end ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <img
                src={m.role === "user" ? userAvatar : systemAvatar}
                className="w-8 h-8 rounded-full"
              />
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
          </div>
        ))}
{/* After messages map */}
{aiMemory.longTermNotes.length > 0 && (
  <div className="px-6 mb-4">
    <RelationshipTimeline themes={aiMemory.longTermNotes} />
  </div>
)}
{isTyping && (
  <div className="flex items-center gap-2 text-sm text-gray-500 px-6">
    <span className="animate-pulse">typing</span>
    <span className="animate-bounce">.</span>
    <span className="animate-bounce delay-150">.</span>
    <span className="animate-bounce delay-300">.</span>
  </div>
)}

<div className="px-6 mb-4">
  <PatternsCard memory={aiMemory} />
</div>

        {isPaused && (
          <div className="text-center text-sm text-gray-500">
            Conversation paused.
            <br />
            <button onClick={resumeConversation} className="underline">
              Resume
            </button>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="px-6 py-4">
        <div className="max-w-xl mx-auto flex gap-2 bg-white rounded-full shadow px-4 py-2">
          <input
            value={input}
            disabled={isPaused}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              isPaused ? "Conversation paused" : "Type your message…"
            }
            className="flex-1 outline-none text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={isPaused}
            className="bg-black text-white px-4 py-2 rounded-full text-sm"
          >
            Send
          </button>
        </div>
      </div>

      {/* SUMMARY MODAL */}
      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSummary(false)}
          />
          <div className="bg-white rounded-3xl p-6 max-w-md mx-6">
            <h3 className="font-medium mb-4">Conversation summary</h3>

            {isFreeUser ? (
              <div className="relative">
                <p className="text-sm text-gray-500 blur-sm select-none">
                  {summaryText}
                </p>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium mb-2">
                    Unlock deeper insight
                  </p>
                  <button
  onClick={() => setShowPaywall(true)}
  className="px-4 py-2 rounded-full bg-black text-white text-sm"
>
  Go Premium
</button>

                  <button
  onClick={() => setShowPaywall(true)}
  className="px-4 py-2 rounded-full bg-black text-white text-sm"
>
  Go Premium
</button>

                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700">{summaryText}</p>
            )}

            <button
              className="mt-6 underline text-sm"
              onClick={() => setShowSummary(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
     {showPaywall && (
  <PremiumPaywall onClose={() => setShowPaywall(false)} />
)}

    </div>
  );
}
