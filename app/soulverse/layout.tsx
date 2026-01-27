"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function SoulVerseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // 🔒 Temporary — real auth baad me
  const isLoggedIn = true;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ===== TOP LEFT BRAND HEADER ===== */}
      <header className="px-8 pt-6 pb-4">
        <button
          onClick={() => {
            if (isLoggedIn) {
              router.push("/dashboard");
            } else {
              router.push("/");
            }
          }}
          className="flex items-center gap-2 text-left"
        >
          <span className="text-xl">❤️</span>
          <span className="text-xl font-semibold tracking-wide text-[#C41E3A]">
            Bandhan
          </span>
        </button>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <main>
        {children}
      </main>
    </div>
  );
}
