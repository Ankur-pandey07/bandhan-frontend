"use client";

import { useState } from "react";
import Section from "../components/Section";
import MoodCard from "../components/cards/MoodCard";
import { MOODS } from "../data/moods";
import ListenerCard from "../components/cards/ListenerCard";
import { LISTENERS } from "../data/listeners";

/* ================= MOOD COPY ================= */
const MOOD_COPY: Record<string, string> = {
  Upset: "You’re not alone. It’s okay to let things out.",
  Lonely: "People who understand you are here.",
  Overthinking: "Pausing and breathing is also progress.",
  Calm: "Let’s deepen this sense of calm.",
  Happy: "Sharing happiness makes it grow.",
};

export default function MoodsPage() {
  const [expandedMood, setExpandedMood] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showListeners, setShowListeners] = useState(false);

  const handleAction = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowListeners(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff6a6a] via-[#ff5a5f] to-[#e54848] pb-24">
      <Section
        title="Aaj aap kaisa mehsoos kar rahe hain?"
        subtitle="Apni feeling choose karein"
      >
        {/* ================= MOODS GRID ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {MOODS.map((mood) => {
            const isExpanded = expandedMood === mood.label;
            const isDimmed = expandedMood && !isExpanded;

            return (
              <div
                key={mood.id}
                className={`transition-all ${
                  isDimmed ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <MoodCard
                  label={mood.label}
                  emoji={mood.emoji}
                  bg={mood.bg}
                  onClick={() =>
                    setExpandedMood(isExpanded ? null : mood.label)
                  }
                />

                {/* ========= DESKTOP / TAB EXPAND ========= */}
                {isExpanded && (
                  <div className="hidden sm:block mt-4 rounded-2xl bg-neutral-900 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-sm text-white mb-4">
                      {MOOD_COPY[mood.label]}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleAction}
                        className="rounded-xl bg-neutral-800 py-3 text-white text-sm hover:bg-neutral-700 transition"
                      >
                        🗣️ Express yourself
                      </button>

                      <button
                        onClick={handleAction}
                        className="rounded-xl bg-neutral-800 py-3 text-white text-sm hover:bg-neutral-700 transition"
                      >
                        ❤️ Understanding people
                      </button>

                      <button
                        onClick={handleAction}
                        className="col-span-2 rounded-xl bg-neutral-800 py-3 text-white text-sm hover:bg-neutral-700 transition"
                      >
                        🌱 Gentle moment
                      </button>
                    </div>

                    <button
                      onClick={() => setExpandedMood(null)}
                      className="mt-4 text-xs text-gray-400 hover:text-gray-200"
                    >
                      Collapse
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= MOBILE EXPAND (GRID SE BAHAR) ================= */}
        {expandedMood && (
          <div className="sm:hidden w-full mt-6 px-4">
            <div className="mx-auto max-w-md rounded-2xl bg-neutral-900 p-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <p className="text-sm text-white mb-4">
                {MOOD_COPY[expandedMood]}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAction}
                  className="rounded-xl bg-neutral-800 py-3 text-white text-sm"
                >
                  🗣️ Express yourself
                </button>

                <button
                  onClick={handleAction}
                  className="rounded-xl bg-neutral-800 py-3 text-white text-sm"
                >
                  ❤️ Understanding people
                </button>

                <button
                  onClick={handleAction}
                  className="col-span-2 rounded-xl bg-neutral-800 py-3 text-white text-sm"
                >
                  🌱 Gentle moment
                </button>
              </div>

              <button
                onClick={() => setExpandedMood(null)}
                className="mt-4 text-xs text-gray-400 block mx-auto"
              >
                Collapse
              </button>
            </div>
          </div>
        )}
      </Section>

      {/* ================= LOADING ================= */}
      {showLoading && (
        <p className="text-center text-gray-200 mt-8">
          Finding the right listener for you…
        </p>
      )}

      {/* ================= LISTENERS ================= */}
      {showListeners && (
        <Section
          title="Aapke liye sahi listeners"
          subtitle="Aap jis se comfortable ho, unhe chuniye"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {LISTENERS.map((listener) => (
              <ListenerCard
                key={listener.id}
                {...listener}
                onSelect={() => {
                  localStorage.setItem(
                    "activeListenerSession",
                    JSON.stringify({
                      listenerId: listener.id,
                      listenerName: listener.name,
                      mood: expandedMood,
                      startedAt: Date.now(),
                    })
                  );
                  setShowListeners(false);
                  setExpandedMood(null);
                  window.dispatchEvent(new Event("listener-selected"));
                }}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
