"use client";

import { useEffect, useState } from "react";

/* ================= OPTIONS ================= */

const WHO_YOU_SEE = [
  "Everyone",
  "Only verified profiles",
  "Recently active",
  "New profiles",
];

const WHO_SEES_YOU = [
  "Everyone",
  "Only people I liked",
  "Only verified users",
  "No one (Pause visibility)",
];

/* ================= MAIN ================= */

export default function DiscoveryControlSection() {
  const [open, setOpen] = useState<null | "see" | "seen">(null);

  const [whoYouSee, setWhoYouSee] = useState("");
  const [whoSeesYou, setWhoSeesYou] = useState("");

  /* ===== Load saved ===== */
  useEffect(() => {
    const saved = localStorage.getItem("discoveryControl");
    if (saved) {
      const d = JSON.parse(saved);
      setWhoYouSee(d.whoYouSee || "");
      setWhoSeesYou(d.whoSeesYou || "");
    }
  }, []);

  /* ===== Save ===== */
  useEffect(() => {
    localStorage.setItem(
      "discoveryControl",
      JSON.stringify({
        whoYouSee,
        whoSeesYou,
      })
    );
  }, [whoYouSee, whoSeesYou]);

  return (
    <>
      <Section title="Discovery Control">
        <Row
          label="Control who you see"
          value={whoYouSee}
          onClick={() => setOpen("see")}
        />
        <Row
          label="Control who sees you"
          value={whoSeesYou}
          onClick={() => setOpen("seen")}
        />
      </Section>

      {/* ================= MODALS ================= */}

      {open === "see" && (
        <SingleSelect
          title="Control who you see"
          options={WHO_YOU_SEE}
          value={whoYouSee}
          onSelect={(v) => {
            setWhoYouSee(v);
            setOpen(null);
          }}
          onClose={() => setOpen(null)}
        />
      )}

      {open === "seen" && (
        <SingleSelect
          title="Control who sees you"
          options={WHO_SEES_YOU}
          value={whoSeesYou}
          onSelect={(v) => {
            setWhoSeesYou(v);
            setOpen(null);
          }}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

/* ================= UI PARTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
        {title}
      </p>
      <div className="rounded-2xl p-5 space-y-3 bg-[#121212] border border-white/5">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#141414] border border-white/5 cursor-pointer hover:bg-[#1b1b1b]"
    >
      <span className="text-sm">{label}</span>
      <span className="text-sm text-gray-400">
        {value || "›"}
      </span>
    </div>
  );
}

/* ================= MODALS ================= */

function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end">
      <div className="w-full rounded-t-2xl bg-[#121212] p-5 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SingleSelect({ title, options, value, onSelect, onClose }: any) {
  return (
    <Modal title={title} onClose={onClose}>
      {options.map((opt: string) => (
        <div
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-4 py-3 rounded-xl mb-2 cursor-pointer ${
            value === opt
              ? "bg-pink-500 text-black"
              : "bg-[#141414]"
          }`}
        >
          {opt}
        </div>
      ))}
    </Modal>
  );
}
