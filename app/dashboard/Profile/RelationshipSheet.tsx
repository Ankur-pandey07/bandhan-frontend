"use client";

const OPTIONS = [
  "Long-term relationship",
  "Short-term",
  "Marriage",
  "Serious dating",
  "Not sure yet",
];

export default function RelationshipSheet({
  value,
  onSelect,
  onClose,
}: {
  value?: string;
  onSelect: (val: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
      <div className="w-full bg-[#141414] rounded-t-3xl p-6">
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

        <h2 className="text-lg font-semibold mb-4">
          Relationship goals
        </h2>

        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border ${
                value === opt
                  ? "bg-pink-500 text-black border-pink-500"
                  : "border-gray-700 text-white"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-black border border-gray-700 text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
