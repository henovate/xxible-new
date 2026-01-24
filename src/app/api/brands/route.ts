import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/requireUser";
import { toAppError, AppError } from "@/lib/errors";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json();

    const { name, description, logo } = body as {
      name: string;
      description?: string;
      logo?: string;
    };

    if (!name || typeof name !== "string") {
      throw new AppError("Brand name is required", 400);
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        description: description ?? null,
        logo: logo ?? null,
        ownerId: user.sub, // ✅ requires your schema update
      },
    });

    return NextResponse.json({ brand }, { status: 201 });
  } catch (err) {
    const appErr = toAppError(err);
    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}

export async function GET() {
  try {
    const user = await requireUser();

    const brands = await prisma.brand.findMany({
      where: { ownerId: user.sub },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ brands }, { status: 200 });
  } catch (err) {
    const appErr = toAppError(err);
    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}
