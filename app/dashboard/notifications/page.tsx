"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const router = useRouter();

  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const r = localStorage.getItem("userRole");

    // ❌ not logged in
    if (r !== "admin" && r !== "user") {
      router.replace("/login");
      return;
    }

    console.log("🔥 NOTIFICATIONS PAGE LOADED");
    setRole(r as "admin" | "user");

    const url =
      r === "admin"
        ? "http://localhost:5000/api/admin/notifications"
        : "http://localhost:5000/api/notifications";

    fetch(url, { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Request failed");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data.notifications || []);
      })
      .catch((err) => {
        console.error("Notification fetch error:", err);
        setError("Failed to load notifications");
        setItems([]); // ✅ NO redirect
      })
      .finally(() => setLoading(false));
  }, [router]);

  const acceptChat = async (id: string) => {
    if (role !== "admin") return;

    await fetch("http://localhost:5000/api/admin/accept-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {role === "admin" ? "Admin Notifications" : "Your Notifications"}
      </h1>

      {error && <p className="text-red-400">{error}</p>}

      {items.length === 0 && <p>No notifications</p>}

      {items.map((n) => (
        <div key={n.id} className="border p-3 mb-2 rounded">
          {role === "admin" ? (
            <>
              <p>
                New chat from <b>{n.section}</b>
              </p>
              <button
                onClick={() => acceptChat(n.id)}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
              >
                Accept
              </button>
            </>
          ) : (
            <>
              <p>{n.text}</p>
              <p className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
