"use client";

import { useEffect, useState } from "react";

export default function PreviewProfile() {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  useEffect(() => {
    const load = async () => {
      if (!userId) return;

      try {
        // USER BASIC DETAILS
        const meRes = await fetch(
          "http://localhost:5000/api/auth/me",
          { credentials: "include" }
        );
        const meData = await meRes.json();
        setUser(meData.user);

        // PROFILE DETAILS
        const profileRes = await fetch(
          `http://localhost:5000/api/profile/get/${userId}`
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

      } catch (error) {
        console.log("Preview err:", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);


  // ❌ USER NOT LOGGED IN
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">❌ User not logged in</p>
      </div>
    );
  }

  // ⏳ STILL LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">⏳ Loading profile...</p>
      </div>
    );
  }

  // ❌ USER FETCH FAILED
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">❌ User data missing</p>
      </div>
    );
  }

  // ⚠️ PROFILE NOT CREATED YET
  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">
          ⚠️ No profile found — create profile first!
        </p>

        <button
          onClick={() => window.location.href = "/profile/create"}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Create Profile ❤️
        </button>
      </div>
    );
  }


  // 🎉 FINAL PROFILE UI
  return (
    <div className="min-h-screen bg-white px-4 py-20">

      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center">
        <img
          src={profile.photos?.[0] || "/default-user.png"}
          className={`w-40 h-40 rounded-full object-cover border-4 
            ${profile.isPremium
              ? "border-yellow-400 shadow-[0_0_20px_gold]"
              : "border-pink-500"
            }`}
        />

        <h1 className="text-2xl font-bold mt-3 flex items-center gap-2">
          {user.name}, {profile?.age || "--"}

          {profile?.isPremium && (
            <span className="text-yellow-500 text-2xl">👑</span>
          )}
        </h1>

        <p className="text-gray-500 text-sm">
          {profile.city || "City not added"}
        </p>

        <p className="mt-4 text-center text-gray-700 w-[90%]">
          {profile.vibeLine || "No bio added yet..."}
        </p>
      </div>

      <hr className="my-6" />

      {/* PHOTOS */}
      <h2 className="text-xl font-bold mb-3">📸 Photos</h2>

      <div className="grid grid-cols-2 gap-3">
        {profile.photos?.map((p, i) => (
          <div key={i} className="relative">
            <img
              src={p}
              className={`w-full h-52 object-cover rounded-xl 
                ${!profile.isPremium && i > 1 ? "blur-sm brightness-75" : ""}`}
            />

            {!profile.isPremium && i > 1 && (
              <div className="absolute inset-0 bg-black/60 flex justify-center items-center text-white font-bold rounded-xl">
                🔒 Premium Unlock
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="my-6" />

      {/* REELS */}
      <h2 className="text-xl font-bold mb-3">🎞 Reels</h2>

      <div className="grid grid-cols-1 gap-4">
        {profile.reels?.map((v, i) => (
          <div key={i} className="relative">

            <video
              className="w-full h-60 rounded-xl"
              src={v}
              controls={profile.isPremium}
            />

            {!profile.isPremium && (
              <div className="absolute inset-0 bg-black/70 text-white flex flex-col justify-center items-center rounded-xl">
                <p className="text-lg font-bold mb-2">🔒 Locked Content</p>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
                  Unlock Premium 🔥
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      <div className="h-10" />

    </div>
  );
}
