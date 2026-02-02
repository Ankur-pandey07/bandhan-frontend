import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 🔒 Protect admin routes
  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("auth_user")?.value;

    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = JSON.parse(cookie);

    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
