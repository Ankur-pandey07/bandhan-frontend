"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function PremiumPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔐 CHECK LOGIN STATUS
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Not logged in");
        }

        const data = await res.json();

        // ✅ already premium → dashboard
        if (data.user?.isPremium) {
          toast.success("You are already a Premium member 🌟");
          router.push("/dashboard");
          return;
        }

      } catch (error) {
        toast.error("Please login to access Premium");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Checking premium access...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F5] px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center">

        <h1 className="text-3xl font-bold text-[#B11226] mb-4">
          Go Premium 💎
        </h1>

        <p className="text-gray-600 mb-6">
          Unlock the full Bandhan experience & find your perfect match faster.
        </p>

        <ul className="text-left mb-8 space-y-3 text-sm text-gray-700">
          <li>⭐ Unlimited Likes</li>
          <li>💬 Chat Without Limits</li>
          <li>🟡 Gold Profile Badge</li>
          <li>🚀 Profile Boost</li>
          <li>🔒 Priority Support</li>
        </ul>

        <button
          onClick={() => {
            toast.success("Payment integration coming next 💳");
            router.push("/payment");
          }}
          className="w-full bg-[#B11226] hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Upgrade for ₹299 / month
        </button>

        <p className="mt-4 text-xs text-gray-400">
          Cancel anytime • Secure payments • Trusted by thousands
        </p>
      </div>
    </div>
  );
}
