"use client";

export default function ChatHeader({
  name,
  onBack,
}: {
  name: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4 border-b bg-white sticky top-0 z-10">
      <button
        onClick={onBack}
        className="text-lg text-gray-600"
      >
        ←
      </button>

      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-red-500 text-white flex items-center justify-center font-semibold">
        {name[0]}
      </div>

      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-green-500">
          Online
        </p>
      </div>

      {/* 3-dot menu placeholder */}
      <button className="text-xl text-gray-500">
        ⋮
      </button>
    </div>
  );
}

