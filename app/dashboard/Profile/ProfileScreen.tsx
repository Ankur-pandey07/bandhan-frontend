"use client";

import { useState } from "react";
import EditProfileScreen from "./EditProfileScreen";
import ProfileSummary from "./ProfileSummary";
import FeatureCards from "./FeatureCards";
import { calculateProfileCompletion } from "./profile.utils";


/* ---------- PROFILE DATA TYPE ---------- */
type ProfileData = {
  photos: string[];
  about: string;
  interests: string[];

  gender?: string;
  relationship?: string;
  height?: number;
  lookingFor?: string;
  pronouns?: string;

  drinking?: string;
  smoking?: string;
  workout?: string;
  pets?: string;

  education?: string;
  languages?: string[];

  hideAge?: boolean;
  hideDistance?: boolean;
};

export default function ProfileScreen() {
  const [mode, setMode] = useState<"preview" | "edit">("preview");

  /* 🔑 SINGLE SOURCE OF TRUTH */
  const [profileData, setProfileData] = useState<ProfileData>({
    photos: [],
    about: "",
    interests: [],

    gender: undefined,
    relationship: undefined,
    height: undefined,
    lookingFor: undefined,
    pronouns: undefined,

    drinking: undefined,
    smoking: undefined,
    workout: undefined,
    pets: undefined,

    education: undefined,
    languages: [],

    hideAge: false,
    hideDistance: false,
  });

  // ✅ SAFE: now returns NUMBER only
  const completion = calculateProfileCompletion(profileData);

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-40 bg-black border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          {mode === "edit" ? "Edit profile" : "Profile"}
        </h1>

        <div className="flex gap-2 text-sm">
          <button
            onClick={() => setMode("edit")}
            className={`px-3 py-1 rounded-full ${
              mode === "edit" ? "bg-white text-black" : "text-gray-400"
            }`}
          >
            Edit
          </button>

          <button
            onClick={() => setMode("preview")}
            className={`px-3 py-1 rounded-full ${
              mode === "preview" ? "bg-white text-black" : "text-gray-400"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* BODY */}
      {mode === "edit" ? (
        <EditProfileScreen
          data={profileData}
          onChange={setProfileData}
          onBack={() => setMode("preview")}
        />
      ) : (
        <div className="px-4 pt-6">
          {/* ✅ SIMPLE & SAFE PREVIEW */}
          <ProfileSummary data={profileData} />

          <FeatureCards />

          <div className="mt-8 bg-[#141414] rounded-xl p-4">
            <p className="text-sm text-gray-400">
              ✔ Phone verified · ✔ Safe community · ✔ Control who can message you
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
