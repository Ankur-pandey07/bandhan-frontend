"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Section = null | "account" | "discovery" | "privacy";
type SavedSettings = {
  distance: number;
  ageRange: [number, number];
  incognito: boolean;
  hideAge: boolean;
  hideDistance: boolean;
};
const STORAGE_KEY = "bandhan_settings_v1";

export default function SettingsOverlay({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>(null);

  const [distance, setDistance] = useState(20);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 30]);
  const [incognito, setIncognito] = useState(false);
  const [hideAge, setHideAge] = useState(false);
  const [hideDistance, setHideDistance] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const d: SavedSettings = JSON.parse(raw);
      setDistance(d.distance);
      setAgeRange(d.ageRange);
      setIncognito(d.incognito);
      setHideAge(d.hideAge);
      setHideDistance(d.hideDistance);
    } catch {}
  }, []);

  useEffect(() => {
    const d: SavedSettings = {
      distance, ageRange, incognito, hideAge, hideDistance,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  }, [distance, ageRange, incognito, hideAge, hideDistance]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.div
            className="fixed top-0 right-0 z-40 h-full w-full sm:w-[420px]
                       bg-[#0b0b0b] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 120 }}
            onDragEnd={(_, info) => info.offset.y > 80 && onClose()}
          >
            {/* DRAG HANDLE */}
            <div className="flex justify-center pt-2">
              <div className="h-1.5 w-10 rounded-full bg-white/20" />
            </div>

            {/* HEADER */}
            <div className="sticky top-0 z-10 bg-[#0b0b0b]/95 backdrop-blur
                            border-b border-white/10 px-4 py-4 flex items-center gap-3">
              {activeSection && (
                <button
                  onClick={() => setActiveSection(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 active:scale-95
                             flex items-center justify-center transition"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              <div className="flex-1 text-lg font-semibold">
                {activeSection === "account"
                  ? "Account"
                  : activeSection === "discovery"
                  ? "Discovery"
                  : activeSection === "privacy"
                  ? "Privacy"
                  : "Settings"}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 active:scale-95
                           flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-4 py-5 space-y-3 overflow-y-auto">
              {!activeSection && (
                <>
                  <Row label="Account" onClick={() => setActiveSection("account")} />
                  <Row label="Discovery" onClick={() => setActiveSection("discovery")} />
                  <Row label="Privacy" onClick={() => setActiveSection("privacy")} />
                </>
              )}

              {activeSection === "account" && (
                <div className="space-y-4">
                  <Card label="Phone number" value="+91 9XXXX XXXXX" />
                  <Card label="Email" value="user@email.com" />
                  <button
                    onClick={() => alert("Logout coming soon")}
                    className="w-full mt-6 py-3 rounded-full
                               bg-red-500/15 text-red-400 font-semibold
                               hover:bg-red-500/20 active:scale-[0.99] transition"
                  >
                    Log out
                  </button>
                </div>
              )}

              {activeSection === "discovery" && (
                <div className="space-y-6">
                  <Card label="Location" value="New Delhi (auto)" />
                  <Slider
                    label="Maximum Distance"
                    value={distance}
                    suffix=" km"
                    min={1}
                    max={100}
                    onChange={setDistance}
                  />
                  <RangeSlider
                    label="Age Range"
                    value={ageRange}
                    min={18}
                    max={60}
                    onChange={setAgeRange}
                  />
                </div>
              )}

              {activeSection === "privacy" && (
                <div className="space-y-3">
                  <ToggleRow
                    label="Incognito Mode"
                    desc="Browse profiles privately"
                    value={incognito}
                    onChange={setIncognito}
                  />
                  <ToggleRow
                    label="Hide Age"
                    desc="Hide your age from profile"
                    value={hideAge}
                    onChange={setHideAge}
                  />
                  <ToggleRow
                    label="Hide Distance"
                    desc="Hide distance from profile"
                    value={hideDistance}
                    onChange={setHideDistance}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* UI helpers */
function Row({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#141414] rounded-2xl px-4 py-4
                 flex items-center justify-between
                 hover:bg-white/5 active:scale-[0.99] transition"
    >
      <span className="font-medium">{label}</span>
      <ChevronRight size={16} className="text-white/50" />
    </button>
  );
}
function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#141414] rounded-2xl p-4 shadow-sm">
      <div className="text-xs text-white/50 mb-1">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
function Slider({
  label, value, suffix = "", min, max, onChange,
}: {
  label: string; value: number; suffix?: string; min: number; max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="bg-[#141414] rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-pink-500">{value}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-pink-500"
      />
    </div>
  );
}
function RangeSlider({
  label, value, min, max, onChange,
}: {
  label: string; value: [number, number]; min: number; max: number;
  onChange: (v: [number, number]) => void;
}) {
  return (
    <div className="bg-[#141414] rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-pink-500">{value[0]} – {value[1]}</span>
      </div>
      <input type="range" min={min} max={max} value={value[0]}
        onChange={(e) => onChange([Number(e.target.value), value[1]])}
        className="w-full mb-2 accent-pink-500" />
      <input type="range" min={min} max={max} value={value[1]}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="w-full accent-pink-500" />
    </div>
  );
}
function ToggleRow({
  label, desc, value, onChange,
}: { label: string; desc: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="bg-[#141414] rounded-2xl px-4 py-4 shadow-sm
                    flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-white/50">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition
          ${value ? "bg-pink-500" : "bg-white/20"}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full transition-transform
          ${value ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
