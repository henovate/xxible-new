import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireBrandOwner } from "@/lib/requireBrandOwner";
import { toAppError } from "@/lib/errors";

type TicketInput = {
  name: string;
  price: number; // naira base unit (0 = free)
  quantityLimit?: number | null;
};

type LocationInput = {
  locationId?: string;
  newLocation?: {
    name: string;
    address: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    saveToBrand?: boolean;
  };
};

function cleanStringArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((v) => String(v ?? "").trim())
    .filter(Boolean);
}

export async function POST(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const brandId = params.brandId;

    // ✅ Must be logged in + own this brand
    await requireBrandOwner(brandId);

    const body = await req.json();

    const {
      title,
      description,
      category,
      startsAt,
      endsAt,
      tickets,
      location,

      // cover
      imageUrl,
      imageAlt,
      imagePublicId,

      // gallery (max 3)
      galleryUrls,
      galleryPublicIds,

      publish = false,
    } = body as {
      title: string;
      description: string;
      category: string;
      startsAt: string;
      endsAt?: string | null;
      tickets: TicketInput[];
      location: LocationInput;

      imageUrl: string;
      imageAlt?: string | null;
      imagePublicId?: string | null;

      galleryUrls?: string[];
      galleryPublicIds?: string[];

      publish?: boolean;
    };

    // ---- basic validation ----
    if (!title || !description || !category || !startsAt || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ cover is required
    if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.trim()) {
      return NextResponse.json(
        { error: "Cover image is required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(tickets) || tickets.length === 0) {
      return NextResponse.json(
        { error: "At least one ticket tier is required" },
        { status: 400 }
      );
    }

    // ✅ gallery cleaning / limits
    const cleanGalleryUrls = cleanStringArray(galleryUrls).slice(0, 3);
    const cleanGalleryPublicIds = cleanStringArray(galleryPublicIds).slice(0, 3);

    if (Array.isArray(galleryUrls) && cleanStringArray(galleryUrls).length > 3) {
      return NextResponse.json(
        { error: "Maximum of 3 gallery images" },
        { status: 400 }
      );
    }

    // ---- resolve location snapshot ----
    let locationSnapshot: {
      locationId?: string;
      locationName: string;
      locationAddress: string;
      locationCity: string;
      locationCountry: string;
      latitude?: number;
      longitude?: number;
    };

    let resolvedLocationId: string | undefined;

    // CASE 1: existing BrandLocation
    if (location.locationId) {
      const existing = await prisma.brandLocation.findUnique({
        where: { id: location.locationId },
      });

      if (!existing || existing.brandId !== brandId) {
        return NextResponse.json({ error: "Invalid location" }, { status: 400 });
      }

      resolvedLocationId = existing.id;

      locationSnapshot = {
        locationId: existing.id,
        locationName: existing.name,
        locationAddress: existing.address,
        locationCity: existing.city,
        locationCountry: existing.country,
        latitude: existing.latitude ?? undefined,
        longitude: existing.longitude ?? undefined,
      };
    }

    // CASE 2: new one-off location
    else if (location.newLocation) {
      const nl = location.newLocation;

      if (!nl.name || !nl.address || !nl.city || !nl.country) {
        return NextResponse.json(
          { error: "Incomplete location details" },
          { status: 400 }
        );
      }

      // Save to brand if requested
      if (nl.saveToBrand) {
        const saved = await prisma.brandLocation.create({
          data: {
            brandId,
            name: nl.name,
            address: nl.address,
            city: nl.city,
            country: nl.country,
            latitude: nl.latitude,
            longitude: nl.longitude,
          },
        });

        resolvedLocationId = saved.id;
      }

      locationSnapshot = {
        locationId: resolvedLocationId,
        locationName: nl.name,
        locationAddress: nl.address,
        locationCity: nl.city,
        locationCountry: nl.country,
        latitude: nl.latitude,
        longitude: nl.longitude,
      };
    } else {
      return NextResponse.json({ error: "Location data missing" }, { status: 400 });
    }

    // ---- create event + tickets in transaction ----
    const event = await prisma.$transaction(async (tx) => {
      const createdEvent = await tx.event.create({
        data: {
          brandId,
          title,
          description,
          category,
          startsAt: new Date(startsAt),
          endsAt: endsAt ? new Date(endsAt) : null,
          status: publish ? "PUBLISHED" : "DRAFT",

          // cover
          imageUrl: imageUrl.trim(),
          imageAlt: imageAlt ?? null,
          imagePublicId: imagePublicId ?? null,

          // gallery
          galleryUrls: cleanGalleryUrls,
          galleryPublicIds: cleanGalleryPublicIds,

          locationId: locationSnapshot.locationId ?? null,
          locationName: locationSnapshot.locationName,
          locationAddress: locationSnapshot.locationAddress,
          locationCity: locationSnapshot.locationCity,
          locationCountry: locationSnapshot.locationCountry,
          latitude: locationSnapshot.latitude,
          longitude: locationSnapshot.longitude,
        },
      });

      await tx.ticketTier.createMany({
        data: tickets.map((t) => ({
          eventId: createdEvent.id,
          name: t.name,
          price: t.price,
          quantityLimit: t.quantityLimit ?? null,
        })),
      });

      return createdEvent;
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    const appErr = toAppError(err);
    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}
