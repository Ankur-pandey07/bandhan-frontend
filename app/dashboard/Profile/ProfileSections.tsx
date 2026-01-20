"use client";

import { UserProfile } from "./profile.types";

export default function ProfileSections({
  profile,
  onEdit,
}: {
  profile: UserProfile;
  onEdit: (section: string) => void;
}) {
  return (
    <div className="px-4 space-y-6 mt-6">

      {/* ABOUT */}
      <section
        onClick={() => onEdit("bio")}
        className="cursor-pointer"
      >
        <h3 className="font-medium mb-1">About me</h3>
        <p className="text-sm text-gray-600">
          {profile.bio
            ? profile.bio
            : "A few honest lines help people understand you better"}
        </p>
      </section>

      {/* INTERESTS */}
      <section
        onClick={() => onEdit("interests")}
        className="cursor-pointer"
      >
        <h3 className="font-medium mb-2">Interests</h3>

        {profile.interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-gray-100 rounded-full"
              >
                {i}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Add interests to help with better matches
          </p>
        )}
      </section>

      {/* PERSONALITY */}
      <section
        onClick={() => onEdit("personality")}
        className="cursor-pointer"
      >
        <h3 className="font-medium mb-1">Personality</h3>
        <p className="text-sm text-gray-600">
          {profile.personality || "Tell people how you connect"}
        </p>
      </section>
    </div>
  );
}
