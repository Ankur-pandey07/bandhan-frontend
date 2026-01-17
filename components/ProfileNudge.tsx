"use client";

import { useState } from "react";

export default function ProfileNudge({
  onClick,
}: {
  onClick: () => void;
}) {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-24 right-4 z-40 bg-[#B11226] text-white w-10 h-10 rounded-full shadow-lg"
        title="Complete profile"
      >
        ✎
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-white border shadow-md rounded-full px-4 py-2 flex items-center gap-3">
        <p className="text-sm text-gray-700">
          Add one more detail to your profile
        </p>

        <button
          onClick={onClick}
          className="text-sm text-[#B11226] font-medium"
        >
          Add
        </button>

        <button
          onClick={() => setMinimized(true)}
          className="text-gray-400 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
