// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = cookies().get("xxible_session")?.value;

  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ user: null }, { status: 200 });

  try {
    const payload = jwt.verify(token, secret);
    return NextResponse.json({ user: payload }, { status: 200 });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
