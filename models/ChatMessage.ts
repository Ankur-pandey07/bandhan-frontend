import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  userId: String,
  role: String,
  content: String,
  theme: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
