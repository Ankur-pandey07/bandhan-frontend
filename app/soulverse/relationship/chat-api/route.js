import { NextResponse } from "next/server";
import mongoose from "mongoose";
import RelationshipChat from "@/models/RelationshipChat";
import { PHASE } from "@/lib/phase";

const MONGODB_URI = process.env.MONGODB_URI!;

/* ===== DB CONNECT ===== */
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
}

/* ===== GET CHAT ===== */
export async function GET(req: Request) {
  await connectDB();

  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "No userId provided" },
      { status: 400 }
    );
  }

  const chat = await RelationshipChat.findOne({ userId });
  return NextResponse.json(chat || {});
}

/* ===== SAVE CHAT ===== */
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const { userId, messages, themeStats, memory, phase } = body;

  if (!userId) {
    return NextResponse.json(
      { error: "No userId provided" },
      { status: 400 }
    );
  }

  /* 🔒 PHASE-2 HARD SAFETY LOCK
     Phase-2 me AI ka ek bhi message save nahi hoga
  */
  if (phase === PHASE.HUMAN_TAKEOVER) {
    const hasAIMessage = messages?.some(
      (msg: any) => msg?.sentBy === "ai"
    );

    if (hasAIMessage) {
      return NextResponse.json(
        {
          error: "AI messages are not allowed after Phase-1",
        },
        { status: 400 }
      );
    }
  }

  await RelationshipChat.findOneAndUpdate(
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
