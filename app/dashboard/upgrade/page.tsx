"use client";

import { useSearchParams, useRouter } from "next/navigation";

const PLANS: any = {
  plus: {
    title: "Bandhan Plus",
    price: "₹199 / month",
    badge: "POPULAR",
    features: [
      "Unlimited Likes",
      "Unlimited Rewinds",
      "1 Free Boost every week",
    ],
  },
  gold: {
    title: "Bandhan Gold",
    price: "₹399 / month",
    badge: "BEST VALUE",
    features: [
      "See Who Likes You",
      "Top Picks",
      "5 Super Likes per day",
    ],
  },
  platinum: {
    title: "Bandhan Platinum",
    price: "₹699 / month",
    badge: "PREMIUM",
    features: [
      "Priority Likes",
      "Message before matching",
      "See Who Likes You",
    ],
  },
};

export default function UpgradePage() {
  const params = useSearchParams();
  const router = useRouter();

  const planKey = params.get("plan") || "plus";
  const plan = PLANS[planKey];

  if (!plan) {
    return null;
  }

  return (
    <div
      className="
        min-h-screen px-4 py-6 pb-28
        bg-gradient-to-b from-[#0b0b0b] via-[#0f0f14] to-[#0b0b0b]
        text-white
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="text-xl text-gray-300 hover:text-white"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">Upgrade</h1>
      </div>

      {/* PLAN CARD */}
      <div
        className="
          relative rounded-3xl p-6
          bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]
          border border-white/10
          shadow-[0_25px_60px_rgba(0,0,0,0.9)]
        "
      >
        {/* badge */}
        <span
          className="
            absolute top-4 left-4
            text-[10px] px-3 py-1 rounded-full
            bg-pink-500 text-black font-semibold
          "
        >
          {plan.badge}
        </span>

        <h2 className="text-xl font-semibold mt-6">
          {plan.title}
        </h2>

        <p className="text-gray-400 mt-1">
          {plan.price}
        </p>

        <ul className="mt-6 space-y-3 text-sm text-gray-300">
          {plan.features.map((f: string) => (
            <li key={f} className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <button
          className="
            mt-8 w-full py-3 rounded-full
            bg-gradient-to-r from-pink-500 to-pink-600
            text-black font-semibold text-base
            hover:opacity-90 transition
          "
          onClick={() => {
            alert("Payment flow will be added here 👑");
          }}
        >
          Continue
        </button>
      </div>

      {/* INFO */}
      <p className="mt-6 text-xs text-gray-500 text-center">
        You can cancel anytime. No commitment.
      </p>
    </div>
  );
}
