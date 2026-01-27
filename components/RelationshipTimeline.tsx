type Props = {
  themes: string[];
};

const themeLabel: Record<string, string> = {
  communication: "🗣️ Communication",
  trust: "🤝 Trust",
  distance: "📍 Distance",
  conflict: "⚡ Conflict",
  emotion: "❤️ Emotions",
};

export default function RelationshipTimeline({ themes }: Props) {
  if (!themes.length) return null;

  return (
    <div className="bg-white rounded-2xl p-4 shadow text-sm">
      <h4 className="font-medium mb-3">Relationship timeline</h4>

      <ul className="space-y-2">
        {themes.map((t, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span>{themeLabel[t] || t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
