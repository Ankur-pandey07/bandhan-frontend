"use client";

export default function ProfilePreview({
  user,
  onClose,
  onOpenFull,
}: {
  user: any;
  onClose: () => void;
  onOpenFull: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl p-4 animate-slideUp">
        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold">{user.name}, {user.age}</p>
          <button onClick={onClose}>✕</button>
        </div>

        <img
          src={user.photo}
          className="w-full h-64 object-cover rounded-xl mb-3"
        />

        <p className="text-sm text-gray-600 line-clamp-2">
          {user.bio}
        </p>

        <button
          onClick={onOpenFull}
          className="mt-4 w-full bg-[#B11226] text-white py-2 rounded-full"
        >
          View full profile
        </button>
      </div>
    </div>
  );
}
