"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-br from-rose-100 via-white to-indigo-100 overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute w-72 h-72 bg-rose-300/30 rounded-full blur-3xl top-16 left-16"></div>
      <div className="absolute w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl bottom-16 right-16"></div>

      {/* Card */}
      <div
        className="relative w-full max-w-md bg-white/90 backdrop-blur-md
                   rounded-3xl shadow-2xl shadow-rose-200/40
                   p-8 sm:p-10 text-center animate-fadeIn"
      >
        {/* Icon */}
        <div className="text-4xl mb-4">💖</div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
          Welcome to Bandhan
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
          Your journey to something meaningful starts now.
          Let’s set up your profile so we can help you discover
          trusted connections that truly match you.
        </p>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Profile setup</span>
            <span>Just starting</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-2 w-[5%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Takes less than 2 minutes
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/signup/preferences")}
          className="w-full rounded-xl py-3
                     bg-gradient-to-r from-rose-500 to-pink-500
                     text-white font-semibold
                     hover:opacity-95 active:scale-[0.98]
                     transition-all duration-200"
        >
          Let’s get started →
        </button>
      </div>
    </main>
  );
}
