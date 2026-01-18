type ListenerCardProps = {
  name: string;
  badge: string;
  avatar: string;
  onSelect: () => void;
};

export default function ListenerCard({
  name,
  badge,
  avatar,
  onSelect,
}: ListenerCardProps) {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border border-white/30
        bg-white/10
        p-4

        flex flex-col
        gap-3

        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shrink-0">
          {avatar}
        </div>

        <div>
          <p className="text-white font-semibold leading-tight">
            {name}
          </p>
          <p className="text-sm text-white/80">
            {badge}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={onSelect}
        className="
          w-full
          md:w-auto

          mt-2 md:mt-0
          px-4 py-2
          rounded-xl

          bg-white/20
          text-white text-sm font-medium
          hover:bg-white/30
          transition
        "
      >
        Select
      </button>
    </div>
  );
}
