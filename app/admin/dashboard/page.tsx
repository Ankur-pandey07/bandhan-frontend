"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch("http://localhost:5000/api/admin/active-chats", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.chats) setChats(data.chats);
      setLoading(false);
    });
}, []);


  useEffect(() => {
    fetch("http://localhost:5000/api/admin/chats", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.chats) setChats(data.chats);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading chats…</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard — User Chats
      </h1>

      {chats.length === 0 && (
        <p className="text-gray-500">No chats found</p>
      )}

      <ul className="space-y-3">
        {chats.map((chat) => {
          const recentlyActive =
            Date.now() -
              new Date(chat.lastActiveAt).getTime() <
            5 * 60 * 1000;

          return (
            <li
              key={chat._id}
              className="border rounded-lg p-3 hover:bg-gray-50"
            >
              <Link href={`/admin/chat/${chat._id}`}>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    User: {chat.userId}
                  </span>

                  {recentlyActive && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  Last active:{" "}
                  {new Date(chat.lastActiveAt).toLocaleString()}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
