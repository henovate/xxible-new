import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/requireUser";
import { toAppError, AppError } from "@/lib/errors";

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const user = await requireUser();
    const { status } = (await req.json()) as { status: "DRAFT" | "PUBLISHED" };

    if (status !== "DRAFT" && status !== "PUBLISHED") {
      throw new AppError("Invalid status", 400);
    }

    // verify ownership through brand
    const event = await prisma.event.findUnique({
      where: { id: params.eventId },
      select: { id: true, brand: { select: { ownerId: true } } },
    });

    if (!event) throw new AppError("Event not found", 404);
    if (event.brand.ownerId !== user.sub) throw new AppError("Forbidden", 403);

    const updated = await prisma.event.update({
      where: { id: params.eventId },
      data: { status },
      select: { id: true, status: true },
    });

    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (err) {
    const appErr = toAppError(err);
    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}
