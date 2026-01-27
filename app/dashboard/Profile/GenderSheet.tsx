"use client";

export default function GenderSheet({
  value,
  onSelect,
  onClose,
}: {
  value: string;
  onSelect: (val: string) => void;
  onClose: () => void;
}) {
  const OPTIONS = ["Man", "Woman", "Non-binary", "Prefer not to say"];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="w-full bg-[#0e0e0e] rounded-t-3xl p-5">
        {/* drag bar */}
        <div className="w-10 h-1 bg-gray-600 rounded mx-auto mb-4" />

        <h2 className="text-lg font-semibold mb-4">Gender</h2>

        <div className="space-y-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                value === opt
                  ? "bg-white text-black border-white"
                  : "border-gray-700 text-white hover:bg-[#1a1a1a]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-[#1a1a1a] text-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
