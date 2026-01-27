"use client";

import { useEffect, useState } from "react";

export default function NotificationsSection() {
  const [matches, setMatches] = useState(true);
  const [messages, setMessages] = useState(true);
  const [likes, setLikes] = useState(true);
  const [promotions, setPromotions] = useState(false);

  /* ===== Load saved ===== */
  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) {
      const d = JSON.parse(saved);
      setMatches(d.matches ?? true);
      setMessages(d.messages ?? true);
      setLikes(d.likes ?? true);
      setPromotions(d.promotions ?? false);
    }
  }, []);

  /* ===== Save ===== */
  useEffect(() => {
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify({
        matches,
        messages,
        likes,
        promotions,
      })
    );
  }, [matches, messages, likes, promotions]);

  return (
    <Section title="Notifications">
      <Toggle
        label="New Matches"
        value={matches}
        onChange={setMatches}
      />
      <Toggle
        label="New Messages"
        value={messages}
        onChange={setMessages}
      />
      <Toggle
        label="Likes"
        value={likes}
        onChange={setLikes}
      />
      <Toggle
        label="Promotions"
        value={promotions}
        onChange={setPromotions}
      />
    </Section>
  );
}

/* ================= UI ================= */

function Section({ title, children }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
        {title}
      </p>
      <div className="rounded-2xl p-5 space-y-4 bg-[#121212] border border-white/5">
        {children}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#141414] border border-white/5">
      <span className="text-sm">{label}</span>

      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition ${
          value ? "bg-pink-500" : "bg-[#2a2a2a]"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full transition ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
