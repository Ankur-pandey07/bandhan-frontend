type MoodCardProps = {
  label: string;
  emoji: string;
  bg: string;
  onClick: () => void;
};

export default function MoodCard({
  label,
  emoji,
  bg,
  onClick,
}: MoodCardProps) {
  return (
    <button
      onClick={onClick}
      className={`h-32 rounded-2xl ${bg} text-white flex flex-col items-center justify-center gap-2 active:scale-95 transition`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
