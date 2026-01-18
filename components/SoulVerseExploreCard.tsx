"use client";

import React from "react";

type Props = {
  onOpen: () => void;
};

const SoulVerseExploreCard: React.FC<Props> = ({ onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="mt-6 cursor-pointer rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white shadow-lg transition hover:opacity-95"
    >
      <h3 className="text-xl font-semibold">SoulVerse</h3>

      <p className="mt-2 text-sm text-white/80">
        Personal relationship guide —  
        no astrology, no predictions.
      </p>

      <p className="mt-4 text-xs text-white/60">
        Tap to talk • Chat & in-app voice
      </p>
    </div>
  );
};

export default SoulVerseExploreCard;
