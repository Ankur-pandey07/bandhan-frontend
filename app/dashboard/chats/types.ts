export type ChatStatus =
  | "pending"
  | "active"
  | "declined"
  | "searching";

export interface ActiveChat {
  listenerId: string;
  listenerName: string;
  mood: string;
  status: ChatStatus;
  declinedIds?: string[];
}
