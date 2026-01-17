"use client";
import { useEffect, useState } from "react";

export default function ChatPage({ params }) {
  const { id } = params; // receiver ID
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchMessages();

    // Polling every 2 seconds (real-time feel)
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    const res = await fetch(
      `http://localhost:5000/api/chat/${currentUser._id}/${id}`
    );
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("http://localhost:5000/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: currentUser._id,
        receiver: id,
        message: text,
      }),
    });

    setText("");
    fetchMessages();
  };

  return (
    <div className="min-h-screen bg-red-50 p-4">
      <h1 className="text-2xl font-bold text-center text-red-700 mb-4">Chat</h1>

      <div className="bg-white shadow-md rounded-xl p-4 max-w-xl mx-auto h-[70vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-2 rounded-lg w-fit ${
              msg.sender === currentUser._id
                ? "bg-red-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto flex gap-2 mt-4">
        <input
          className="input flex-1"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn-primary w-32" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
