"use client";

import { UserProfile } from "./profile.types";

export default function ProfileHeader({
  profile,
  onEdit,
}: {
  profile: UserProfile;
  onEdit: () => void;
}) {
  const hasPhoto = profile.photos && profile.photos.length > 0;

  return (
    <div className="relative">
      {/* PHOTO / PLACEHOLDER ZONE */}
      <div className="h-72 rounded-b-3xl overflow-hidden bg-gradient-to-b from-gray-200 to-gray-100 flex items-center justify-center">
        {hasPhoto ? (
          <img
            src={profile.photos[0].url}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-center px-6">
            <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-2xl">
              🙂
            </div>
            <p className="text-sm text-gray-600">
              Add a photo so people can recognize you
            </p>
          </div>
        )}
      </div>

      {/* EDIT BUTTON */}
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-sm shadow"
      >
        Edit
      </button>

      {/* IDENTITY */}
      <div className="px-4 mt-4">
        <h1 className="text-2xl font-semibold">
          {profile.name}, {profile.age}
        </h1>
        <p className="text-gray-500">{profile.city}</p>

        {profile.headline && (
          <p className="mt-2 italic text-sm text-gray-700">
            {profile.headline}
          </p>
        )}
      </div>
    </div>
  );
}
