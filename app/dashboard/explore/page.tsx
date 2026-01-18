"use client";

import { useState } from "react";
import ExploreHeader from "./components/ExploreHeader";
import MoodsPage from "./moods/page";

export default function ExplorePage() {
  const [openMoods, setOpenMoods] = useState(false);

  // 👇 agar moods open hai
  if (openMoods) {
    return <MoodsPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff6a6a] via-[#ff5a5f] to-[#e54848] pb-24">
      <ExploreHeader />

      <div className="px-4 sm:px-6 lg:px-8 mt-6 max-w-4xl">
        {/* MOODS CARD */}
        <div
          onClick={() => setOpenMoods(true)}
          className="
            cursor-pointer
            w-full
            rounded-3xl
            p-6
            bg-gradient-to-br from-[#2b2b2b] to-[#111]
            text-white
            transition
            active:scale-[0.97]
          "
        >
          <h3 className="text-xl font-semibold">Moods</h3>

          <p className="mt-1 text-sm text-gray-300">
            Aaj aap kaisa mehsoos kar rahe hain?
          </p>

          <div className="mt-4 flex gap-2 text-lg">
            <span>😔</span>
            <span>😌</span>
            <span>😊</span>
            <span>🤍</span>
            <span>🌿</span>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Tap to explore →
          </p>
        </div>
      </div>
    </div>
  );
}
