export type Tab = "home" | "connections" | "chats" | "profile";

export type ChatItem = {
  id: number;
  name: string;
  photo: string;
  gender: "male" | "female";
  status: "pending" | "accepted";

  lastMessage?: string;
  lastTime?: string;
  unreadCount?: number;

  isOnline?: boolean;
  isTyping?: boolean;
};
