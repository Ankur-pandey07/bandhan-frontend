import { NextResponse } from "next/server";

const globalStore = globalThis as any;
globalStore.messages = globalStore.messages || {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session");

  if (!sessionId) {
    return NextResponse.json({});
  }

  const msg = globalStore.messages[sessionId];

  if (!msg) {
    return NextResponse.json({});
  }

  // remove after delivery (VERY IMPORTANT)
  delete globalStore.messages[sessionId];

  return NextResponse.json({
    message: msg.text,
  });
}
