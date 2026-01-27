"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateProfileCompletion } from "./profile.utils";

type ProfileData = {
  photos: string[];
  interests?: string[];
  about?: string;

  gender?: string;
  height?: string;
  lookingFor?: string;
  relationship?: string;

  drinking?: string;
  smoking?: string;
  workout?: string;
  pets?: string;

  education?: string;
  languages?: string[];

  hideAge?: boolean;
  hideDistance?: boolean;
};

export default function ProfileSummary({
  data,
}: {
  data: ProfileData & {
    name?: string;
    age?: number;
  };
}) {
  const photos = data.photos || [];
  const interests = data.interests || [];
  const languages = data.languages || [];

  const [[activeIndex, direction], setActiveIndex] = useState<[number, number]>([
    0,
    0,
  ]);

  const totalPhotos = photos.length;

  const paginate = (dir: number) => {
    setActiveIndex(([prev]) => {
      const next = prev + dir;
      if (next < 0 || next >= totalPhotos) return [prev, 0];
      return [next, dir];
    });
  };

  const completion = calculateProfileCompletion(data);

  if (!totalPhotos) return null;

  return (
    <div className="w-full bg-black text-white">

      {/* ================= PHOTO PREVIEW ================= */}
      <div className="relative h-[90vh] overflow-hidden">

        {/* Story bars */}
        <div className="absolute top-2 left-2 right-2 z-30 flex gap-1">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full ${
                i <= activeIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Animated photo */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={activeIndex}
            src={photos[activeIndex]}
            alt="Profile"
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Tap zones */}
        <div className="absolute inset-0 z-20 flex">
          <div className="w-1/2 h-full" onClick={() => paginate(-1)} />
          <div className="w-1/2 h-full" onClick={() => paginate(1)} />
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent">

          {/* Interests */}
          {interests.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {interests.slice(0, 8).map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* Name + Age */}
          <div className="text-2xl font-semibold tracking-tight">
            {data.name || "User"}
            {!data.hideAge && data.age && (
              <span className="ml-1 font-normal text-white/90">
                {data.age}
              </span>
            )}
          </div>

          {/* Education */}
          {data.education && (
            <div className="mt-1 text-sm text-white/80 flex items-center gap-1">
              <span>🎓</span>
              <span>{data.education}</span>
            </div>
          )}

          {/* Privacy note (age) */}
          {data.hideAge && (
            <div className="mt-1 text-xs text-white/50">
              Age hidden
            </div>
          )}
        </div>
      </div>

      {/* ================= COMPLETION ================= */}
      <div className="px-4 pt-6">
        <div className="rounded-2xl p-4 bg-white/5 ring-1 ring-white/10">

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">
              Profile completion
            </span>
            <span className="text-sm font-semibold">
              {completion.percentage}%
            </span>
          </div>

          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              style={{ width: `${completion.percentage}%` }}
            />
          </div>

          {completion.missing?.length > 0 && (
            <div className="mt-2 text-xs text-white/60">
              Add {completion.missing[0]} to improve matches
            </div>
          )}
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="px-4 py-8 space-y-8">

        {/* About */}
        {data.about && (
          <section>
            <h3 className="text-xs uppercase tracking-wider text-white/50 mb-2">
              About
            </h3>
            <p className="text-sm leading-relaxed text-white/90">
              {data.about}
            </p>
          </section>
        )}

        {/* Divider */}
        {(data.gender || data.height || data.lookingFor || data.relationship) && (
          <div className="h-px bg-white/10" />
        )}

        {/* Basic Info */}
        {(data.gender || data.height || data.lookingFor || data.relationship) && (
          <section>
            <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">
              Basic info
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {data.gender && <div>Gender</div>}
              {data.gender && <div className="text-white/90">{data.gender}</div>}

              {data.height && <div>Height</div>}
              {data.height && <div className="text-white/90">{data.height}</div>}

              {data.lookingFor && <div>Looking for</div>}
              {data.lookingFor && (
                <div className="text-white/90">{data.lookingFor}</div>
              )}

              {data.relationship && <div>Relationship</div>}
              {data.relationship && (
                <div className="text-white/90">{data.relationship}</div>
              )}
            </div>
          </section>
        )}

        {/* Divider */}
        {(data.drinking || data.smoking || data.workout || data.pets) && (
          <div className="h-px bg-white/10" />
        )}

        {/* Lifestyle */}
        {(data.drinking || data.smoking || data.workout || data.pets) && (
          <section>
            <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">
              Lifestyle
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              {data.drinking && <div>Drinking</div>}
              {data.drinking && (
                <div className="text-white/90">{data.drinking}</div>
              )}

              {data.smoking && <div>Smoking</div>}
              {data.smoking && (
                <div className="text-white/90">{data.smoking}</div>
              )}

              {data.workout && <div>Workout</div>}
              {data.workout && (
                <div className="text-white/90">{data.workout}</div>
              )}

              {data.pets && <div>Pets</div>}
              {data.pets && (
                <div className="text-white/90">{data.pets}</div>
              )}
            </div>
          </section>
        )}

        {/* Divider */}
        {languages.length > 0 && <div className="h-px bg-white/10" />}

        {/* Languages */}
        {languages.length > 0 && (
          <section>
            <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 text-xs rounded-full bg-white/10"
                >
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Privacy note (distance) */}
        {data.hideDistance && (
          <div className="text-xs text-white/50 pt-2">
            Distance hidden
          </div>
        )}
      </div>
    </div>
  );
}
