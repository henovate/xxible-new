import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const allowedCities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Owerri",
  "Aba",
  "Enugu",
] as const;

// Only allow safe internal redirects
function safeNext(raw: unknown, fallback = "/") {
  const str = typeof raw === "string" ? raw : "";
  if (!str) return fallback;
  if (str.startsWith("/") && !str.startsWith("//")) return str;
  return fallback;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const city = String(body.city || "");
    const ageConfirmed = Boolean(body.ageConfirmed);

    // Optional: allow signup to return user to a given page
    // e.g. /sign-up?next=/brands/select?next=create-event
    const redirectTo = safeNext(body.next, "/");

    if (!ageConfirmed) {
      return NextResponse.json(
        { error: "You must confirm you are 18+ to sign up." },
        { status: 400 }
      );
    }

    if (!allowedCities.includes(city as any)) {
      return NextResponse.json(
        { error: "Please select a valid city." },
        { status: 400 }
      );
    }

    if (!email || !password || password.length < 8) {
      return NextResponse.json(
        { error: "Email and password (min 8 chars) are required." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        city,
      },
      select: {
        id: true,
        email: true,
        city: true,
        role: true,
        createdAt: true,
      },
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfigured (JWT_SECRET missing)." },
        { status: 500 }
      );
    }

    // For signup, default to "remembered" behavior (30d).
    // You can change this if you want.
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "30d" }
    );

    const res = NextResponse.json(
      { user, redirectTo },
      { status: 201 }
    );

    res.cookies.set("xxible_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json({ error: "Signup failed." }, { status: 500 });
  }
}
