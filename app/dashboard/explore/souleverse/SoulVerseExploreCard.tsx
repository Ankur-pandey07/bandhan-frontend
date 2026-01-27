"use client";

type Props = {
  onOpen: () => void;
};

export default function SoulVerseExploreCard({ onOpen }: Props) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer rounded-2xl bg-neutral-900 p-6 text-white hover:bg-neutral-800 transition"
    >
      <h2 className="text-lg font-semibold">SoulVerse</h2>
      <p className="mt-2 text-sm text-white/70">
        A calm space to talk things through
      </p>
    </div>
  );
}
