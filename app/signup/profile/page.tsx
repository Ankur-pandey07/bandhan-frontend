"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GENDERS = ["Man", "Woman", "Non-binary", "Prefer not to say"];

export default function ProfilePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  function calculateAge(date: Date) {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  }

  async function handleNext() {
    setError("");

    if (!firstName || !lastName || !day || !month || !year || !gender || !city) {
      setError("Please fill all required fields");
      return;
    }

    const dob = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    if (calculateAge(dob) < 18) {
      setError("You must be at least 18 years old");
      return;
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/profile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          dob: dob.toISOString().split("T")[0],
          gender,
          city,
          bio,
        }),
      }
    );

    router.push("/signup/photos");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl shadow-rose-200/40 p-6 sm:p-8">

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step 6 of 7</span>
            <span>Profile basics</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 w-[85%] bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Let’s build your profile ✨
        </h1>

        <div className="space-y-4 mb-4">

          {/* NAME */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-rose-500"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* DOB */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">
              Date of birth
            </div>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="px-3 py-3 border rounded-xl focus:outline-none focus:border-rose-500"
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="px-3 py-3 border rounded-xl focus:outline-none focus:border-rose-500"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-3 py-3 border rounded-xl focus:outline-none focus:border-rose-500"
              >
                <option value="">Year</option>
                {Array.from({ length: 70 }).map((_, i) => {
                  const y = new Date().getFullYear() - 18 - i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* CITY */}
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-rose-500"
          />

          {/* GENDER */}
          <div>
            <div className="text-sm font-semibold text-gray-700 mb-2">
              Gender
            </div>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 ${
                    gender === g
                      ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-300/40 scale-[1.03]"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* BIO */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-gray-700">
                Bio
              </span>
              <span className="text-xs text-gray-400">
                {bio.length}/200
              </span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 200))}
              placeholder="Tell something about yourself…"
              rows={4}
              className="w-full px-4 py-3 border rounded-xl resize-none focus:outline-none focus:border-rose-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              This helps people start better conversations
            </p>
          </div>

        </div>

        {error && (
          <p className="text-sm text-red-600 mb-4">{error}</p>
        )}

        <button
          onClick={handleNext}
          className="w-full rounded-xl py-3 font-semibold bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:opacity-95 active:scale-[0.98]"
        >
          Continue →
        </button>

      </div>
    </main>
  );
}
