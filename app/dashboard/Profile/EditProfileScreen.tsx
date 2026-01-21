"use client";

import PhotoGrid from "./PhotoGrid";
import { calculateProfileCompletion } from "./profile.utils";

/* ---------- STATIC INTERESTS ---------- */
const ALL_INTERESTS = [
  "Travel",
  "Music",
  "Movies",
  "Gym",
  "Foodie",
  "Tech",
  "Gaming",
  "Photography",
  "Coffee",
  "Night drives",
  "Startup",
  "Pets",
];

export default function EditProfileScreen({
  data,
  onChange,
  onBack,
}: {
  data: {
    photos: string[];
    about: string;
    interests: string[];
  };
  onChange: (data: {
    photos: string[];
    about: string;
    interests: string[];
  }) => void;
  onBack: () => void;
}) {
  /* ---------- DATA ---------- */
  const { photos, about, interests } = data;
  const MAX_ABOUT = 500;

  /* ---------- COMPLETION ---------- */
  const completion = calculateProfileCompletion({
    photos,
    about,
    interests,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-xl">
          ←
        </button>

        <div>
          <h1 className="text-lg font-semibold">Edit profile</h1>
          <p className="text-xs text-gray-400">
            Profile {completion}% complete
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-24 space-y-8">
        {/* PHOTOS */}
        <section className="mt-4">
          <h2 className="text-sm font-semibold mb-3">Media</h2>

          <PhotoGrid
            photos={photos}
            onAdd={(file) => {
              const url = URL.createObjectURL(file);
              onChange({
                ...data,
                photos: [...photos, url].slice(0, 6),
              });
            }}
            onReorder={(from, to) => {
              const updated = [...photos];
              const moved = updated.splice(from, 1)[0];
              updated.splice(to, 0, moved);

              onChange({
                ...data,
                photos: updated,
              });
            }}
            onRemove={(index) => {
              onChange({
                ...data,
                photos: photos.filter((_, i) => i !== index),
              });
            }}
          />
        </section>

        {/* ABOUT */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">
              About me{" "}
              <span className="text-pink-500 text-xs ml-1">IMPORTANT</span>
            </h2>
            <span className="text-pink-500 text-xs">
              {about.length}/{MAX_ABOUT}
            </span>
          </div>

          <textarea
            value={about}
            onChange={(e) => {
              if (e.target.value.length <= MAX_ABOUT) {
                onChange({
                  ...data,
                  about: e.target.value,
                });
              }
            }}
            placeholder="Write a few lines about yourself"
            className="w-full min-h-[120px] bg-[#141414] rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </section>

        {/* INTERESTS */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Interests</h2>

          <div className="flex flex-wrap gap-2">
            {ALL_INTERESTS.map((item) => {
              const selected = interests.includes(item);

              return (
                <button
                  key={item}
                  onClick={() =>
                    onChange({
                      ...data,
                      interests: selected
                        ? interests.filter((i) => i !== item)
                        : [...interests, item],
                    })
                  }
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    selected
                      ? "bg-pink-500 text-black border-pink-500"
                      : "bg-[#141414] text-gray-300 border-gray-700"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Pick a few to help with better matches
          </p>
        </section>

        {/* BASICS */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Basics</h2>

          {[
            "Height",
            "Relationship type",
            "Languages I know",
            "Zodiac",
            "Education",
            "Family plans",
            "Communication style",
            "Love style",
          ].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center py-3 border-b border-gray-800 text-sm"
            >
              <span>{item}</span>
              <span className="text-gray-500">Add</span>
            </div>
          ))}
        </section>

        {/* LIFESTYLE */}
        <section>
          <h2 className="text-sm font-semibold mb-3">
            Lifestyle <span className="text-pink-500 text-xs ml-1">+5%</span>
          </h2>

          {["Pets", "Drinking", "Smoking", "Workout"].map((item) => (
            <div
              key={item}
              className="flex justify-between items-center py-3 border-b border-gray-800 text-sm"
            >
              <span>{item}</span>
              <span className="text-gray-500">Empty</span>
            </div>
          ))}
        </section>

        {/* WORK */}
        <section>
          <h2 className="text-sm font-semibold mb-2">
            Job title{" "}
            <span className="text-pink-500 text-xs ml-1">IMPORTANT</span>
          </h2>
          <div className="bg-[#141414] rounded-xl p-3 text-sm text-gray-400">
            Add job title
          </div>
        </section>

        {/* CONTROL */}
        <section>
          <h2 className="text-sm font-semibold mb-2">Control your profile</h2>

          <div className="flex justify-between items-center py-3 border-b border-gray-800 text-sm">
            <span>Don’t show my age</span>
            <span className="text-gray-500">OFF</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-800 text-sm">
            <span>Don’t show my distance</span>
            <span className="text-gray-500">OFF</span>
          </div>
        </section>
      </div>
    </div>
  );
}
