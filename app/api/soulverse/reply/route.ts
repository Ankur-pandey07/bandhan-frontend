import { NextResponse } from "next/server";
import { sessions } from "@/lib/soulverseSessions";

export async function POST(req: Request) {
  const body = await req.json();

  const messageText = body.message?.text || "";

  // Expecting: /reply SESSION_ID message...
  if (!messageText.startsWith("/reply")) {
    return NextResponse.json({ ok: true });
  }

  const [, sessionId, ...rest] = messageText.split(" ");
  const replyText = rest.join(" ");

  if (!sessions.has(sessionId)) {
    return NextResponse.json({ ok: false, error: "Invalid session" });
  }

  const session = sessions.get(sessionId)!;
  session.messages.push(replyText);

  return NextResponse.json({ ok: true });
}
