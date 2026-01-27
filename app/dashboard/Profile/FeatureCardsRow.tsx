"use client";

import { useRouter } from "next/navigation";

/* ================= MAIN ================= */
export default function FeatureCardsRow() {
  return (
    <div className="px-4 mt-6 space-y-6">

      {/* ================= PREMIUM PLANS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PremiumCard
          plan="plus"
          title="Bandhan Plus"
          price="₹199 / month"
          badge="POPULAR"
          features={[
            "Unlimited Likes",
            "Unlimited Rewinds",
            "1 Free Boost / week",
          ]}
        />

        <PremiumCard
          plan="gold"
          title="Bandhan Gold"
          price="₹399 / month"
          badge="BEST VALUE"
          features={[
            "See Who Likes You",
            "Top Picks",
            "5 Super Likes / day",
          ]}
        />

        <PremiumCard
          plan="platinum"
          title="Bandhan Platinum"
          price="₹699 / month"
          badge="PREMIUM"
          features={[
            "Priority Likes",
            "Message before matching",
            "See Who Likes You",
          ]}
        />
      </div>

      {/* ================= FEATURE ACTIONS ================= */}
      <div className="grid grid-cols-2 gap-4">
        <FeatureCard title="Super Likes" subtitle="Stand out instantly" icon="⭐" />
        <FeatureCard title="Boost" subtitle="Get more views" icon="⚡" />
        <FeatureCard title="Passport" subtitle="Match anywhere" icon="🌍" />
        <FeatureCard title="Incognito" subtitle="Browse privately" icon="🕶️" />
      </div>
    </div>
  );
}

/* ================= PREMIUM CARD ================= */
function PremiumCard({
  plan,
  title,
  price,
  badge,
  features,
}: {
  plan: "plus" | "gold" | "platinum";
  title: string;
  price: string;
  badge: string;
  features: string[];
}) {
  const router = useRouter(); // ✅ FIX HERE

  return (
    <div
      className="
        relative rounded-3xl p-5 pt-10
        bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]
        border border-white/10
        shadow-[0_25px_60px_rgba(0,0,0,0.9)]
        flex flex-col
      "
    >
      {/* BADGE */}
      <span className="absolute top-4 left-4 text-[10px] px-3 py-1 rounded-full bg-pink-500 text-black font-semibold">
        {badge}
      </span>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400 mt-1">{price}</p>

      <ul className="mt-4 space-y-2 text-sm text-gray-300">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push(`/dashboard/upgrade?plan=${plan}`)}
        className="
          mt-5 w-full py-2.5 rounded-full
          bg-gradient-to-r from-pink-500 to-pink-600
          text-black font-semibold
          hover:opacity-90 transition
        "
      >
        Upgrade
      </button>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div
      className="
        rounded-2xl p-4
        bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]
        border border-white/10
        shadow-[0_15px_40px_rgba(0,0,0,0.8)]
      "
    >
      <div className="space-y-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-500 text-black">
          {icon}
        </div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
