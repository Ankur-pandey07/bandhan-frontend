"use client";

export default function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1">
      <span className="text-xs text-gray-500">
        {name} is typing
      </span>
      <span className="flex gap-1">
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
      </span>
    </div>
  );
}
