// src/app/(site)/brands/[brandId]/events/new/page.tsx

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireBrandOwner } from "@/lib/requireBrandOwner";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import CreateEventWizardClient from "./CreateEventWizardClient";

export default async function NewEventPage({
  params,
}: {
  params: { brandId: string };
}) {
  const { brandId } = params;

  // ✅ Must be logged in + must own this brand
  // This is essential before going live.
  await requireBrandOwner(brandId);

  // 1) Ensure brand exists
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    select: { id: true, name: true },
  });

  // 2) If no brand, show UX state (no redirect)
  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-10">
          <div className="mx-auto max-w-2xl">
            <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
              Create Event
            </Badge>

            <Card className="mt-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                  You need a Brand to create events
                </h1>

                <p className="mt-3 text-sm sm:text-base leading-6 text-gray-700">
                  On XXIBLE, every event is created under a Brand (the organizer/host). This
                  helps attendees know who’s hosting and keeps your events organized.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link href="/brands/new" className="w-full sm:w-auto">
                    <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                      Create your first Brand
                    </Button>
                  </Link>

                  <Link href="/events" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full rounded-xl border-gray-300">
                      Browse events
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-bold text-gray-900">What is a Brand?</p>
                  <p className="mt-1 text-sm text-gray-700">
                    A Brand can be a nightclub, lounge, beach party organizer, event team,
                    or any verified host that creates events on XXIBLE.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  // 3) Brand exists → fetch locations normally
  const locations = await prisma.brandLocation.findMany({
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
  });

  return <CreateEventWizardClient brandId={brandId} brandLocations={locations} />;
}
