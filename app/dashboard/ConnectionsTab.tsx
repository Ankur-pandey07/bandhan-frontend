"use client";

import { useState } from "react";
import { ChatItem } from "./types";

export default function ConnectionsTab({
  onAccept,
}: {
  onAccept: (user: ChatItem) => void;
}) {
  const [items, setItems] = useState<ChatItem[]>([
    {
      id: 1,
      name: "Ananya",
      photo: "/default-user.png",
      gender: "female",
      status: "pending",
    },
    {
      id: 2,
      name: "Rohit",
      photo: "/default-user.png",
      gender: "male",
      status: "pending",
    },
  ]);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {items.map((c) => (
        <div
          key={c.id}
          className="bg-white rounded-2xl border p-4 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-gray-500">Connection pending</p>
          </div>

          <button
            onClick={() => {
              onAccept({
                ...c,
                status: "accepted",
                lastMessage: "",
                lastTime: "",
                unreadCount: 0,
                isOnline: true,
                isTyping: false,
              });

              setItems((prev) => prev.filter((x) => x.id !== c.id));
            }}
            className="bg-[#B11226] text-white px-4 py-2 rounded-full text-sm"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
