"use client";

import { useState } from "react";

export default function ReplyBox({ chatId }: { chatId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReply = async () => {
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch("/api/admin/chat/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, text }),
    });

    setLoading(false);

    if (res.ok) {
      setText("");
      window.location.reload(); // simple, safe
    } else {
      alert("Failed to send reply");
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
      />

      <button
        onClick={sendReply}
        disabled={loading}
        style={{ marginTop: 8 }}
      >
        {loading ? "Sending..." : "Send Reply"}
      </button>
    </div>
  );
}
