"use client";

import { useState } from "react";
import PhotoGrid from "./PhotoGrid";
import GenderSheet from "./GenderSheet";
import RelationshipSheet from "./RelationshipSheet";
import HeightSheet from "./HeightSheet";
import LookingForSheet from "./LookingForSheet";
import PronounsSheet from "./PronounsSheet";
import DrinkingSheet from "./DrinkingSheet";
import SmokingSheet from "./SmokingSheet";
import WorkoutSheet from "./WorkoutSheet";
import PetsSheet from "./PetsSheet";
import EducationSheet from "./EducationSheet";
import LanguagesSheet from "./LanguagesSheet";
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

/* ---------- PROFILE TYPE ---------- */
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
useEffect(() => {
  localStorage.setItem("profileData", JSON.stringify(profileData));
}, [profileData]);

export default function EditProfileScreen({
  data,
  onChange,
  onBack,
}: {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onBack: () => void;
}) {
  /* ---------- LOCAL UI STATE ---------- */
  const [showGender, setShowGender] = useState(false);
  const [showRelationship, setShowRelationship] = useState(false);
  const [showHeight, setShowHeight] = useState(false);
  const [showLookingFor, setShowLookingFor] = useState(false);
  const [showPronouns, setShowPronouns] = useState(false);
  const [showDrinking, setShowDrinking] = useState(false);
  const [showSmoking, setShowSmoking] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showPets, setShowPets] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const {
    photos,
    about,
    interests,
    gender,
    relationship,
    height,
    lookingFor,
    pronouns,
    drinking,
    smoking,
    workout,
    pets,
    education,
    languages,
    hideAge = false,
    hideDistance = false,
  } = data;

  const MAX_ABOUT = 500;

  /* ✅ SAFE: full data passed */
  const completion = calculateProfileCompletion(data);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-black border-b border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="text-xl">←</button>
        <div>
          <h1 className="text-lg font-semibold">Edit profile</h1>
          <p className="text-xs text-gray-400">
            Profile {completion}% complete
          </p>
        </div>
      </div>

      {/* ===== BOTTOM SHEETS ===== */}
      {showGender && <GenderSheet value={gender} onSelect={(v) => onChange({ ...data, gender: v })} onClose={() => setShowGender(false)} />}
      {showRelationship && <RelationshipSheet value={relationship} onSelect={(v) => onChange({ ...data, relationship: v })} onClose={() => setShowRelationship(false)} />}
      {showHeight && <HeightSheet value={height} onSelect={(v) => onChange({ ...data, height: v })} onClose={() => setShowHeight(false)} />}
      {showLookingFor && <LookingForSheet value={lookingFor} onSelect={(v) => onChange({ ...data, lookingFor: v })} onClose={() => setShowLookingFor(false)} />}
      {showPronouns && <PronounsSheet value={pronouns} onSelect={(v) => onChange({ ...data, pronouns: v })} onClose={() => setShowPronouns(false)} />}
      {showDrinking && <DrinkingSheet value={drinking} onSelect={(v) => onChange({ ...data, drinking: v })} onClose={() => setShowDrinking(false)} />}
      {showSmoking && <SmokingSheet value={smoking} onSelect={(v) => onChange({ ...data, smoking: v })} onClose={() => setShowSmoking(false)} />}
      {showWorkout && <WorkoutSheet value={workout} onSelect={(v) => onChange({ ...data, workout: v })} onClose={() => setShowWorkout(false)} />}
      {showPets && <PetsSheet value={pets} onSelect={(v) => onChange({ ...data, pets: v })} onClose={() => setShowPets(false)} />}
      {showEducation && <EducationSheet value={education} onSelect={(v) => onChange({ ...data, education: v })} onClose={() => setShowEducation(false)} />}
      {showLanguages && <LanguagesSheet value={languages || []} onSelect={(v) => onChange({ ...data, languages: v })} onClose={() => setShowLanguages(false)} />}

      {/* CONTENT */}
      <div className="px-4 pb-24 space-y-8">

        {/* MEDIA */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Media</h2>
          <PhotoGrid
            photos={photos}
            onAdd={(file) =>
              onChange({
                ...data,
                photos: [...photos, URL.createObjectURL(file)].slice(0, 6),
              })
            }
            onReorder={(f, t) => {
              const u = [...photos];
              const m = u.splice(f, 1)[0];
              u.splice(t, 0, m);
              onChange({ ...data, photos: u });
            }}
            onRemove={(i) =>
              onChange({
                ...data,
                photos: photos.filter((_, x) => x !== i),
              })
            }
          />
        </section>

        {/* ABOUT */}
        <section>
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-semibold">About me</h2>
            <span className="text-xs text-pink-500">
              {about.length}/{MAX_ABOUT}
            </span>
          </div>
          <textarea
            value={about}
            onChange={(e) =>
              e.target.value.length <= MAX_ABOUT &&
              onChange({ ...data, about: e.target.value })
            }
            className="w-full bg-[#141414] rounded-xl p-3 text-sm"
          />
        </section>

        {/* INTERESTS */}
        <section>
          <h2 className="text-sm font-semibold mb-2">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {ALL_INTERESTS.map((i) => (
              <button
                key={i}
                onClick={() =>
                  onChange({
                    ...data,
                    interests: interests.includes(i)
                      ? interests.filter((x) => x !== i)
                      : [...interests, i],
                  })
                }
                className={`px-3 py-1.5 text-xs rounded-full border ${
                  interests.includes(i)
                    ? "bg-pink-500 text-black border-pink-500"
                    : "border-gray-700 text-gray-300"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </section>

        {/* BASICS */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Basics</h2>
          <Row label="Gender" value={gender} onClick={() => setShowGender(true)} />
          <Row label="Relationship goals" value={relationship} onClick={() => setShowRelationship(true)} />
          <Row label="Height" value={height ? `${height} cm` : undefined} onClick={() => setShowHeight(true)} />
          <Row label="Looking for" value={lookingFor} onClick={() => setShowLookingFor(true)} />
          <Row label="Pronouns" value={pronouns} onClick={() => setShowPronouns(true)} />
          <Row label="Education" value={education} onClick={() => setShowEducation(true)} />
          <Row label="Languages I know" value={languages?.join(", ")} onClick={() => setShowLanguages(true)} />
        </section>

        {/* LIFESTYLE */}
        <section>
          <h2 className="text-sm font-semibold mb-3">Lifestyle</h2>
          <Row label="Drinking" value={drinking} onClick={() => setShowDrinking(true)} />
          <Row label="Smoking" value={smoking} onClick={() => setShowSmoking(true)} />
          <Row label="Workout" value={workout} onClick={() => setShowWorkout(true)} />
          <Row label="Pets" value={pets} onClick={() => setShowPets(true)} />
        </section>

        {/* CONTROL */}
        <section>
          <h2 className="text-sm font-semibold mb-2">Control your profile</h2>
          <Row
            label="Don’t show my age"
            value={hideAge ? "ON" : "OFF"}
            onClick={() => onChange({ ...data, hideAge: !hideAge })}
          />
          <Row
            label="Don’t show my distance"
            value={hideDistance ? "ON" : "OFF"}
            onClick={() => onChange({ ...data, hideDistance: !hideDistance })}
          />
        </section>
      </div>
    </div>
  );
}

/* ---------- REUSABLE ROW ---------- */
function Row({
  label,
  value,
  onClick,
}: {
  label: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center py-3 border-b border-gray-800 text-sm cursor-pointer"
    >
      <span>{label}</span>
      <span className="text-gray-400">{value || "Add"}</span>
    </div>
  );
}
