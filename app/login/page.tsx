"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const BACKGROUNDS = [
  "/images/couple1.jpg",
  "/images/couple2.jpg",
  "/images/couple3.jpg",
  "/images/couple4.jpg",
];

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  // ✅ Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔁 Background slideshow
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      }
    );

    if (!res.ok) {
      alert("Login failed");
      return;
    }

    const data = await res.json();
    localStorage.setItem("userId", data.user._id);
    window.location.href = "/dashboard";
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {BACKGROUNDS.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[1200ms]
              ${index === bgIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"}
            `}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-center mb-4">
            Bandhan 💖 Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-3 rounded-xl border"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl border"
            required
          />

          <button className="w-full bg-pink-500 text-white py-3 rounded-full">
            Log in →
          </button>

          <p className="text-center mt-4 text-sm">
            New here? <Link href="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
