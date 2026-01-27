import type { Memory } from "@/lib/relationshipAI";

export default function PatternsCard({ memory }: { memory: Memory }) {
  if (memory.longTermNotes.length === 0) return null;

  return (
    <div className="bg-neutral-100 rounded-2xl p-4 text-sm">
      <h4 className="font-medium mb-2">Patterns I notice</h4>

      <p className="text-gray-700">
        It seems that topics like{" "}
        <strong>
          {memory.longTermNotes.join(", ")}
        </strong>{" "}
        have come up more than once.
      </p>

      {memory.repeatedThemeCount >= 2 && (
        <p className="mt-2 text-gray-600">
          This often happens when a need isn’t being fully met yet.
        </p>
      )}
    </div>
  );
}
