"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "non_binary", label: "Beyond Binary" },
  { id: "everyone", label: "Everyone" },
];

export default function PreferencesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  async function handleNext() {
    if (selected.length === 0) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/preferences`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ interestedIn: selected }),
      }
    );

    router.push("/signup/relationship-goal");
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-rose-200/40 p-6 sm:p-8 animate-fadeIn">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step 1 of 7</span>
            <span>Just starting</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-2 w-[14%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Who are you interested in seeing?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          You can choose more than one
        </p>

        <div className="space-y-3 mb-8">
          {OPTIONS.map((opt) => {
            const active = selected.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className={`w-full py-4 px-4 rounded-2xl border text-left font-medium transition-all ${
                  active
                    ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className={`w-full rounded-xl py-3 font-semibold transition-all ${
            selected.length === 0
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
