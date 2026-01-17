"use client";

import { useState } from "react";
import ExploreHeader from "./components/ExploreHeader";
import Section from "./components/Section";
import MoodCard from "./components/cards/MoodCard";
import MoodModal from "./components/modals/MoodModal";
import { MOODS } from "./data/moods";
import ListenerCard from "./components/cards/ListenerCard";
import { LISTENERS } from "./data/listeners";
import { useEffect } from "react";

export default function ExplorePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
const [showListeners, setShowListeners] = useState(false);
const handleSubmit = () => {
  // ✅ CLOSE MOOD MODAL FIRST
  setSelectedMood(null);

  setShowLoading(true);

  setTimeout(() => {
    setShowLoading(false);
    setShowListeners(true);
  }, 1500);
};
useEffect(() => {
  const handleTabChange = (e: any) => {
    if (e.detail !== "explore") {
      // 🔥 FORCE CLEANUP
      setSelectedMood(null);
      setShowLoading(false);
      setShowListeners(false);
    }
  };

  window.addEventListener("dashboard-tab-change", handleTabChange);

  return () => {
    window.removeEventListener("dashboard-tab-change", handleTabChange);
  };
}, []);



  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <ExploreHeader />

      {/* MOOD SECTION */}
      <Section
        title="Aaj aap kaisa mehsoos kar rahe hain?"
        subtitle="Jo mann me hai, keh sakte ho"
      >
        <div className="grid grid-cols-2 gap-4">
          {MOODS.map((mood) => (
            <MoodCard
              key={mood.id}
              label={mood.label}
              emoji={mood.emoji}
              bg={mood.bg}
              onClick={() => setSelectedMood(mood.label)}
            />
          ))}
        </div>
      </Section>

      {/* MODAL */}
      {selectedMood && (
        <MoodModal
          mood={selectedMood}
          onClose={() => setSelectedMood(null)}
          
          onSubmit={handleSubmit}
        />
      )}
      
{showListeners && (
  <Section
    title="Aapke liye sahi listeners"
    subtitle="Aap jis se comfortable ho, unhe chuniye"
  >
    <div className="space-y-3">
      {LISTENERS.map((listener) => (
        <ListenerCard
          key={listener.id}
          name={listener.name}
          badge={listener.badge}
          avatar={listener.avatar}

         onSelect={() => {
  localStorage.setItem(
    "activeListenerSession",
    JSON.stringify({
      listenerId: listener.id,
      listenerName: listener.name,
      mood: selectedMood,
      startedAt: Date.now(),
    })
  );
setShowListeners(false);
  setShowLoading(false);
  setSelectedMood(null);
  // 🔑 trigger auto switch to chats
  window.dispatchEvent(new Event("listener-selected"));
}}


        />
      ))}
    </div>
  </Section>
)}

      {/* LOADING TEXT */}
      {showLoading && (
        <p className="text-center text-gray-400 mt-8">
          Hum aapke liye sahi listener dhoondh rahe hain.
        </p>
      )}
    </div>
  );
}
