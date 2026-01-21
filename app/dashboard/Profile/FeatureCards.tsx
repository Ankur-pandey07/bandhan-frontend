export default function FeatureCards() {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      <Card icon="🚀" title="Boosts" subtitle="Get noticed" />
      <Card icon="⭐" title="Priority" subtitle="Top matches" />
      <Card icon="👁️" title="Visibility" subtitle="More reach" />
    </div>
  );
}

function Card({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 text-center">
      <div className="text-xl mb-2">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}
