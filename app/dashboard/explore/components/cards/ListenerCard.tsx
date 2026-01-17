"use client";

type ListenerCardProps = {
  name: string;
  badge: string;
  avatar: string;
  onSelect: () => void;
};

export default function ListenerCard({
  name,
  badge,
  avatar,
  onSelect,
}: ListenerCardProps) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-4 p-4 rounded-2xl border hover:bg-gray-50 transition"
    >
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
        {avatar}
      </div>

      <div className="flex-1 text-left">
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{badge}</p>
      </div>

      <span className="text-sm text-[#B11226] font-medium">
        Select
      </span>
    </button>
  );
}
