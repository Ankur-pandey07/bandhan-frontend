"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      setError("Session expired. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            newPassword: password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      localStorage.removeItem("resetEmail");
      router.replace("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 bg-[#ff4d6d]">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8">

        <h1 className="text-xl font-semibold text-center bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Create new password 🔑
        </h1>

        <p className="text-center text-pink-500 text-sm mt-1 mb-6">
          Choose a strong password to secure your account
        </p>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl border border-pink-300 bg-white mb-3
              focus:outline-none focus:border-pink-500
              focus:ring-2 focus:ring-pink-200
            "
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl border border-pink-300 bg-white mb-4
              focus:outline-none focus:border-pink-500
              focus:ring-2 focus:ring-pink-200
            "
          />

          {error && (
            <p className="text-sm text-red-600 mb-3 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-pink-500 to-rose-500
              hover:opacity-95 active:scale-[0.98] transition
            "
          >
            {loading ? "Updating..." : "Update password →"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          You’ll be redirected to login after updating your password
        </p>

      </div>
    </main>
  );
}
