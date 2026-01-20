export function calculateProfileCompletion({
  photos,
  about,
  interests,
}: {
  photos: string[];
  about: string;
  interests: string[];
}) {
  let percent = 0;

  // Photos = 30%
  if (photos.length > 0) percent += 30;

  // About = 25%
  if (about.trim().length >= 50) percent += 25;

  // Interests = 20%
  if (interests.length >= 3) percent += 20;

  return percent;
}
