type MoodCardProps = {
  label: string;
  emoji: string;
  bg: string;
  isActive?: boolean;
  onClick: () => void;
};

export default function MoodCard({
  label,
  emoji,
  bg,
  isActive,
  onClick,
}: MoodCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        h-32
        rounded-2xl
        ${bg}
        text-white
        flex
        flex-col
        items-center
        justify-center
        gap-2
        shadow-lg
        transition-all duration-300
        ${
          isActive
            ? "ring-2 ring-white shadow-xl scale-[1.03]"
            : "hover:scale-[1.02] hover:shadow-lg"
        }
        hover:scale-[1.03]
        active:scale-95
      `}
    >
      <span className="text-3xl mb-2">{emoji}</span>
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
