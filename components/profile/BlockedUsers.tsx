"use client";

import { useEffect, useState } from "react";

export default function BlockedUsers() {
  const [blocked, setBlocked] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("bandhan_blocked_users") || "[]"
    );
    setBlocked(data);
  }, []);

  const unblock = (id: string) => {
    const updated = blocked.filter((u) => u.id !== id);
    localStorage.setItem(
      "bandhan_blocked_users",
      JSON.stringify(updated)
    );
    setBlocked(updated);
  };

  if (blocked.length === 0) {
    return <p className="text-gray-400">No blocked users</p>;
  }

  return (
    <div className="space-y-3">
      {blocked.map((u) => (
        <div
          key={u.id}
          className="flex justify-between items-center bg-white p-4 rounded-xl"
        >
          <span>{u.name}</span>
          <button
            onClick={() => unblock(u.id)}
            className="text-red-500 text-sm"
          >
            Unblock
          </button>
        </div>
      ))}
    </div>
  );
}
