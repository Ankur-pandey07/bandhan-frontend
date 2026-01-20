"use client";

export default function ProfileEditSheet({
  section,
  onClose,
}: {
  section: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-end z-50">
      <div className="w-full bg-white rounded-t-3xl p-4 max-h-[80vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded mx-auto mb-4" />

        <h2 className="text-lg font-semibold capitalize mb-4">
          Edit {section}
        </h2>

        {/* PLACEHOLDER FOR SECTION UI */}
        <div className="text-sm text-gray-600">
          {section === "photos" && "Upload or change your profile photos"}
          {section === "bio" && "Write a few lines about yourself"}
          {section === "interests" && "Select what you’re interested in"}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-black text-white"
        >
          Done
        </button>
      </div>
    </div>
  );
}
