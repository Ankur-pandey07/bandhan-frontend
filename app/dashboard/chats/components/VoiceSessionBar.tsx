"use client";

type VoiceSessionBarProps = {
  remaining: string; // e.g. "25:00"
  onEnd: () => void;
};

export default function VoiceSessionBar({
  remaining,
  onEnd,
}: VoiceSessionBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-[#0f0f0f] border border-gray-800 rounded-xl p-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-200">
        <span className="text-lg">🎧</span>
        <span className="text-sm font-medium">Voice session active</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">
          ⏱ {remaining} remaining
        </span>

        {/* TEMP END (for UX testing only) */}
        <button
          onClick={onEnd}
          className="text-xs px-3 py-1 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
        >
          End
        </button>
      </div>
    </div>
  );
}
