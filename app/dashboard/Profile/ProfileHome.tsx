"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import FeatureCardsRow from "./FeatureCardsRow";

export default function ProfileHome() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  if (!user) return null;

  return (
    <div className="pb-24">
      {/* HEADER */}
      <ProfileHeader user={user} />

      {/* FEATURE CARDS */}
      <FeatureCardsRow />

      {/* BIO */}
      <div className="px-4 mt-6">
        <div
          className="
            rounded-2xl p-4
            bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]
            border border-white/10
            shadow-[0_15px_40px_rgba(0,0,0,0.8)]
          "
        >
          <p className="text-xs uppercase tracking-widest text-pink-400/80 mb-2">
            About me
          </p>

          <p className="text-sm text-gray-300 leading-relaxed">
            {user.bio || "Tell something about yourself ✨"}
          </p>
        </div>
      </div>

      {/* INTERESTS */}
      <div className="px-4 mt-6">
        <p className="text-xs uppercase tracking-widest text-pink-400/80 mb-3">
          Interests
        </p>

        <div className="flex flex-wrap gap-3">
          {(user.interests && user.interests.length > 0
            ? user.interests
            : ["Add interests"]
          ).map((interest: string) => (
            <span
              key={interest}
              className="
                px-4 py-2 rounded-full text-sm
                bg-[#141414]
                border border-white/10
                text-gray-300
                hover:bg-[#1b1b1b]
                transition
              "
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* 🔐 ADMIN EXTRA SECTION */}
      {user.role === "admin" && (
        <div className="px-4 mt-8">
          <div
            className="
              rounded-2xl p-4
              bg-[#140a0a]
              border border-pink-500/30
            "
          >
            <p className="text-xs uppercase tracking-widest text-pink-400 mb-3">
              Admin Tools
            </p>

            <button
              onClick={() => (window.location.href = "/admin/dashboard")}
              className="
                w-full py-3 rounded-xl
                bg-pink-500
                text-white font-semibold
                hover:bg-pink-600
                transition
              "
            >
              Go to Admin Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
