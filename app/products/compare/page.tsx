"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    highlight: false,
    features: {
      likes: "Limited",
      seeLikes: false,
      priority: false,
      verified: true,
      rewind: false,
      support: "Standard",
    },
  },
  {
    name: "Plus",
    price: "₹299 / mo",
    highlight: false,
    features: {
      likes: "Unlimited",
      seeLikes: false,
      priority: false,
      verified: true,
      rewind: true,
      support: "Standard",
    },
  },
  {
    name: "Gold",
    price: "₹499 / mo",
    highlight: true,
    features: {
      likes: "Unlimited",
      seeLikes: true,
      priority: false,
      verified: true,
      rewind: true,
      support: "Priority",
    },
  },
  {
    name: "Platinum",
    price: "₹799 / mo",
    highlight: false,
    features: {
      likes: "Unlimited",
      seeLikes: true,
      priority: true,
      verified: true,
      rewind: true,
      support: "VIP",
    },
  },
];

const FeatureRow = ({
  label,
  values,
}: {
  label: string;
  values: any[];
}) => (
  <div className="grid grid-cols-5 py-4 border-t text-sm items-center">
    <div className="font-medium">{label}</div>
    {values.map((v, i) => (
      <div key={i} className="text-center">
        {typeof v === "boolean" ? (v ? "✅" : "❌") : v}
      </div>
    ))}
  </div>
);

export default function ComparePlansPage() {
  return (
    <main className="pt-28 pb-24 bg-[#FAFAFA] text-gray-800">

      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Choose the plan that fits your journey
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Whether you’re exploring or ready for something meaningful,
          Bandhan plans are designed for clarity, trust, and better matches.
        </p>
      </section>

      {/* ================= MOBILE CARDS ================= */}
      <section className="block md:hidden px-6 mb-20">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`min-w-[260px] rounded-2xl p-6 border shadow-sm ${
                plan.highlight ? "border-red-500" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>

              <ul className="space-y-3 text-sm text-gray-700">
                <li>💎 Likes: {plan.features.likes}</li>
                <li>👀 See Likes: {plan.features.seeLikes ? "Yes" : "No"}</li>
                <li>⚡ Priority: {plan.features.priority ? "Yes" : "No"}</li>
                <li>🔒 Verified Profiles</li>
                <li>⏪ Rewind: {plan.features.rewind ? "Yes" : "No"}</li>
                <li>🎧 Support: {plan.features.support}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DESKTOP TABLE ================= */}
      <section className="hidden md:block max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-5 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 font-semibold">Features</div>
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-6 text-center font-semibold ${
                p.highlight ? "bg-red-50" : ""
              }`}
            >
              {p.name}
              <div className="text-sm text-gray-500 mt-1">{p.price}</div>
            </div>
          ))}
        </div>

        <FeatureRow
          label="Likes"
          values={plans.map((p) => p.features.likes)}
        />
        <FeatureRow
          label="See Who Likes You"
          values={plans.map((p) => p.features.seeLikes)}
        />
        <FeatureRow
          label="Priority Matches"
          values={plans.map((p) => p.features.priority)}
        />
        <FeatureRow
          label="Verified Profiles"
          values={plans.map(() => true)}
        />
        <FeatureRow
          label="Rewind Swipes"
          values={plans.map((p) => p.features.rewind)}
        />
        <FeatureRow
          label="Customer Support"
          values={plans.map((p) => p.features.support)}
        />
      </section>

      {/* ================= CTA ================= */}
      <section className="text-center">
        <Link
          href="/products/pricing"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition"
        >
          Continue to Pricing
        </Link>
      </section>

    </main>
  );
}
