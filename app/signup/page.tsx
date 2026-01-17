"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const name = (form.name as any).value;
    const email = (form.email as any).value;
    const password = (form.password as any).value;
    const confirm = (form.confirm as any).value;

    if (!name) return setError("Name is required");
    if (password.length < 8)
      return setError("Password must be at least 8 characters");
    if (password !== confirm)
      return setError("Passwords do not match");

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("signupEmail", email);
      router.push("/signup/verify-email");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
   <main className="relative min-h-screen overflow-hidden
                 bg-gradient-to-br
                 from-rose-100 via-white to-indigo-100
                 flex items-center justify-center px-4">


      {/* 🔮 Blurred Background Photos */}
     {/* Background Image Left */}
<img
  src="/images/bg-couple-1.jpg"
  alt=""
  className="pointer-events-none select-none
             absolute -top-32 -left-32
             w-[520px] md:w-[620px]
             opacity-40 blur-xl
             animate-floatSlow"
/>

{/* Background Image Right */}
<img
  src="/images/bg-couple-2.jpg"
  alt=""
  className="pointer-events-none select-none
             absolute -bottom-32 -right-32
             w-[520px] md:w-[620px]
             opacity-40 blur-xl
             animate-floatSlowReverse"
/>

      <img
  src="/images/bg-couple-3.jpg"
  alt=""
  className="pointer-events-none select-none
             absolute -bottom-32 -right-32
             w-[520px] md:w-[620px]
             opacity-40 blur-xl
             animate-floatSlowReverse"
             />

      {/* 🌸 Gradient Glow Orbs */}
      <div className="absolute w-72 h-72 bg-rose-300/30 rounded-full
                      blur-3xl top-20 left-20 animate-pulseSlow"></div>
      <div className="absolute w-72 h-72 bg-indigo-300/30 rounded-full
                      blur-3xl bottom-20 right-20 animate-pulseSlow"></div>

      {/* 💎 Signup Card */}
      <div className="relative w-full max-w-md
                bg-white/85 backdrop-blur-md
                rounded-3xl
                p-6 sm:p-8
                shadow-2xl shadow-rose-200/40">


        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Create your Bandhan 💖
        </h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          Start something meaningful today
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="name"
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-gray-200
                       px-4 py-3 text-sm
                       focus:border-rose-500 focus:ring-2 focus:ring-rose-200
                       transition"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded-xl border border-gray-200
                       px-4 py-3 text-sm
                       focus:border-rose-500 focus:ring-2 focus:ring-rose-200
                       transition"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Create a secure password"
            className="w-full rounded-xl border border-gray-200
                       px-4 py-3 text-sm
                       focus:border-rose-500 focus:ring-2 focus:ring-rose-200
                       transition"
          />

          <input
            name="confirm"
            type="password"
            required
            placeholder="Confirm password"
            className="w-full rounded-xl border border-gray-200
                       px-4 py-3 text-sm
                       focus:border-rose-500 focus:ring-2 focus:ring-rose-200
                       transition"
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 mt-2
                       bg-gradient-to-r from-rose-500 to-pink-500
                       text-white font-semibold
                       hover:opacity-95 active:scale-[0.98]
                       transition-all disabled:opacity-60">
            {loading ? "Please wait..." : "Continue →"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-500">
          Already on Bandhan?{" "}
          <Link href="/login" className="text-rose-500 hover:underline">
            Log in instead
          </Link>
        </p>

        <p className="mt-3 text-xs text-center text-gray-400">
          🔒 We respect your privacy. No spam. Ever.
        </p>
      </div>
    </main>
  );
}
