"use client";

export default function ProfileCompletionRing({
  percent = 85,
  size = 42,
}: {
  percent?: number;
  size?: number;
}) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size}>
        {/* background circle */}
        <circle
          stroke="#2a2a2a"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* progress circle */}
        <circle
          stroke="url(#grad)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-out"
        />

        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
      </svg>

      {/* center text */}
      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-pink-400 font-semibold">
        {percent}%
      </span>
    </div>
  );
}
