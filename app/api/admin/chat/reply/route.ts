import { NextResponse } from "next/server";
import mongoose from "mongoose";
import RelationshipChat from "@/models/RelationshipChat";
import { PHASE } from "@/lib/phase";

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
}

export async function POST(req: Request) {
  await connectDB();

  const { chatId, text } = await req.json();

  if (!chatId || !text?.trim()) {
    return NextResponse.json(
      { error: "chatId and text are required" },
      { status: 400 }
    );
  }

  const chat = await RelationshipChat.findById(chatId);
  if (!chat) {
    return NextResponse.json(
      { error: "Chat not found" },
      { status: 404 }
    );
  }

  // 🔒 Force Phase-2
  chat.phase = PHASE.HUMAN_TAKEOVER;

  chat.messages.push({
    role: "system",
    text: text.trim(),
    phase: PHASE.HUMAN_TAKEOVER,
    sentBy: "admin",
    createdAt: new Date(),
  });

  chat.lastActiveAt = new Date();
  await chat.save();

  return NextResponse.json({ success: true });
}
