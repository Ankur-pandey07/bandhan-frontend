"use client";

import { useState } from "react";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify-login-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "OTP verification failed");
      return;
    }

    setMessage("OTP verified successfully 🎉");
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded-xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Verify OTP</h2>

        {message && (
          <p className="text-center text-red-500">{message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-red-600 text-white py-2 rounded"
        >
          Verify OTP
        </button>
      </div>
    </main>
  );
}
