"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SoulVerseIntro() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const lastScrollY = useRef(0);
const [exiting, setExiting] = useState(false);

  // Scroll direction detection
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY.current + 6) {
        setExpanded(true); // scroll down → expand
      } else if (current < lastScrollY.current - 6) {
        setExpanded(false); // scroll up → merge
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1F1F] px-6">
      <section
  className={`
    max-w-6xl mx-auto min-h-screen flex items-center
    transition-all duration-500 ease-out
    ${exiting ? "opacity-0 blur-sm translate-y-2" : "opacity-100 blur-0"}
  `}
>

        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              SoulVerse
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-md">
              A calm space to talk things through.
            </p>

            <button
              onClick={() => {
  setExiting(true);
  setTimeout(() => {
    router.push("/soulverse/chat");
  }, 600);
}}

              className="rounded-full bg-black text-white px-8 py-4 text-sm font-medium hover:opacity-90 transition"
            >
              Start a conversation
            </button>

            <p className="mt-3 text-sm text-gray-500">
              You decide how it begins.
            </p>
          </div>

          {/* RIGHT — DEPTH STACK */}
          <div
            className="relative h-[360px] cursor-pointer select-none"
            onClick={() => setExpanded((p) => !p)}
          >
            <DepthCard
              expanded={expanded}
              index={0}
              image="/images/soulverse-talk.jpg"
              title="A place to talk"
              subtitle="Without pressure"
            />

            <DepthCard
              expanded={expanded}
              index={1}
              image="/images/soulverse-boundary.jpg"
              title="Not for answers"
              subtitle="Or predictions"
            />

            <DepthCard
              expanded={expanded}
              index={2}
              image="/images/soulverse-pace.jpg"
              title="At your pace"
              subtitle="You decide the rhythm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- DEPTH CARD ---------------- */

function DepthCard({
  image,
  title,
  subtitle,
  index,
  expanded,
}: {
  image: string;
  title: string;
  subtitle: string;
  index: number;
  expanded: boolean;
}) {
  /* ---------- COLLAPSED (MERGED) ---------- */
  const collapsed = [
    // Front card
    "translate-x-0 translate-y-0 scale-100 z-30 blur-0 opacity-100",
    // Middle card (slightly right + down)
    "translate-x-[18px] translate-y-[18px] scale-[0.96] z-20 blur-[1px] opacity-70",
    // Back card (more right + down)
    "translate-x-[36px] translate-y-[36px] scale-[0.92] z-10 blur-[2px] opacity-50",
  ];

  /* ---------- EXPANDED (SPLIT) ---------- */
  const expandedState = [
    // Left card
    "-translate-x-[220px] translate-y-[0px] scale-100 z-30 opacity-100",
    // Center card
    "translate-x-0 translate-y-[40px] scale-[0.98] z-20 opacity-100",
    // Right card
    "translate-x-[220px] translate-y-[0px] scale-100 z-10 opacity-100",
  ];

  return (
    <div
      className={`
        absolute left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[280px] h-[190px]
        rounded-[28px] overflow-hidden
        transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        ${expanded ? expandedState[index] : collapsed[index]}
      `}
    >
      {/* IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* TEXT */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs opacity-80 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
