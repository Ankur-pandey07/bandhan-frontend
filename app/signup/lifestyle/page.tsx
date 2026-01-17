"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ===== DATA ===== */
const DRINKING = ["Never", "Occasionally", "Socially", "Frequently"];
const SMOKING = ["Never", "Occasionally", "Regularly"];
const WORKOUT = ["Never", "Sometimes", "Often", "Daily"];
const PETS = ["Love pets", "Have pets", "No pets", "Allergic"];

export default function LifestylePage() {
  const router = useRouter();

  const [drinking, setDrinking] = useState<string | null>(null);
  const [smoking, setSmoking] = useState<string | null>(null);
  const [workout, setWorkout] = useState<string | null>(null);
  const [pets, setPets] = useState<string | null>(null);

  async function handleNext() {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/lifestyle`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          drinking,
          smoking,
          workout,
          pets,
        }),
      }
    );

    router.push("/signup/interests");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-indigo-100">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT — QUESTIONS */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-rose-200/40 p-6 sm:p-8">

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Step 4 of 7</span>
              <span>Lifestyle</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 w-[56%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Lifestyle habits 🌿
          </h1>

          <Section title="Drinking">
            {DRINKING.map((item) => (
              <Chip
                key={item}
                label={item}
                active={drinking === item}
                onClick={() => setDrinking(item)}
              />
            ))}
          </Section>

          <Section title="Smoking">
            {SMOKING.map((item) => (
              <Chip
                key={item}
                label={item}
                active={smoking === item}
                onClick={() => setSmoking(item)}
              />
            ))}
          </Section>

          <Section title="Workout">
            {WORKOUT.map((item) => (
              <Chip
                key={item}
                label={item}
                active={workout === item}
                onClick={() => setWorkout(item)}
              />
            ))}
          </Section>

          <Section title="Pets">
            {PETS.map((item) => (
              <Chip
                key={item}
                label={item}
                active={pets === item}
                onClick={() => setPets(item)}
              />
            ))}
          </Section>

          {/* ACTIONS */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleNext}
              className="w-full rounded-xl py-3 font-semibold bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-95 active:scale-[0.98]"
            >
              Continue →
            </button>

            <button
              onClick={() => router.push("/signup/interests")}
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
              Lifestyle
            </div>

            <PreviewItem label="🍷" value={drinking} />
            <PreviewItem label="🚬" value={smoking} />
            <PreviewItem label="🏋️" value={workout} />
            <PreviewItem label="🐾" value={pets} />

            {!drinking && !smoking && !workout && !pets && (
              <div className="text-sm text-gray-400 mt-4">
                Your lifestyle choices will appear here
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

/* ===== UI HELPERS ===== */

function Section({ title, children }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
        active
          ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-300/40 scale-[1.03]"
          : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function PreviewItem({ label, value }: any) {
  if (!value) return null;

  return (
    <div className="text-sm text-gray-700 mb-2">
      <span className="mr-2">{label}</span>
      {value}
    </div>
  );
}
