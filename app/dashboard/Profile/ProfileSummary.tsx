export default function ProfileSummary({
  onEdit,
}: {
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      {/* PROFILE IMAGE + COMPLETION */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-pink-500 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-sm">
            Avatar
          </div>
        </div>

        <span className="absolute -bottom-1 -right-1 bg-black text-xs px-2 py-[2px] rounded-full border border-gray-700">
          55%
        </span>
      </div>

      {/* NAME + CTA */}
      <div>
        <h1 className="text-xl font-semibold">Arya, 24</h1>

        <button
          onClick={onEdit}
          className="mt-2 text-sm bg-white text-black px-4 py-1.5 rounded-full"
        >
          Edit profile
        </button>
      </div>
    </div>
  );
}
