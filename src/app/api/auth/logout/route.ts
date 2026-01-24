// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true }, { status: 200 });

  // ✅ Best-effort delete
  res.cookies.delete("xxible_session");

  // ✅ Fallback clear (some environments are picky)
  res.cookies.set("xxible_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return res;
}
