type ProfileData = {
  photos: string[];
  about: string;
  interests: string[];

  gender?: string;
  relationship?: string;
  height?: string;
  lookingFor?: string;

  drinking?: string;
  smoking?: string;
  workout?: string;
  pets?: string;

  education?: string;
  languages?: string[];

  hideAge: boolean;
  hideDistance: boolean;
};

/* ================= PROFILE COMPLETION ================= */
/* ✅ SAFE VERSION — RETURNS ONLY NUMBER */

export function calculateProfileCompletion(data: ProfileData): number {
  let score = 0;

  /* ---------- PHOTOS (30%) ---------- */
  if (data.photos.length === 1) score += 15;
  if (data.photos.length >= 2) score += 30;

  /* ---------- ABOUT (15%) ---------- */
  if (data.about && data.about.trim().length > 0) {
    score += 15;
  }

  /* ---------- INTERESTS (15%) ---------- */
  if (data.interests.length >= 3) {
    score += 15;
  } else if (data.interests.length > 0) {
    score += 8;
  }

  /* ---------- BASIC INFO (20%) ---------- */
  const basicFields = [
    data.gender,
    data.relationship,
    data.lookingFor,
    data.height,
  ];
  score += basicFields.filter(Boolean).length * 5;

  /* ---------- LIFESTYLE (10%) ---------- */
  const lifestyleFields = [
    data.drinking,
    data.smoking,
    data.workout,
    data.pets,
  ];
  if (lifestyleFields.filter(Boolean).length >= 2) {
    score += 10;
  } else if (lifestyleFields.filter(Boolean).length > 0) {
    score += 5;
  }

  /* ---------- EDUCATION & LANGUAGES (10%) ---------- */
  if (data.education) score += 5;
  if (data.languages && data.languages.length > 0) score += 5;

  /* ---------- CAP SCORE ---------- */
  score = Math.min(score, 100);

  return score;
}
