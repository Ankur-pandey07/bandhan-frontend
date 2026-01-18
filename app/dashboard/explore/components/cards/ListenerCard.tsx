type ListenerCardProps = {
   id: string;
  name: string;
  badge: string;
  avatar: string;
  onSelect: () => void;
  selected?: boolean;
};
export default function ListenerCard({
  id,
  name,
  badge,
  avatar,
  selected,
  onSelect,
}: any) {
  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer
        rounded-2xl
        border border-white/30
        p-4
        transition-all duration-300
        ${
          selected
            ? "scale-95 opacity-0"
            : "hover:scale-[1.03]"
        }
      `}
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
