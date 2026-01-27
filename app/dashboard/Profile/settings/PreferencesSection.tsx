"use client";

import { useEffect, useState } from "react";

/* ================= OPTIONS ================= */

const INTERESTED_IN = ["Women", "Men", "Everyone"];
const LOOKING_FOR = ["Serious relationship", "Marriage", "Casual dating", "Friendship"];
const INTERESTS = ["Travel", "Music", "Movies", "Gym", "Food", "Photography", "Gaming", "Tech"];
const LIFESTYLE = ["Non-smoker", "Occasional smoker", "Non-drinker", "Occasional drinker", "Fitness focused"];

/* ================= MAIN ================= */

export default function PreferencesSection() {
  const [open, setOpen] = useState<null | string>(null);

  const [interestedIn, setInterestedIn] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState("");

  /* LOAD */
  useEffect(() => {
    const saved = localStorage.getItem("preferences");
    if (saved) {
      const d = JSON.parse(saved);
      setInterestedIn(d.interestedIn || "");
      setLookingFor(d.lookingFor || "");
      setInterests(d.interests || []);
      setLifestyle(d.lifestyle || "");
    }
  }, []);

  /* SAVE */
  useEffect(() => {
    localStorage.setItem(
      "preferences",
      JSON.stringify({ interestedIn, lookingFor, interests, lifestyle })
    );
  }, [interestedIn, lookingFor, interests, lifestyle]);

  return (
    <>
      <Section title="Preferences">
        <Row label="Interested in" value={interestedIn} onClick={() => setOpen("interested")} />
        <Row label="Looking for" value={lookingFor} onClick={() => setOpen("looking")} />
        <Row label="Interests" value={interests.join(", ")} onClick={() => setOpen("interests")} />
        <Row label="Lifestyle" value={lifestyle} onClick={() => setOpen("lifestyle")} />
      </Section>

      {open && (
        <BottomSheet title={titleMap[open]} onClose={() => setOpen(null)}>
          {open === "interested" &&
            INTERESTED_IN.map((v) => (
              <Option key={v} active={interestedIn === v} onClick={() => { setInterestedIn(v); setOpen(null); }}>
                {v}
              </Option>
            ))}

          {open === "looking" &&
            LOOKING_FOR.map((v) => (
              <Option key={v} active={lookingFor === v} onClick={() => { setLookingFor(v); setOpen(null); }}>
                {v}
              </Option>
            ))}

          {open === "interests" &&
            INTERESTS.map((v) => (
              <Option
                key={v}
                active={interests.includes(v)}
                onClick={() =>
                  setInterests(
                    interests.includes(v)
                      ? interests.filter((i) => i !== v)
                      : [...interests, v]
                  )
                }
              >
                {v}
              </Option>
            ))}

          {open === "lifestyle" &&
            LIFESTYLE.map((v) => (
              <Option key={v} active={lifestyle === v} onClick={() => { setLifestyle(v); setOpen(null); }}>
                {v}
              </Option>
            ))}
        </BottomSheet>
      )}
    </>
  );
}

/* ================= UI ================= */

const titleMap: any = {
  interested: "Interested in",
  looking: "Looking for",
  interests: "Interests",
  lifestyle: "Lifestyle",
};

function Section({ title, children }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">{title}</p>
      <div className="rounded-2xl p-5 space-y-3 bg-[#121212] border border-white/5">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, onClick }: any) {
  return (
    <div onClick={onClick} className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#141414] border border-white/5 cursor-pointer">
      <span className="text-sm text-white">{label}</span>
      <span className="text-sm text-gray-400">{value || "›"}</span>
    </div>
  );
}

/* ================= BOTTOM SHEET ================= */

function BottomSheet({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="
          absolute bottom-0 left-0 right-0
          md:left-[240px] md:right-0
          bg-[#121212] rounded-t-2xl
          max-h-[65vh] overflow-y-auto
          pb-20
        "
      >
        <div className="p-5">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold text-white">{title}</h3>
            <button onClick={onClose} className="text-gray-400">Close</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function Option({ children, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 rounded-xl mb-2 cursor-pointer text-white ${
        active ? "bg-pink-500 text-black" : "bg-[#141414]"
      }`}
    >
      {children}
    </div>
  );
}
