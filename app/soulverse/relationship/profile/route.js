import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import RelationshipProfile from "../../../../models/RelationshipProfile";

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  const profile = await RelationshipProfile.findOneAndUpdate(
    { userId: data.userId },
    data,
    { upsert: true, new: true }
  );

  return NextResponse.json(profile);
}
