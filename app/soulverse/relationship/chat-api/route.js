import { NextResponse } from "next/server";
import mongoose from "mongoose";
import RelationshipChat from "@/models/RelationshipChat";

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
}

/* ===== GET CHAT ===== */
export async function GET(req: Request) {
  await connectDB();

  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "No userId" }, { status: 400 });
  }

  const chat = await RelationshipChat.findOne({ userId });
  return NextResponse.json(chat || {});
}

/* ===== SAVE CHAT ===== */
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { userId, messages, themeStats, memory } = body;

  if (!userId) {
    return NextResponse.json({ error: "No userId" }, { status: 400 });
  }

  const updated = await RelationshipChat.findOneAndUpdate(
    { userId },
    {
      $set: {
        messages,
        themeStats,
        memory,
        lastActiveAt: new Date(),
      },
    },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}
