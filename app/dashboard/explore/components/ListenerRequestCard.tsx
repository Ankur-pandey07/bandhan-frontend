"use client";

interface Props {
  mood: string;
  note?: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function ListenerRequestCard({
  mood,
  note,
  onAccept,
  onDecline,
}: Props) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-4 space-y-3">
      <div className="text-sm text-gray-400">
        User is feeling <span className="text-white font-medium">{mood}</span>
      </div>

      {note && (
        <p className="text-gray-300 text-sm italic">“{note}”</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          onClick={onDecline}
          className="flex-1 rounded-xl border border-gray-700 text-gray-400 py-2 hover:bg-gray-800 transition"
        >
          Decline
        </button>

        <button
          onClick={onAccept}
          className="flex-1 rounded-xl bg-green-500 text-black font-semibold py-2 hover:bg-green-400 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
