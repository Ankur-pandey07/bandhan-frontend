"use client";

const ALL_LANGUAGES = [
  "English",
  "Hindi",
  "Hinglish",
  "Punjabi",
  "Gujarati",
  "Marathi",
  "Tamil",
  "Telugu",
  "Bengali",
  "Urdu",
];

export default function LanguagesSheet({
  value = [],
  onSelect,
  onClose,
}: {
  value: string[];
  onSelect: (val: string[]) => void;
  onClose: () => void;
}) {
  const toggle = (lang: string) => {
    if (value.includes(lang)) {
      onSelect(value.filter((l) => l !== lang));
    } else {
      onSelect([...value, lang]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
      <div className="w-full bg-[#141414] rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

        <h2 className="text-lg font-semibold mb-4">Languages I know</h2>

        <div className="flex flex-wrap gap-2">
          {ALL_LANGUAGES.map((lang) => {
            const selected = value.includes(lang);

            return (
              <button
                key={lang}
                onClick={() => toggle(lang)}
                className={`px-3 py-1.5 rounded-full text-xs border ${
                  selected
                    ? "bg-pink-500 text-black border-pink-500"
                    : "border-gray-700 text-white"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-black border border-gray-700 text-gray-300"
        >
          Done
        </button>
      </div>
    </div>
  );
}
