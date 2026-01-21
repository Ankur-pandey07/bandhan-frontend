import { NextResponse } from "next/server";

const sessionAssignments = globalThis as any;
sessionAssignments.sessions =
  sessionAssignments.sessions || {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ assigned: false });
  }

  const data = sessionAssignments.sessions[sessionId];

  // 🔒 IMPORTANT FIX
  if (!data || !data.assignee || !data.telegramUserId) {
    return NextResponse.json({ assigned: false });
  }

  return NextResponse.json({
    assigned: true,
    assignee: data.assignee,
  });
}
