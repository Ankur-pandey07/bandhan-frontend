"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/notifications", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        setNotifications(data?.notifications || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const acceptChat = async (id: string) => {
    await fetch("http://localhost:5000/api/admin/accept-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  if (loading) return <p className="p-6">Loading notifications…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-gray-500">No new notifications</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className="border rounded-lg p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">New Chat Request</p>
            <p className="text-sm text-gray-500">
              From: {n.section}
            </p>
          </div>

          <button
            onClick={() => acceptChat(n.id)}
            className="px-4 py-1 rounded bg-pink-500 text-black"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
