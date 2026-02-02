// lib/messageTypes.ts

import { ChatPhase } from "./phase";

export type MessageRole = "user" | "system";
export type SenderType = "ai" | "admin";

export interface ChatMessage {
  chatId: string;
  role: MessageRole;
  text: string;
  phase: ChatPhase;
  sentBy?: SenderType; // ai = Phase-1, admin = Phase-2
  createdAt: Date;
}
