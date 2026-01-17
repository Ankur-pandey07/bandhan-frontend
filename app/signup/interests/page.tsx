"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ===== DATA ===== */
const INTERESTS = [
  "Travel","Music","Movies","Fitness","Gaming","Photography",
  "Cooking","Reading","Art","Technology","Nature","Pets",
  "Foodie","Spirituality","Meditation","Yoga","Dancing",
  "Singing","Sports","Volunteering",
];

const MAX = 10;

export default function InterestsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(item: string) {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      if (selected.length >= MAX) return;
      setSelected([...selected, item]);
    }
  }

  async function handleNext() {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/interests`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ interests: selected }),
      }
    );

    router.push("/signup/profile");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-indigo-100">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT — INTEREST SELECTION */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-rose-200/40 p-6 sm:p-8">

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Step 5 of 7</span>
              <span>Interests</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 w-[70%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
            What are you into? 🎯
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Choose up to {MAX} interests
          </p>

          <div className="text-sm font-medium text-gray-700 mb-4">
            {selected.length} / {MAX} selected
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {INTERESTS.map((item) => (
              <Chip
                key={item}
                label={item}
                active={selected.includes(item)}
                disabled={selected.length >= MAX && !selected.includes(item)}
                onClick={() => toggle(item)}
              />
            ))}
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <button
              onClick={handleNext}
              className="w-full rounded-xl py-3 font-semibold
                         bg-gradient-to-r from-rose-500 to-pink-500
                         text-white hover:opacity-95 active:scale-[0.98]"
            >
              Continue →
            </button>

            <button
              onClick={() => router.push("/signup/profile")}
              className="w-full text-sm text-gray-500 hover:underline"
            >
              Skip for now
            </button>
          </div>
        </div>

        {/* RIGHT — LIVE PROFILE PREVIEW */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 h-fit sticky top-6">

          <div className="text-xs text-gray-500 mb-3">
            This is how your profile will look
          </div>

          <div className="rounded-2xl border p-5">
            <div className="text-lg font-semibold text-gray-900 mb-1">
              You
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Interests
            </div>

            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selected.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs
                               bg-rose-100 text-rose-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400">
                Your interests will appear here
              </div>
            )}
          </div>

          <div className="text-xs text-gray-400 mt-4">
            You can update this anytime later
          </div>
        </div>

      </div>
    </main>
  );
}

/* ===== CHIP ===== */

function Chip({ label, active, disabled, onClick }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
        active
          ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-300/40 scale-[1.03]"
          : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}
