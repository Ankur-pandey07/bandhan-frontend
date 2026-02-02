"use client";

import { useRouter } from "next/navigation";
import ProfileCompletionRing from "./ProfileCompletionRing";
import { useEffect, useState } from "react";

export default function ProfileHeader() {
  const router = useRouter();
const [user, setUser] = useState<any>(null);

useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
  credentials: "include",
})

    .then((res) => {
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    })
    .then((data) => {
      setUser(data.user);
    })
    .catch(() => {
      router.push("/login");
    });
}, [router]);

if (!user) {
  return null; // ya loading skeleton
}


  return (
    <div className="relative">
      {/* soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent blur-3xl" />

      {/* profile card */}
      <div
        className="
          relative mx-4 mt-6
          rounded-3xl overflow-hidden
          bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]
          border border-white/10
          shadow-[0_20px_50px_rgba(0,0,0,0.9)]
        "
      >
        {/* image (HEIGHT REDUCED) */}
        <div className="relative h-[200px]">
          <img
            src="/profile-placeholder.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {/* settings button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              router.push("/dashboard/profile/settings");
            }}
            className="
              absolute top-4 right-4 z-50
              w-10 h-10 rounded-full
              bg-black/60 backdrop-blur
              text-white
              hover:bg-black/80 transition
              flex items-center justify-center
            "
            aria-label="Open Settings"
          >
            ⚙️
          </button>

          {/* image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* info */}
       <div className="p-4 space-y-2">
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">
      {user?.role === "admin"
        ? "Admin"
        : user?.name || "User"}
    </h2>

    <div className="flex items-center gap-2">
      <ProfileCompletionRing percent={85} />
      <span className="text-xs text-pink-400 font-medium">
        Complete
      </span>
    </div>
  </div>

  <p className="text-sm text-gray-400">
    {user?.email}
  </p>

  {user?.role === "admin" && (
    <span className="inline-block text-xs px-3 py-1 rounded-full bg-pink-500 text-black">
      Admin Account
    </span>
  )}

  <button
    type="button"
    onClick={() => router.push("/dashboard/profile/edit")}
    className="
      mt-3 w-full py-2.5 rounded-full
      bg-gradient-to-r from-pink-500 to-pink-600
      text-black font-semibold
      hover:opacity-90 transition
    "
  >
    Edit Profile
  </button>
</div>

      </div>
    </div>
  );
}
