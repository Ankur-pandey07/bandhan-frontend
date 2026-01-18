"use client";

import { useState } from "react";
import Section from "../components/Section";
import MoodCard from "../components/cards/MoodCard";
import ListenerCard from "../components/cards/ListenerCard";
import { MOODS } from "../data/moods";
import { LISTENERS } from "../data/listeners";

/* ================= MOOD COPY ================= */
const MOOD_COPY: Record<string, string> = {
  Upset: "You’re not alone. It’s okay to let things out.",
  Lonely: "People who understand you are here.",
  Overthinking: "Pausing and breathing is also progress.",
  Calm: "Let’s deepen this sense of calm.",
  Happy: "Sharing happiness makes it grow.",
};

/* ================= MOOD BG ================= */
const MOOD_BG: Record<string, string> = {
  Upset: "from-[#ff6a6a] via-[#ff5a5f] to-[#e54848]",
  Lonely: "from-[#ff7eb3] via-[#ff758c] to-[#ff5a5f]",
  Overthinking: "from-[#6a8cff] via-[#5f7cff] to-[#4f6ee8]",
  Calm: "from-[#4ade80] via-[#22c55e] to-[#16a34a]",
  Happy: "from-[#fb923c] via-[#f97316] to-[#ea580c]",
};

/* ================= MOOD RELATIONS ================= */
const MOOD_RELATIONS: Record<string, string[]> = {
  Upset: ["Lonely", "Overthinking"],
  Lonely: ["Upset"],
  Overthinking: ["Upset", "Lonely"],
  Calm: ["Happy"],
  Happy: ["Calm"],
};

export default function MoodsPage() {
  const [expandedMood, setExpandedMood] = useState<string | null>(null);
  const [showListeners, setShowListeners] = useState(false);
  const [selectedListenerId, setSelectedListenerId] =
    useState<string | null>(null);

  /* ================= MATCH LOGIC ================= */
  const matchesMood = (listener: any) =>
    listener.moods?.some(
      (m: string) =>
        m === expandedMood ||
        (expandedMood &&
          MOOD_RELATIONS[expandedMood]?.includes(m))
    );

  const getPriority = (listener: any) => {
    let score = 0;
    if (listener.moods?.includes(expandedMood)) score += 5;
    if (listener.isListening) score += 3;
    if (listener.badge?.includes("Verified")) score += 2;
    return score;
  };

  const getMatchScore = (listener: any) => {
    let score = 60;
    if (listener.moods?.includes(expandedMood)) score += 25;
    if (listener.isListening) score += 10;
    if (listener.badge?.includes("Verified")) score += 5;
    return Math.min(score, 98);
  };

  const filteredListeners = (
    expandedMood
      ? LISTENERS.filter(
          (l) => l.isListening && matchesMood(l)
        )
      : LISTENERS.filter((l) => l.isListening)
  ).sort((a, b) => getPriority(b) - getPriority(a));

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${
        expandedMood
          ? MOOD_BG[expandedMood]
          : "from-[#ff6a6a] via-[#ff5a5f] to-[#e54848]"
      } pb-24 transition-all duration-500`}
    >
      <Section
        title="Aaj aap kaisa mehsoos kar rahe hain?"
        subtitle="Apni feeling choose karein"
      >
        {/* ================= MOODS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {MOODS.map((mood) => {
            const isExpanded =
              expandedMood === mood.label;
            const isDimmed =
              expandedMood && !isExpanded;

            return (
              <div
                key={mood.id}
                className={`${
                  isDimmed
                    ? "opacity-40 pointer-events-none"
                    : ""
                }`}
              >
                <MoodCard
                  {...mood}
                  isActive={isExpanded}
                  onClick={() =>
                    setExpandedMood(
                      isExpanded ? null : mood.label
                    )
                  }
                />

                {/* DESKTOP EXPAND */}
                {isExpanded && (
                  <div className="hidden sm:block mt-4 rounded-2xl bg-neutral-900 p-5">
                    <p className="text-sm text-white mb-4">
                      {MOOD_COPY[mood.label]}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() =>
                          setShowListeners(true)
                        }
                        className="rounded-xl bg-neutral-800 py-3 text-white text-sm"
                      >
                        🗣️ Express yourself
                      </button>

                      <button
                        onClick={() =>
                          setShowListeners(true)
                        }
                        className="rounded-xl bg-neutral-800 py-3 text-white text-sm"
                      >
                        ❤️ Understanding people
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE EXPAND */}
        {expandedMood && (
          <div className="sm:hidden mt-6 px-4">
            <div className="rounded-2xl bg-neutral-900 p-5">
              <p className="text-sm text-white mb-4">
                {MOOD_COPY[expandedMood]}
              </p>

              <div className="grid gap-3">
                <button
                  onClick={() => setShowListeners(true)}
                  className="rounded-xl bg-neutral-800 py-3 text-white text-sm"
                >
                  🗣️ Express yourself
                </button>

                <button
                  onClick={() => setShowListeners(true)}
                  className="rounded-xl bg-neutral-800 py-3 text-white text-sm"
                >
                  ❤️ Understanding people
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ================= LISTENERS ================= */}
      {showListeners && (
        <Section title="Aapke liye sahi listeners">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredListeners.map((listener) => (
              <ListenerCard
                key={listener.id}
                {...listener}
                matchScore={getMatchScore(listener)}
                selected={
                  selectedListenerId === listener.id
                }
                onSelect={() => {
                  setSelectedListenerId(listener.id);

                  setTimeout(() => {
                    localStorage.setItem(
                      "activeListenerSession",
                      JSON.stringify({
                        listenerId: listener.id,
                        listenerName: listener.name,
                        mood: expandedMood,
                        startedAt: Date.now(),
                      })
                    );
                    window.dispatchEvent(
                      new Event("listener-selected")
                    );
                  }, 300);
                }}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
