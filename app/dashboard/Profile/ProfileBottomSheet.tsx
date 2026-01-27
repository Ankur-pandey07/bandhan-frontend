"use client";

type Props = {
  title: string;
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
};

export default function ProfileBottomSheet({
  title,
  options,
  selected,
  onSelect,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="w-full bg-[#0e0e0e] rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto">

        {/* drag handle */}
        <div className="w-10 h-1 bg-gray-600 rounded mx-auto mb-4" />

        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>

        {/* options */}
        <div className="space-y-2">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border
                ${
                  selected === item
                    ? "bg-pink-500 text-black border-pink-500"
                    : "bg-[#141414] text-white border-gray-700"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
