"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ToggleLeft, ToggleRight } from "lucide-react";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Brand = {
  id: string;
  name: string;
  logo: string | null;
  verified: boolean;
};

type EventRow = {
  id: string;
  title: string;
  category: string;
  startsAt: string;
  status: "DRAFT" | "PUBLISHED";
  imageUrl: string;
  locationName: string;
  locationCity: string;
  locationCountry: string;
  ticketTiers: { price: number }[];
};

function minPrice(tiers: { price: number }[]) {
  if (!tiers?.length) return "—";
  const m = Math.min(...tiers.map((t) => t.price ?? 0));
  return m <= 0 ? "Free" : `₦${m.toLocaleString()}`;
}

export default function BrandEventsClient({ brand }: { brand: Brand }) {
  const [status, setStatus] = useState<"ALL" | "DRAFT" | "PUBLISHED">("ALL");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function fetchEvents(nextStatus = status) {
    setLoading(true);
    setErr(null);
    try {
      const qs = nextStatus === "ALL" ? "" : `?status=${nextStatus}`;
      const res = await fetch(`/api/brands/${brand.id}/events/list${qs}`);
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setErr(data?.error || "Failed to load events");
        setEvents([]);
        return;
      }
      setEvents(data.events || []);
    } catch {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function togglePublish(eventId: string, next: "DRAFT" | "PUBLISHED") {
    try {
      const res = await fetch(`/api/events/${eventId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        alert(data?.error || "Failed to update status");
        return;
      }
      await fetchEvents();
    } catch {
      alert("Network error");
    }
  }

  const counts = useMemo(() => {
    const draft = events.filter((e) => e.status === "DRAFT").length;
    const pub = events.filter((e) => e.status === "PUBLISHED").length;
    return { draft, pub, total: events.length };
  }, [events]);

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-gray-100">
            {/* If logo is external later, you’ll switch to <img> or allow domains */}
            {brand.logo ? (
              <Image src={brand.logo} alt={brand.name} fill className="object-cover" />
            ) : (
              <div className="h-full w-full" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-gray-900">{brand.name}</h1>
              {brand.verified ? (
                <Badge className="rounded-full bg-gray-900 text-white">Verified</Badge>
              ) : null}
            </div>
            <p className="text-sm text-gray-600">
              {counts.pub} Published • {counts.draft} Drafts
            </p>
          </div>
        </div>

        <Button asChild className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
          <Link href={`/brands/${brand.id}/events/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Create event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["ALL", "PUBLISHED", "DRAFT"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setStatus(k)}
            className={[
              "rounded-full border px-3 py-1.5 text-sm font-bold transition",
              status === k
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
            ].join(" ")}
          >
            {k === "ALL" ? "All" : k === "PUBLISHED" ? "Published" : "Drafts"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-5 space-y-3">
        {loading ? (
          <Card className="rounded-2xl">
            <CardContent className="p-5 text-sm text-gray-600">Loading events…</CardContent>
          </Card>
        ) : err ? (
          <Card className="rounded-2xl border border-rose-200 bg-rose-50">
            <CardContent className="p-5 text-sm text-rose-700">{err}</CardContent>
          </Card>
        ) : events.length === 0 ? (
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-gray-700">No events yet.</p>
              <Button asChild className="mt-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                <Link href={`/brands/${brand.id}/events/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first event
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map((e) => (
            <Card key={e.id} className="rounded-2xl border border-gray-200 bg-white">
              <CardContent className="p-4 sm:p-5">
                <div className="flex gap-4">
                  <div className="relative h-20 w-28 flex-none overflow-hidden rounded-xl bg-gray-100">
                    {/* If imageUrl is external later, switch to <img> or allow domains */}
                    <Image src={e.imageUrl} alt={e.title} fill className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-extrabold text-gray-900">{e.title}</p>
                      <Badge
                        className={
                          e.status === "PUBLISHED"
                            ? "rounded-full bg-gray-900 text-white"
                            : "rounded-full bg-gray-100 text-gray-800"
                        }
                      >
                        {e.status}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                        {e.category}
                      </Badge>
                      <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                        {minPrice(e.ticketTiers)}
                      </Badge>
                    </div>

                    <p className="mt-1 text-xs text-gray-600">
                      {new Date(e.startsAt).toLocaleString()} • {e.locationName},{" "}
                      {e.locationCity}, {e.locationCountry}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild variant="outline" className="rounded-xl border-gray-300">
                        <Link href={`/brands/${brand.id}/events/${e.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="rounded-xl border-gray-300"
                        onClick={() =>
                          togglePublish(e.id, e.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED")
                        }
                      >
                        {e.status === "PUBLISHED" ? (
                          <>
                            <ToggleLeft className="mr-2 h-4 w-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <ToggleRight className="mr-2 h-4 w-4" />
                            Publish
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}
