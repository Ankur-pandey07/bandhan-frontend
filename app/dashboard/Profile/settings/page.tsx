"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCityFromCoords } from "@/app/lib/location";
import PreferencesSection from "./PreferencesSection";
import DiscoveryControlSection from "./DiscoveryControlSection";
import AccountSection from "./AccountSection";
import NotificationsSection from "./NotificationsSection";
import LegalSupportSection from "./LegalSupportSection";




export default function SettingsPage() {
  const router = useRouter();

  /* ================= DISCOVERY STATE ================= */
  const [distance, setDistance] = useState(40);
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(30);
  const [discoveryOn, setDiscoveryOn] = useState(true);
  const [city, setCity] = useState<string>("Detecting...");


  /* ================= NOTIFICATION STATE ================= */
  const [notifMatch, setNotifMatch] = useState(true);
  const [notifMsg, setNotifMsg] = useState(true);
  const [notifLike, setNotifLike] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);

  /* ================= LOAD SAVED DISCOVERY ================= */
  useEffect(() => {
    const saved = localStorage.getItem("discoverySettings");
    if (saved) {
      const d = JSON.parse(saved);
      setDistance(d.distance ?? 40);
      setAgeMin(d.ageMin ?? 18);
      setAgeMax(d.ageMax ?? 30);
      setDiscoveryOn(d.discoveryOn ?? true);
    }
  }, []);
  useEffect(() => {
  if (!discoveryOn) return;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const cityName = await getCityFromCoords(lat, lng);
      setCity(cityName);
    },
    () => {
      setCity("Location denied");
    }
  );
}, [discoveryOn]);


  /* ================= SAVE DISCOVERY ================= */
  useEffect(() => {
    localStorage.setItem(
      "discoverySettings",
      JSON.stringify({
        distance,
        ageMin,
        ageMax,
        discoveryOn,
      })
    );
  }, [distance, ageMin, ageMax, discoveryOn]);

  return (
  
  <div className="relative min-h-screen text-white px-6 py-6 pb-32 space-y-14 bg-gradient-to-b from-[#0b0b0b] via-[#0f0f14] to-[#0b0b0b]">


      {/* HEADER */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-xl text-gray-300 hover:text-white"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      {/* ================= PREMIUM PLANS ================= */}
      <Section title="Premium Plans">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlanCard
            title="Bandhan Plus"
            price="₹199 / month"
            tag="POPULAR"
            highlight
            features={[
              "Unlimited Likes",
              "Unlimited Rewinds",
              "1 Free Boost every week",
            ]}
            onUpgrade={() =>
              router.push("/dashboard/upgrade?plan=plus")
            }
          />

          <PlanCard
            title="Bandhan Gold"
            price="₹399 / month"
            tag="BEST VALUE"
            features={[
              "See Who Likes You",
              "Top Picks",
              "5 Free Super Likes daily",
            ]}
            onUpgrade={() =>
              router.push("/dashboard/upgrade?plan=gold")
            }
          />

          <PlanCard
            title="Bandhan Platinum"
            price="₹699 / month"
            tag="PREMIUM"
            features={[
              "Priority Likes",
              "Message before matching",
              "See Who Likes You",
            ]}
            onUpgrade={() =>
              router.push("/dashboard/upgrade?plan=platinum")
            }
          />
        </div>
      </Section>

      {/* ================= DISCOVERY ================= */}
      <Section title="Discovery">
        <Toggle
          label="Enable Discovery"
          value={discoveryOn}
          onChange={setDiscoveryOn}
        />

        <Row
          label="Location"
          value={discoveryOn ? "DELHI" : "Paused"}
        />

        <div className={!discoveryOn ? "opacity-40 pointer-events-none" : ""}>
          <Slider
            label="Maximum Distance"
            value={distance}
            unit="km"
            onChange={setDistance}
          />
        </div>

        <div className={!discoveryOn ? "opacity-40 pointer-events-none" : ""}>
          <DualSlider
            label="Age Range"
            min={ageMin}
            max={ageMax}
            setMin={(v) => setAgeMin(Math.min(v, ageMax - 1))}
            setMax={(v) => setAgeMax(Math.max(v, ageMin + 1))}
          />
        </div>
      </Section>

      {/* ================= PREFERENCES ================= */}
      <PreferencesSection />

      {/* ================= DISCOVERY CONTROL ================= */}
     <DiscoveryControlSection />

      {/* ================= ACCOUNT ================= */}
     <AccountSection/>

      {/* ================= NOTIFICATIONS ================= */}
      <NotificationsSection />


      {/* ================= LEGAL ================= */}
      <LegalSupportSection />

    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
        {title}
      </p>
      <div className="rounded-2xl p-5 space-y-4 bg-[#121212] border border-white/5">
        {children}
      </div>
    </div>
  );
}

function PlanCard({ title, price, tag, features, highlight, onUpgrade }: any) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl p-6 min-h-[420px] bg-[#111] border ${
        highlight ? "border-pink-500/40" : "border-white/10"
      }`}
    >
      {tag && (
        <span className="self-start mb-3 px-3 py-1 text-xs font-semibold rounded-full bg-pink-500 text-black">
          {tag}
        </span>
      )}

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{price}</p>

        <ul className="space-y-3 mt-6 text-sm">
          {features.map((f: string) => (
            <li key={f} className="flex gap-2">
              <span className="text-green-400">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onUpgrade}
        className="mt-8 w-full py-3 rounded-full bg-pink-500 text-black font-semibold"
      >
        UPGRADE
      </button>
    </div>
  );
}

function Row({ label, value, danger }: any) {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#141414] border border-white/5">
      <span className={danger ? "text-red-500" : "text-sm"}>{label}</span>
      <span className="text-sm text-gray-500">{value ?? "›"}</span>
    </div>
  );
}

function Slider({ label, value, unit, onChange }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-xs bg-[#1f1f1f] px-3 py-1 rounded-full">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={100}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-pink-500"
      />
    </div>
  );
}

function DualSlider({ label, min, max, setMin, setMax }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-xs bg-[#1f1f1f] px-3 py-1 rounded-full">
          {min} – {max}
        </span>
      </div>
      <input
        type="range"
        min={18}
        max={60}
        value={min}
        onChange={(e) => setMin(+e.target.value)}
        className="w-full accent-pink-500 mb-2"
      />
      <input
        type="range"
        min={18}
        max={60}
        value={max}
        onChange={(e) => setMax(+e.target.value)}
        className="w-full accent-pink-500"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: any) {
  return (
    <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#141414] border border-white/5">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full ${
          value ? "bg-pink-500" : "bg-[#2a2a2a]"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full transition ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
