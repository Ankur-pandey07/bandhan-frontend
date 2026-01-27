import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/RelationshipProfile";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  await Profile.create(body);
  return NextResponse.json({ ok: true });
}
