"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  {
    id: "long_term",
    title: "Long-term partner",
    desc: "A serious relationship that could lead to marriage",
    highlight: true,
  },
  {
    id: "long_term_open",
    title: "Long-term, open to short",
    desc: "Looking for something serious, but open-minded",
  },
  {
    id: "short_term_open",
    title: "Short-term, open to long",
    desc: "Something casual, but open to more",
  },
  {
    id: "friends",
    title: "New friends",
    desc: "Meet new people and see where it goes",
  },
  {
    id: "figuring_out",
    title: "Still figuring it out",
    desc: "Not sure yet, exploring possibilities",
  },
];

export default function RelationshipGoalPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  async function handleNext() {
    if (!selected) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/relationship-goal`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ relationshipGoal: selected }),
      }
    );

    router.push("/signup/about-you");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-rose-200/40 p-6 sm:p-8 animate-fadeIn">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step 2 of 7</span>
            <span>Getting to know you</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-2 w-[28%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          What are you looking for?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Choose what best matches your intention
        </p>

        {/* OPTIONS GRID — NO SCROLL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {OPTIONS.map((opt) => {
            const active = selected === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                  active
                    ? "border-rose-500 bg-rose-50 ring-2 ring-rose-300 animate-glow"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                } ${
                  opt.highlight && !selected
                    ? "border-rose-300 bg-rose-50/50"
                    : ""
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {opt.title}
                </div>
                <div className="text-sm text-gray-600">
                  {opt.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full rounded-xl py-3 font-semibold transition-all ${
            !selected
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-95 active:scale-[0.98]"
          }`}
        >
          Continue →
        </button>

      </div>
    </main>
  );
}
