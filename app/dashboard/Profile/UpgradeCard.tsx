"use client";

type UpgradeCardProps = {
  title: string;
  subtitle: string;
  price?: string;
  features: string[];
  highlight?: string;
};

export default function UpgradeCard({
  title,
  subtitle,
  price,
  features,
  highlight,
}: UpgradeCardProps) {
  return (
    <div className="min-w-[85%] bg-gradient-to-br from-[#1c1c1c] to-[#111] rounded-3xl p-5 text-white relative">

      {/* Highlight badge */}
      {highlight && (
        <div className="absolute top-4 right-4 text-[11px] px-3 py-1 rounded-full bg-pink-600">
          {highlight}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-1">{title}</h3>

      {/* Subtitle */}
      <p className="text-sm text-white/70 mb-3">{subtitle}</p>

      {/* Price */}
      {price && (
        <div className="text-lg font-bold mb-4">
          {price}
        </div>
      )}

      {/* Features */}
      <ul className="space-y-2 mb-5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <span className="text-green-400">✔</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 font-semibold">
        UPGRADE
      </button>
    </div>
  );
}
