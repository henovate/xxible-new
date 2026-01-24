import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function safeNext(raw: string | null, fallback = "/") {
  if (!raw) return fallback;
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return fallback;
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/sign-up";
  if (!isAuthPage) return NextResponse.next();

  // If user already has session cookie -> keep them out of auth pages
  const token = req.cookies.get("xxible_session")?.value;

  if (token) {
    // If they were going somewhere specific, honor it
    const next = safeNext(searchParams.get("next"), "/");
    return NextResponse.redirect(new URL(next, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/sign-up"],
};
