"use client";

import Link from "next/link";

export default function PremiumClient() {
  return (
    <main className="min-h-screen bg-[#FFF7F5] px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Premium Features
        </h1>

        <p className="text-gray-600 mb-16">
          Designed for meaningful connections, privacy, and better matches.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Unlimited Likes"
            icon="💎"
            desc="Like profiles freely without daily limits."
          />
          <FeatureCard
            title="See Who Likes You"
            icon="👀"
            desc="Instantly know who is interested in you."
          />
          <FeatureCard
            title="Verified Profiles"
            icon="🔒"
            desc="Connect only with genuine, verified users."
          />
        </div>

        <div className="mt-20">
          <Link
            href="/products/compare"
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-full text-lg font-semibold"
          >
            Compare Plans
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  icon,
  desc,
}: {
  title: string;
  icon: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
