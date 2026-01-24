import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireBrandOwner } from "@/lib/requireBrandOwner";
import { AppError } from "@/lib/errors";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function fmtDate(dt: Date) {
  return dt.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function minPriceLabel(prices: number[]) {
  if (!prices.length) return "Free";
  const min = Math.min(...prices);
  if (!min || min <= 0) return "Free";
  return `₦${min.toLocaleString()}`;
}

export default async function BrandEventsPage({
  params,
}: {
  params: { brandId: string };
}) {
  const brandId = params.brandId;

  // ✅ Require logged-in + brand owner
  try {
    await requireBrandOwner(brandId);
  } catch (err) {
    if (err instanceof AppError && err.status === 401) {
      redirect(`/login?next=${encodeURIComponent(`/brands/${brandId}/events`)}`);
    }
    throw err;
  }

  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    select: { id: true, name: true, verified: true, logo: true },
  });

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-10">
          <div className="mx-auto max-w-2xl">
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h1 className="text-2xl font-extrabold text-gray-900">
                  Brand not found
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  This brand doesn’t exist, or you don’t have access to it.
                </p>
                <div className="mt-5">
                  <Link href="/brands/select?next=manage-events">
                    <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                      Back to Brand Select
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  const events = await prisma.event.findMany({
    where: { brandId },
    orderBy: [{ createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      category: true,
      status: true,
      startsAt: true,
      endsAt: true,
      imageUrl: true,
      locationName: true,
      locationCity: true,
      locationCountry: true,
      ticketTiers: { select: { price: true } },
      createdAt: true,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                    {brand.name}
                  </h1>
                  {brand.verified ? (
                    <Badge className="rounded-full bg-gray-900 text-white">
                      Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-gray-100 text-gray-700"
                    >
                      Unverified
                    </Badge>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-700">
                  Your events under this brand.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href="/brands/select?next=manage-events">
                <Button variant="outline" className="rounded-xl border-gray-300">
                  Switch brand
                </Button>
              </Link>

              <Link href={`/brands/${brandId}/events/new`}>
                <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          {/* Body */}
          <div className="mt-6 space-y-4">
            {events.length === 0 ? (
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="text-xl font-extrabold text-gray-900">
                    No events yet
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Create your first event under{" "}
                    <span className="font-bold">{brand.name}</span>.
                  </p>

                  <div className="mt-5">
                    <Link href={`/brands/${brandId}/events/new`}>
                      <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                        Create your first event
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {events.map((e) => {
                  const priceLabel = minPriceLabel(
                    e.ticketTiers.map((t) => t.price)
                  );

                  return (
                    <Card
                      key={e.id}
                      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="relative aspect-[16/10] bg-gray-100">
                          <img
                            src={e.imageUrl || "/assets/events/event3.png"}
                            alt={e.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="p-4">
                          <p className="text-lg font-extrabold text-gray-900 leading-tight line-clamp-2">
                            {e.title}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge className="rounded-full bg-gray-900 text-white">
                              {e.category}
                            </Badge>

                            <Badge
                              variant="secondary"
                              className="rounded-full bg-gray-100 text-gray-700"
                            >
                              {priceLabel}
                            </Badge>

                            <Badge
                              variant="secondary"
                              className="rounded-full bg-gray-100 text-gray-700"
                            >
                              {e.status}
                            </Badge>
                          </div>

                          <p className="mt-3 text-sm text-gray-700">
                            <span className="font-semibold">When:</span>{" "}
                            {fmtDate(e.startsAt)}
                            {e.endsAt ? ` — ${fmtDate(e.endsAt)}` : ""}
                          </p>

                          <p className="mt-1 text-sm text-gray-700 line-clamp-1">
                            <span className="font-semibold">Where:</span>{" "}
                            {e.locationName} • {e.locationCity},{" "}
                            {e.locationCountry}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {/* Public view (match your route naming) */}
                            <Link href={`/event/${e.id}`} className="w-full sm:w-auto">
                              <Button
                                variant="outline"
                                className="w-full rounded-xl border-gray-300"
                              >
                                View
                              </Button>
                            </Link>

                            {/* ✅ Correct edit route */}
                            <Link
                              href={`/brands/${brandId}/events/${e.id}/edit`}
                              className="w-full sm:w-auto"
                            >
                              <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                                Edit
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
