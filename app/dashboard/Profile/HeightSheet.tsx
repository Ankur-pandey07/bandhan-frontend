"use client";

const HEIGHTS = Array.from({ length: 61 }, (_, i) => 140 + i); // 140cm → 200cm

export default function HeightSheet({
  value,
  onSelect,
  onClose,
}: {
  value?: number;
  onSelect: (val: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
      <div className="w-full bg-[#141414] rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

        <h2 className="text-lg font-semibold mb-4">
          Height
        </h2>

        <div className="space-y-2">
          {HEIGHTS.map((cm) => (
            <button
              key={cm}
              onClick={() => {
                onSelect(cm);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border ${
                value === cm
                  ? "bg-pink-500 text-black border-pink-500"
                  : "border-gray-700 text-white"
              }`}
            >
              {cm} cm
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
