import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 🔴 Hardcoded dummy users (NO DB)
  if (email === "user@test.com" && password === "123456") {
    return NextResponse.json({
      success: true,
      user: {
        _id: "user-1",
        email,
        role: "user",
      },
    });
  }

  if (email === "admin@test.com" && password === "admin123") {
    return NextResponse.json({
      success: true,
      user: {
        _id: "admin-1",
        email,
        role: "admin",
      },
    });
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
