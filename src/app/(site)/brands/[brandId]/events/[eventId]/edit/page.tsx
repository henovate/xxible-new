import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditEventWizardClient from "./EditEventWizardClient";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ brandId: string; eventId: string }>;
}) {
  const { brandId, eventId } = await params;

  const [event, locations] = await Promise.all([
    prisma.event.findFirst({
      where: { id: eventId, brandId },
      include: {
        ticketTiers: {
          orderBy: { createdAt: "asc" },
          select: { id: true, name: true, price: true, quantityLimit: true },
        },
      },
    }),
    prisma.brandLocation.findMany({
      where: { brandId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        country: true,
        latitude: true,
        longitude: true,
      },
    }),
  ]);

  if (!event) return notFound();

  return (
    <EditEventWizardClient
      brandId={brandId}
      eventId={eventId}
      brandLocations={locations}
      initialEvent={{
        id: event.id,
        status: event.status,
        title: event.title,
        category: event.category,
        description: event.description,
        imageUrl: (event as any).imageUrl ?? "/assets/events/event3.png",
        imageAlt: (event as any).imageAlt ?? null,
        startsAtISO: event.startsAt.toISOString(),
        endsAtISO: event.endsAt ? event.endsAt.toISOString() : null,

        // location reference (optional)
        locationId: event.locationId ?? null,

        // snapshot (always present for published)
        locationName: event.locationName,
        locationAddress: event.locationAddress,
        locationCity: event.locationCity,
        locationCountry: event.locationCountry,
        latitude: event.latitude ?? null,
        longitude: event.longitude ?? null,

        ticketTiers: event.ticketTiers.map((t) => ({
          id: t.id,
          name: t.name,
          price: t.price,
          quantityLimit: t.quantityLimit ?? null,
        })),
      }}
    />
  );
}
