"use client";

import ProfileHeader from "./ProfileHeader";
import FeatureCardsRow from "./FeatureCardsRow";

export default function ProfileHome() {
  return (
    <div className="pb-24">
      {/* HEADER */}
      <ProfileHeader />

      {/* FEATURE CARDS */}
      <FeatureCardsRow />

      {/* BIO */}
      <div className="px-4 mt-6">
        <div
          className="
            rounded-2xl p-4
            bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]
            border border-white/10
            shadow-[0_15px_40px_rgba(0,0,0,0.8)]
          "
        >
          <p className="text-xs uppercase tracking-widest text-pink-400/80 mb-2">
            About me
          </p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Curious mind, math enthusiast 📐  
            Love deep conversations, night walks and meaningful connections.
          </p>
        </div>
      </div>

      {/* INTERESTS */}
      <div className="px-4 mt-6">
        <p className="text-xs uppercase tracking-widest text-pink-400/80 mb-3">
          Interests
        </p>

        <div className="flex flex-wrap gap-3">
          {[
            "Travel ✈️",
            "Music 🎧",
            "Gym 💪",
            "Tech 💻",
            "Photography 📸",
            "Coffee ☕",
            "Night drives 🌙",
          ].map((interest) => (
            <span
              key={interest}
              className="
                px-4 py-2 rounded-full text-sm
                bg-[#141414]
                border border-white/10
                text-gray-300
                hover:bg-[#1b1b1b]
                transition
              "
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
