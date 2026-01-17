"use client";

import { useEffect, useState } from "react";
import ChatListItem from "./components/ChatListItem";
import ChatScreen from "../ChatScreen";



export default function ChatsPage() {
  const [chatList, setChatList] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);

  // Load chat list (from listener selection)
  useEffect(() => {
    const session = localStorage.getItem("activeListenerSession");
    if (!session) return;

    const data = JSON.parse(session);

    setChatList([
      {
        id: data.listenerId,
        name: data.listenerName,
        lastMessage: "Hey, I am here 👋",
        time: "Just now",
        unread: 1,
      },
    ]);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      {/* CHAT LIST */}
      {!activeChat && (
        <div className="space-y-3">
          {chatList.map((item) => (
            <ChatListItem
              key={item.id}
              {...item}
              onClick={() => setActiveChat(item)}
            />
          ))}
        </div>
      )}

      {/* CHAT OPEN */}
      {activeChat && (
        <ChatScreen
          chat={activeChat}
          onBack={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}
