"use client";

import Link from "next/link";

export default function PricingClient() {
  return (
    <main className="min-h-screen bg-[#FFF7F5] px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 mb-16">
          Upgrade your journey with premium features designed for meaningful connections.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* PLUS */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-2">Bandhan Plus</h2>
            <p className="text-gray-500 mb-6">For getting started</p>
            <p className="text-3xl font-bold mb-6">₹499</p>
            <Link href="/checkout/plus" className="btn-primary">
              Choose Plus
            </Link>
          </div>

          {/* GOLD */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-yellow-400">
            <h2 className="text-xl font-bold mb-2">Bandhan Gold ⭐</h2>
            <p className="text-gray-500 mb-6">Most popular</p>
            <p className="text-3xl font-bold mb-6">₹999</p>
            <Link href="/checkout/gold" className="btn-primary">
              Choose Gold
            </Link>
          </div>

          {/* PLATINUM */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-2">Bandhan Platinum</h2>
            <p className="text-gray-500 mb-6">Maximum visibility</p>
            <p className="text-3xl font-bold mb-6">₹1499</p>
            <Link href="/checkout/platinum" className="btn-primary">
              Choose Platinum
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
