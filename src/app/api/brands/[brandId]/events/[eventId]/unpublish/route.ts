import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: { brandId: string; eventId: string } }
) {
  try {
    const { brandId, eventId } = params;

    const event = await prisma.event.findFirst({
      where: { id: eventId, brandId },
      select: { id: true, status: true },
    });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: { status: "DRAFT" },
    });

    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (err) {
    console.error("Unpublish Event Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
