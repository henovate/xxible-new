import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireBrandOwner } from "@/lib/requireBrandOwner";
import { toAppError } from "@/lib/errors";

export async function GET(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const brandId = params.brandId;
    await requireBrandOwner(brandId);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // "DRAFT" | "PUBLISHED" | null

    const events = await prisma.event.findMany({
      where: {
        brandId,
        ...(status ? { status: status as any } : {}),
      },
      orderBy: { startsAt: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        startsAt: true,
        endsAt: true,
        status: true,
        imageUrl: true,
        locationName: true,
        locationCity: true,
        locationCountry: true,
        ticketTiers: { select: { price: true } },
        createdAt: true,
      },
    });

    return NextResponse.json({ events }, { status: 200 });
  } catch (err) {
    const appErr = toAppError(err);
    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}
