import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const rememberMe = Boolean(body.rememberMe);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfigured (JWT_SECRET missing)." },
        { status: 500 }
      );
    }

    // ✅ Expiry rules:
    // rememberMe = true  -> 30 days
    // rememberMe = false -> session cookie (expires when browser closes)
    const maxAgeSeconds = rememberMe ? 60 * 60 * 24 * 30 : undefined;

    // JWT expiry should match cookie behavior
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: rememberMe ? "30d" : "1d" } // 1 day for non-remembered login
    );

    const res = NextResponse.json(
      { user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 }
    );

    res.cookies.set("xxible_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(maxAgeSeconds ? { maxAge: maxAgeSeconds } : {}), // ✅ session cookie if undefined
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
