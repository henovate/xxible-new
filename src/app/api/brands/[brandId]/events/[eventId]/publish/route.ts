import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function missing(field: string) {
  return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
}

export async function POST(
  _req: Request,
  { params }: { params: { brandId: string; eventId: string } }
) {
  try {
    const { brandId, eventId } = params;

    const event = await prisma.event.findFirst({
      where: { id: eventId, brandId },
      include: { ticketTiers: true },
    });

    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // ---- Publish validation (minimum requirements) ----
    if (!event.title) return missing("title");
    if (!event.description) return missing("description");
    if (!event.category) return missing("category");
    if (!event.startsAt) return missing("startsAt");

    // Location snapshot must exist (offline-only XXIBLE)
    if (!event.locationName || !event.locationAddress || !event.locationCity || !event.locationCountry) {
      return NextResponse.json({ error: "Location is required to publish" }, { status: 400 });
    }

    if (!event.ticketTiers || event.ticketTiers.length === 0) {
      return NextResponse.json({ error: "At least one ticket tier is required to publish" }, { status: 400 });
    }

    const updated = await prisma.event.update({
      where: { id: eventId },
      data: { status: "PUBLISHED" },
    });

    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (err) {
    console.error("Publish Event Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
