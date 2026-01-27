import type { EmotionalIntensity } from "@/lib/relationshipAI";

export default function EmotionalMeter({
  level,
}: {
  level: EmotionalIntensity;
}) {
  const map = {
    low: { label: "Calm", width: "30%" },
    medium: { label: "Heavy", width: "60%" },
    high: { label: "Very intense", width: "90%" },
  };

  const current = map[level];

  return (
    <div className="bg-white rounded-2xl p-4 shadow text-sm">
      <p className="mb-2">Emotional intensity</p>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black transition-all"
          style={{ width: current.width }}
        />
      </div>

      <p className="mt-2 text-gray-600">{current.label}</p>
    </div>
  );
}
