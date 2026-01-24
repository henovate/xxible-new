import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireBrandOwner } from "@/lib/requireBrandOwner";
import { toAppError } from "@/lib/errors";

type TicketInput = {
  id?: string;
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

type BodyInput = {
  title?: string;
  description?: string;
  category?: string;

  startsAt?: string;
  endsAt?: string | null;

  // ✅ cover
  imageUrl?: string;
  imageAlt?: string | null;
  imagePublicId?: string | null;

  // ✅ gallery (max 3)
  galleryUrls?: string[];
  galleryPublicIds?: string[];

  location?: LocationInput;
  tickets?: TicketInput[];
};

function isNonEmptyString(v: unknown) {
  return typeof v === "string" && v.trim().length > 0;
}

function cleanStringArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((v) => String(v ?? "").trim())
    .filter(Boolean);
}

export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string; eventId: string } }
) {
  try {
    const { brandId, eventId } = params;

    // ✅ Must be logged in + own this brand
    await requireBrandOwner(brandId);

    const body = (await req.json()) as Partial<BodyInput>;

    // ---- Ensure event exists + belongs to brand ----
    const existingEvent = await prisma.event.findFirst({
      where: { id: eventId, brandId },
      select: { id: true },
    });

    if (!existingEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const {
      title,
      description,
      category,

      imageUrl,
      imageAlt,
      imagePublicId,

      galleryUrls,
      galleryPublicIds,

      startsAt,
      endsAt,

      location,
      tickets,
    } = body;

    // ---- gallery validation / cleaning ----
    const cleanGalleryUrls = cleanStringArray(galleryUrls).slice(0, 3);
    const cleanGalleryPublicIds = cleanStringArray(galleryPublicIds).slice(0, 3);

    if (Array.isArray(galleryUrls) && cleanStringArray(galleryUrls).length > 3) {
      return NextResponse.json(
        { error: "Maximum of 3 gallery images" },
        { status: 400 }
      );
    }

    // ---- Resolve location snapshot if location was provided ----
    let locationUpdate:
      | {
          locationId?: string | null;
          locationName: string;
          locationAddress: string;
          locationCity: string;
          locationCountry: string;
          latitude?: number | null;
          longitude?: number | null;
        }
      | null = null;

    if (location) {
      // Existing location
      if (location.locationId) {
        const loc = await prisma.brandLocation.findUnique({
          where: { id: location.locationId },
        });

        if (!loc || loc.brandId !== brandId) {
          return NextResponse.json({ error: "Invalid location" }, { status: 400 });
        }

        locationUpdate = {
          locationId: loc.id,
          locationName: loc.name,
          locationAddress: loc.address,
          locationCity: loc.city,
          locationCountry: loc.country,
          latitude: loc.latitude ?? null,
          longitude: loc.longitude ?? null,
        };
      }
      // New one-off location (optionally saved)
      else if (location.newLocation) {
        const nl = location.newLocation;

        if (
          !isNonEmptyString(nl.name) ||
          !isNonEmptyString(nl.address) ||
          !isNonEmptyString(nl.city) ||
          !isNonEmptyString(nl.country)
        ) {
          return NextResponse.json(
            { error: "Incomplete location details" },
            { status: 400 }
          );
        }

        let savedLocationId: string | null = null;

        if (nl.saveToBrand) {
          const saved = await prisma.brandLocation.create({
            data: {
              brandId,
              name: nl.name.trim(),
              address: nl.address.trim(),
              city: nl.city.trim(),
              country: nl.country.trim(),
              latitude: nl.latitude,
              longitude: nl.longitude,
            },
          });
          savedLocationId = saved.id;
        }

        locationUpdate = {
          locationId: savedLocationId,
          locationName: nl.name.trim(),
          locationAddress: nl.address.trim(),
          locationCity: nl.city.trim(),
          locationCountry: nl.country.trim(),
          latitude: nl.latitude ?? null,
          longitude: nl.longitude ?? null,
        };
      } else {
        return NextResponse.json({ error: "Location data missing" }, { status: 400 });
      }
    }

    // ---- Build event update payload ----
    const eventData: Record<string, any> = {};

    if (title !== undefined) eventData.title = String(title);
    if (description !== undefined) eventData.description = String(description);
    if (category !== undefined) eventData.category = String(category);

    // ✅ cover
    if (imageUrl !== undefined) {
      const v = String(imageUrl ?? "").trim();
      if (!v) {
        return NextResponse.json(
          { error: "Cover image is required" },
          { status: 400 }
        );
      }
      eventData.imageUrl = v;
    }
    if (imageAlt !== undefined) eventData.imageAlt = imageAlt ?? null;
    if (imagePublicId !== undefined) eventData.imagePublicId = imagePublicId ?? null;

    // ✅ gallery
    if (galleryUrls !== undefined) eventData.galleryUrls = cleanGalleryUrls;
    if (galleryPublicIds !== undefined) eventData.galleryPublicIds = cleanGalleryPublicIds;

    if (startsAt !== undefined) eventData.startsAt = new Date(startsAt);
    if (endsAt !== undefined) eventData.endsAt = endsAt ? new Date(endsAt) : null;

    if (locationUpdate) {
      eventData.locationId = locationUpdate.locationId ?? null;
      eventData.locationName = locationUpdate.locationName;
      eventData.locationAddress = locationUpdate.locationAddress;
      eventData.locationCity = locationUpdate.locationCity;
      eventData.locationCountry = locationUpdate.locationCountry;
      eventData.latitude = locationUpdate.latitude;
      eventData.longitude = locationUpdate.longitude;
    }

    // ---- If tickets provided, replace tiers ----
    const updated = await prisma.$transaction(async (tx) => {
      const updatedEvent = await tx.event.update({
        where: { id: eventId },
        data: eventData,
      });

      if (tickets !== undefined) {
        if (!Array.isArray(tickets) || tickets.length === 0) {
          // throw to be caught and returned as 400 below
          throw new Error("At least one ticket tier is required");
        }

        await tx.ticketTier.deleteMany({ where: { eventId } });

        await tx.ticketTier.createMany({
          data: tickets.map((t) => ({
            eventId,
            name: String(t.name || "").trim(),
            price: Number(t.price),
            quantityLimit: t.quantityLimit ?? null,
          })),
        });
      }

      return updatedEvent;
    });

    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (err: any) {
    // If this is an AppError from requireBrandOwner or others:
    const appErr = toAppError(err);

    // Special-case your ticket validation message
    if (String(err?.message || "").includes("ticket tier")) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json({ error: appErr.message }, { status: appErr.status });
  }
}
