"use client";

import { useRouter } from "next/navigation";
import ProfileCompletionRing from "./ProfileCompletionRing";

export default function ProfileHeader() {
  const router = useRouter();

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
              Ankur, 21
            </h2>

            {/* COMPLETION RING (REPLACED TEXT) */}
            <div className="flex items-center gap-2">
              <ProfileCompletionRing percent={85} />
              <span className="text-xs text-pink-400 font-medium">
                Complete
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Math Student • BTech • Looking for something meaningful
          </p>

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
