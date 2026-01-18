"use client";

type Props = {
  onOpen: () => void;
};

export default function SoulVerseCard({ onOpen }: Props) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white shadow-lg hover:opacity-95 transition"
    >
      <h3 className="text-xl font-semibold">SoulVerse</h3>
      <p className="mt-2 text-sm text-white/80">
        Personal relationship guidance .
      </p>
      <p className="mt-4 text-xs text-white/60">
        Tap to talk • Chat & in-app voice
      </p>
    </div>
  );
}
