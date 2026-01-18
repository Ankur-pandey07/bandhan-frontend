"use client";

export default function SystemMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-center my-3">
      <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
        {text}
      </span>
    </div>
  );
}

