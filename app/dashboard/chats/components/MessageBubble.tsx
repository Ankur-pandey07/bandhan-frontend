"use client";

import clsx from "clsx";

type MessageBubbleProps = {
  text: string;
  from: "user" | "listener";
  time?: string;
};

export default function MessageBubble({
  text,
  from,
  time,
}: MessageBubbleProps) {
  const isUser = from === "user";

  return (
    <div
      className={clsx(
        "flex w-full mb-2 animate-message",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow",
          isUser
            ? "bg-[#dcf8c6] text-black rounded-br-sm"
            : "bg-white text-black rounded-bl-sm border"
        )}
      >
        <p>{text}</p>

        {time && (
          <div className="text-[10px] text-gray-500 mt-1 text-right">
            {time}
          </div>
        )}
      </div>
    </div>
  );
}
