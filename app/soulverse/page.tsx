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
        setExpanded(true);
      } else if (current < lastScrollY.current - 6) {
        setExpanded(false);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#1F1F1F] px-6">
      
      {/* ================= PHASE 1 — ARRIVAL ================= */}
      <section
        className={`
          max-w-6xl mx-auto min-h-screen flex items-center
          transition-all duration-500 ease-out
          ${exiting ? "opacity-0 blur-sm translate-y-2" : "opacity-100"}
        `}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT CONTENT (NO BUTTON NOW) */}
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              SoulVerse
            </h1>

            <p className="text-lg text-gray-600 max-w-md">
              A calm space to talk things through.
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
      
      
    {/* ================= RELATIONSHIP INSIGHT CARD ================= */}
<section className="max-w-5xl mx-auto px-6 mb-32 mt-40 md:mt-0">
  <div
    className="relative rounded-3xl overflow-hidden bg-white shadow-[0_28px_70px_rgba(0,0,0,0.08)] transition hover:shadow-[0_34px_80px_rgba(0,0,0,0.12)] cursor-pointer"
    onClick={() => {
      // Step-4 me yahan chat open hoga
    }}
  >
    {/* Background image */}
    <div
  className="absolute inset-0 bg-cover bg-center pointer-events-none"
  style={{
    backgroundImage: "url('/images/relationship-insight.jpg')",
  }}
/>


    {/* Overlay — stronger on mobile */}
    <div className="absolute inset-0 bg-black/50 md:bg-black/30 pointer-events-none" />


    {/* Content */}
    <div className="relative z-20 px-8 py-12 md:px-12 md:py-16 text-white max-w-xl">

      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Relationship Insight
      </h2>

      <ul className="space-y-3 text-sm md:text-base text-white/90 mb-8">
        <li>Understand what’s really happening in your relationship</li>
        <li>Talk through confusion, distance, or patterns — calmly</li>
        <li>No predictions. Just honest guidance</li>
      </ul>

   <button
  onClick={(e) => {
    e.stopPropagation();
    setExiting(true);
    setTimeout(() => {
      router.push("/soulverse/relationship-insight");
    }, 400);
  }}
  className="
    inline-flex items-center justify-center
    rounded-full
    bg-black
    px-8 py-3
    text-sm font-medium text-white
    transition
    hover:opacity-90
    focus:outline-none focus:ring-2 focus:ring-black/20
  "
>
  start here
</button>


    </div>
  </div>
</section>


      {/* ================= CTA SECTION (POLISHED) ================= */}
<section className="max-w-3xl mx-auto pb-36 mt-24">
  <div className="rounded-3xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.06)] px-10 py-16 text-center">

    <h2 className="text-2xl font-semibold mb-4 tracking-wide">
      When you feel ready to begin
    </h2>

    <p className="text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
      There’s no pressure to start a conversation.  
      Enter only when it feels right for you.
    </p>

    <button
      onClick={() => {
        setExiting(true);
        setTimeout(() => {
          router.push("/soulverse/chat");
        }, 600);
      }}
      className="rounded-full bg-black text-white px-8 py-3.5 text-sm font-medium hover:opacity-90 transition"
    >
      Start a conversation
    </button>

    <p className="mt-3 text-xs text-gray-500">
      You decide how it begins.
    </p>
  </div>
</section>

    </div>
  );
}
{/* ================= PHASE 2 — INNER EXPLORATION (POLISHED) ================= */}
<section className="max-w-4xl mx-auto px-6 py-36">

  {/* Subtle section whisper */}
  <p className="text-sm text-gray-400 mb-20 tracking-wide">
    Take a quiet moment.
  </p>

  {/* -------- Layer 1: Gentle Reflection Prompts -------- */}
  <div className="grid md:grid-cols-3 gap-10 mb-28">
    {[
      "What’s been on your mind lately?",
      "Is there something you haven’t said yet?",
      "Do you want to be heard — or just understood?",
    ].map((text, i) => (
      <div
        key={i}
        className="rounded-3xl bg-white px-10 py-12 text-gray-700 shadow-[0_14px_36px_rgba(0,0,0,0.05)] transition hover:shadow-[0_18px_42px_rgba(0,0,0,0.08)]"
      >
        <p className="text-base leading-relaxed">
          {text}
        </p>
      </div>
    ))}
  </div>

  {/* -------- Layer 2: Emotional Safety Signals -------- */}
  <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28 text-gray-500 text-sm">
    <span>You’re always in control</span>
    <span>Nothing is forced here</span>
    <span>You can pause or leave anytime</span>
  </div>

  {/* -------- Layer 3: Self-Understanding Cards -------- */}
  <div className="grid md:grid-cols-3 gap-12">
    <div className="rounded-3xl bg-[#FAF8F5] px-10 py-12 transition-all hover:bg-white hover:-translate-y-0.5 shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
      <h3 className="text-sm font-medium mb-4 text-gray-800">
        What helps you feel comfortable?
      </h3>
      <p className="text-sm text-gray-600">
        Space • Time • Honesty • Silence
      </p>
    </div>

    <div className="rounded-3xl bg-[#FAF8F5] px-10 py-12 transition-all hover:bg-white hover:-translate-y-0.5 shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
      <h3 className="text-sm font-medium mb-4 text-gray-800">
        How do you usually express yourself?
      </h3>
      <p className="text-sm text-gray-600">
        Words • Actions • Listening
      </p>
    </div>

    <div className="rounded-3xl bg-[#FAF8F5] px-10 py-12 transition-all hover:bg-white hover:-translate-y-0.5 shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
      <h3 className="text-sm font-medium mb-4 text-gray-800">
        What matters most to you right now?
      </h3>
      <p className="text-sm text-gray-600">
        Peace • Growth • Connection
      </p>
    </div>
  </div>

</section>

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
  const collapsed = [
    "translate-x-0 translate-y-0 scale-100 z-30 opacity-100",
    "translate-x-[18px] translate-y-[18px] scale-[0.96] z-20 opacity-70",
    "translate-x-[36px] translate-y-[36px] scale-[0.92] z-10 opacity-50",
  ];

  const expandedState = [
    "-translate-x-[220px] translate-y-0 scale-100 z-30 opacity-100",
    "translate-x-0 translate-y-[40px] scale-[0.98] z-20 opacity-100",
    "translate-x-[220px] translate-y-0 scale-100 z-10 opacity-100",
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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs opacity-80 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
