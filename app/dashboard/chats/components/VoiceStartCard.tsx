"use client";

type VoiceStartCardProps = {
  onStart: () => void;
};

export default function VoiceStartCard({ onStart }: VoiceStartCardProps) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 space-y-3">
      
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-300">
        <span className="text-xl">🎧</span>
        <span className="font-medium">Voice session start karein?</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed">
        Agar aap chahein, aap listener se voice me baat kar sakte hain.
        <br />
        <span className="text-gray-300 font-medium">
          Pehle 25 minutes bilkul free hain.
        </span>
      </p>

      {/* Action */}
      <button
        onClick={onStart}
        className="w-full mt-2 py-3 rounded-xl bg-[#B11226] text-white font-semibold hover:bg-[#9e0f21] transition"
      >
        Start Voice Session
      </button>
    </div>
  );
}
