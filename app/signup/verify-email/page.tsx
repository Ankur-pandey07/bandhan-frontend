"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /* ================= LOAD EMAIL ================= */
  useEffect(() => {
    const savedEmail = localStorage.getItem("signupEmail");
    if (!savedEmail) {
      router.replace("/signup");
    } else {
      setEmail(savedEmail);
    }
  }, [router]);

  /* ================= COOLDOWN ================= */
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  /* ================= OTP INPUT ================= */
  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  /* ================= VERIFY OTP ================= */
  async function verifyOtp() {
    setError("");

    if (!email) {
      setError("Session expired. Please sign up again.");
      return;
    }

    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: code }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      localStorage.removeItem("signupEmail");
      router.replace("/signup/welcome");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ================= RESEND OTP ================= */
  async function resendOtp() {
    if (!email) return;

    try {
      setCooldown(30);

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
    } catch {
      setError("Failed to resend code. Try again.");
    }
  }

  /* ================= LOADING ================= */
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4
                     bg-gradient-to-br from-rose-100 via-white to-indigo-100">

      {/* 💎 Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md
                      rounded-3xl p-6 sm:p-8 text-center
                      shadow-2xl shadow-rose-200/40
                      animate-fadeIn">

        <h1 className="text-2xl font-semibold text-gray-900">
          Check your email 💌
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          We’ve sent a 6-digit code to
        </p>
        <p className="mt-1 text-sm font-medium text-gray-800">
          {email}
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-3 mt-6 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-12 h-12 rounded-xl border border-gray-300
                         text-xl text-center text-gray-900
                         focus:outline-none
                         focus:border-rose-500
                         focus:ring-2 focus:ring-rose-200
                         transition"
            />
          ))}
        </div>

        <p className="text-xs text-gray-400 mb-4">
          Tip: Check your spam or promotions folder
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full rounded-xl py-3
                     bg-gradient-to-r from-rose-500 to-pink-500
                     text-white font-semibold
                     hover:opacity-95 active:scale-[0.98]
                     transition-all disabled:opacity-60">
          {loading ? "Verifying..." : "Verify & Continue →"}
        </button>

        <div className="mt-6 text-sm text-gray-500">
          Didn’t get the code?{" "}
          {cooldown > 0 ? (
            <span className="text-gray-400">
              Resend in {cooldown}s
            </span>
          ) : (
            <button
              onClick={resendOtp}
              className="text-rose-500 font-medium hover:underline"
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
