"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReplyBox({ chatId }: { chatId: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReply = async () => {
    if (!text.trim() || loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/chat/reply",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ chatId, text }),
        }
      );

      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Reply failed");
      }

      // ✅ success
      setText(""); // polling will update messages
    } catch (err) {
      alert("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <textarea
        placeholder="Reply as System / Guide"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 10 }}
        disabled={loading}
      />

      <button
        onClick={sendReply}
        disabled={loading}
        style={{ marginTop: 8 }}
      >
        {loading ? "Sending…" : "Send Reply"}
      </button>
    </div>
  );
}
