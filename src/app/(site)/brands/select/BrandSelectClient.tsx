"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type BrandItem = {
  id: string;
  name: string;
  logo: string | null;
  verified: boolean;
  createdAt: Date;
};

export default function BrandSelectClient({
  brands,
  nextMode,
}: {
  brands: BrandItem[];
  nextMode: "create-event" | "manage-events";
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nextHref = useMemo(() => {
    if (!selectedId) return null;
    if (nextMode === "manage-events") return `/brands/${selectedId}/events`;
    return `/brands/${selectedId}/events/new`;
  }, [selectedId, nextMode]);

  const createBrandHref = useMemo(() => {
    // Optional: add a return param so after brand creation you can come back here.
    // (If you don't implement return logic yet, it still works fine.)
    const returnTo = `/brands/select?next=${encodeURIComponent(nextMode)}`;
    return `/brands/new?returnTo=${encodeURIComponent(returnTo)}`;
  }, [nextMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Select a Brand
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Choose which brand you want to use.
                {nextMode === "manage-events"
                  ? " You’ll manage the brand’s events next."
                  : " You’ll create an event next."}
              </p>
            </div>

            <Button
              className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => router.push(createBrandHref)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Brand
            </Button>
          </div>

          {/* Empty state */}
          {brands.length === 0 ? (
            <Card className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <Badge className="rounded-full bg-gray-900 text-white">
                  No Brands Yet
                </Badge>

                <h2 className="mt-4 text-xl font-extrabold text-gray-900">
                  Create a Brand to continue
                </h2>

                <p className="mt-2 text-sm text-gray-700">
                  On XXIBLE, every event belongs to a Brand (the organizer/host).
                  Create one brand first, then you’ll be able to create events under it.
                </p>

                <Button
                  className="mt-5 w-full sm:w-auto rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                  onClick={() => router.push(createBrandHref)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first Brand
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Brand cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brands.map((b) => {
                  const selected = selectedId === b.id;

                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedId(b.id)}
                      className={[
                        "text-left rounded-2xl border bg-white shadow-sm transition",
                        "hover:bg-gray-50",
                        selected
                          ? "border-gray-900 ring-2 ring-gray-900/10"
                          : "border-gray-200",
                      ].join(" ")}
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
                              {/* Use <img> so you don't depend on next/image remote config */}
                              {b.logo ? (
                                <img
                                  src={b.logo}
                                  alt={b.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate text-sm font-extrabold text-gray-900">
                                  {b.name}
                                </p>
                                {b.verified ? (
                                  <Badge className="rounded-full bg-gray-900 text-white">
                                    Verified
                                  </Badge>
                                ) : null}
                              </div>

                              <p className="mt-1 text-xs text-gray-600">
                                Created {new Date(b.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {selected ? (
                            <CheckCircle2 className="h-5 w-5 text-gray-900" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-gray-300 bg-white" />
                          )}
                        </div>

                        <p className="mt-3 text-xs text-gray-600">
                          {nextMode === "manage-events"
                            ? "Continue to manage events for this brand."
                            : "Continue to create an event for this brand."}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer controls */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-300"
                  onClick={() => router.back()}
                >
                  Back
                </Button>

                <Button
                  className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                  disabled={!nextHref}
                  onClick={() => {
                    if (nextHref) router.push(nextHref);
                  }}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
