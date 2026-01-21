"use client";

import { useEffect, useState } from "react";

export default function SoulVerseDepthCards() {
  const [expanded, setExpanded] = useState(false);

  /* -------- Scroll-based toggle -------- */
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY + 10) setExpanded(true); // scroll down
      if (currentY < lastY - 10) setExpanded(false); // scroll up

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center overflow-visible py-32">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* CARD 1 */}
        <Card
          image="/images/soulverse-talk.jpg"
          title="A place to talk"
          subtitle="Without pressure"
          className={
            expanded
              ? "translate-x-[-220px] translate-y-0 scale-100 z-30"
              : "translate-x-0 translate-y-0 scale-100 z-30"
          }
        />

        {/* CARD 2 */}
        <Card
          image="/images/soulverse-boundary.jpg"
          title="Not for answers"
          subtitle="Or predictions"
          className={
            expanded
              ? "translate-x-0 translate-y-0 scale-100 z-20"
              : "translate-x-[16px] translate-y-[16px] scale-[0.97] z-20 blur-[1px]"
          }
        />

        {/* CARD 3 */}
        <Card
          image="/images/soulverse-pace.jpg"
          title="At your pace"
          subtitle="You decide the rhythm"
          className={
            expanded
              ? "translate-x-[220px] translate-y-0 scale-100 z-10"
              : "translate-x-[32px] translate-y-[32px] scale-[0.94] z-10 blur-[2px]"
          }
        />
      </div>
    </div>
  );
}

/* ---------------- Card Component ---------------- */

function Card({
  image,
  title,
  subtitle,
  className,
}: {
  image: string;
  title: string;
  subtitle: string;
  className: string;
}) {
  return (
    <div
      className={`
        absolute top-1/2 left-1/2
        h-[320px] w-[260px]
        -translate-x-1/2 -translate-y-1/2
        rounded-3xl overflow-hidden
        shadow-xl
        transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
        bg-white
        ${className}
      `}
    >
      {/* IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/25" />

      {/* TEXT */}
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <h3 className="text-lg font-semibold leading-tight">{title}</h3>
        <p className="text-sm opacity-90">{subtitle}</p>
      </div>
    </div>
  );
}
