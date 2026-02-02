"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReplyBox from "./ReplyBox";

export default function AdminChat({
  params,
}: {
  params: { chatId: string };
}) {
  const router = useRouter();
  const [chat, setChat] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1) Add interval polling
useEffect(() => {
  const interval = setInterval(() => {
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
        if (!data?.chats) return;

        const found = data.chats.find(
          (c: any) => c._id === params.chatId
        );
        if (found) setChat(found);
      })
      .catch(() => {});
  }, 5000);

  return () => clearInterval(interval);
}, [params.chatId]);

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
        if (!data || !data.chats) return;

        const found = data.chats.find(
          (c: any) => c._id === params.chatId
        );

        if (!found) {
          router.push("/admin/dashboard");
          return;
        }

        setChat(found);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [params.chatId]);

  if (loading) return <p style={{ padding: 24 }}>Loading chat…</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2 className="text-xl font-semibold mb-4">
        Admin Chat View
      </h2>

      <div className="mb-6 space-y-2">
        {chat.messages.map((m: any, i: number) => (
          <p key={i}>
            <strong>
              {m.role === "system" ? "Guide" : m.role}:
            </strong>{" "}
            {m.text}
          </p>
        ))}
      </div>

      <ReplyBox chatId={params.chatId} />
    </div>
  );
}
