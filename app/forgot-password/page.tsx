"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});


      const text = await res.text();

      // ❗ SAFE CHECK
      if (!res.ok) {
        if (text.includes("<!DOCTYPE")) {
          throw new Error("Server error. Please try again later.");
        }
        throw new Error(text);
      }

      // Only parse JSON if safe
      JSON.parse(text);

      localStorage.setItem("resetEmail", email);
      router.push("/forgot-password/verify-otp");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#ff4d6d] px-4">
      <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl w-full max-w-md shadow-2xl">

        <h1 className="text-xl font-semibold text-center text-pink-500">
          Forgot your password?
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email to receive an OTP
        </p>

        <form onSubmit={handleSendOTP}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-pink-300 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />

          {error && (
            <p className="text-sm text-red-600 text-center mb-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-pink-500 to-rose-500"
          >
            {loading ? "Sending..." : "Send OTP →"}
          </button>
        </form>
      </div>
    </main>
  );
}
