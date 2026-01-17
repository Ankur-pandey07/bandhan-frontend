import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const publicPaths = ["/login", "/signup", "/"];

  // 🔐 If user logged in → block login/signup
  if (token && publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🔐 If user not logged in → block dashboard
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard", "/"],
};
