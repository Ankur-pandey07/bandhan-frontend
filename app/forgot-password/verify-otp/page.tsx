"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(30);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /* LOAD EMAIL */
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (!savedEmail) {
      router.replace("/forgot-password");
    } else {
      setEmail(savedEmail);
    }
  }, [router]);

  /* RESEND COOLDOWN */
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  /* OTP INPUT */
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

  /* VERIFY OTP */
  async function verifyOtp() {
    setError("");
    if (!email) return;

    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: code }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      router.push("/forgot-password/reset-password");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* RESEND OTP */
  async function resendOtp() {
    if (!email) return;

    try {
      setCooldown(30);

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
    } catch {
      setError("Failed to resend OTP");
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading…
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 bg-[#ff4d6d]">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 text-center">

        <h1 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Verify OTP 🔐
        </h1>

        <p className="text-pink-500 text-sm mt-1 mb-6">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold">{email}</span>
        </p>

        <div className="flex justify-center gap-3 mb-6">
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
              className="
                w-12 h-12 text-xl text-center rounded-xl
                border border-pink-300
                focus:outline-none focus:border-pink-500
                focus:ring-2 focus:ring-pink-200
              "
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="
            w-full py-3 rounded-full font-semibold text-white
            bg-gradient-to-r from-pink-500 to-rose-500
            hover:opacity-95 active:scale-[0.98] transition
          "
        >
          {loading ? "Verifying..." : "Verify OTP →"}
        </button>

        <div className="mt-5 text-sm text-pink-600">
          Didn’t receive the code?{" "}
          {cooldown > 0 ? (
            <span>Resend in {cooldown}s</span>
          ) : (
            <button onClick={resendOtp} className="font-semibold hover:underline">
              Resend
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
