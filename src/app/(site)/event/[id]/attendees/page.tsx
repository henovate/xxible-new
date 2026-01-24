import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, Users } from "lucide-react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Params = { id: string };
type Gender = "male" | "female";

type Attendee = {
  id: number | string;
  name: string;
  role?: string;
  gender?: Gender;
};

async function getEventById(id: string) {
  if (!id) return null;
  return {
    id: Number(id),
    title: "Neon Friday: Rooftop Party & Live DJ",
    interestedCount: 214,
  };
}

// ✅ Replace with DB fetch: attendees for event id
async function getAttendeesByEventId(eventId: string): Promise<Attendee[]> {
  // mock list (use your DB later)
  return [
    { id: 1, name: "Ladi Yisa", role: "Host", gender: "female" },
    { id: 2, name: "Carla", role: "Member", gender: "female" },
    { id: 3, name: "Becky", role: "Member", gender: "female" },
    { id: 4, name: "Tunde", role: "Member", gender: "male" },
    { id: 5, name: "Ife", role: "Member", gender: "male" },
    { id: 6, name: "Kemi", role: "Insider", gender: "female" },
    { id: 7, name: "Jay", role: "Member", gender: "male" },
    { id: 8, name: "Nne", role: "Member", gender: "female" },
  ];
}

function maskName(name: string) {
  const first = name?.split(" ")?.[0] || "Member";
  return `${first[0]?.toUpperCase() ?? "X"}***`;
}

function chipClass(active: boolean) {
  return [
    "rounded-full px-3 py-1.5 text-sm font-bold border transition",
    active
      ? "bg-gray-900 text-white border-gray-900"
      : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50",
  ].join(" ");
}

export default async function AttendeesPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams?: Promise<{ gender?: string }>;
}) {
  const { id } = await params;
  const sp = (await searchParams) ?? {};
  const genderParam = (sp.gender ?? "all").toLowerCase();

  const event = await getEventById(id);
  if (!event) return notFound();

  const attendees = await getAttendeesByEventId(id);

  // ✅ Wire this later:
  // isUnlocked = user logged-in AND user has attended the event
  const isUnlocked = false;

  const genderFilter: "all" | Gender =
    genderParam === "male" || genderParam === "female" ? (genderParam as Gender) : "all";

  const filtered =
    genderFilter === "all" ? attendees : attendees.filter((a) => a.gender === genderFilter);

  const avatarSrc = "/assets/events/event3.png";

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 sm:py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to event
          </Link>
        </div>

        {/* Title */}
        <div className="mt-5">
          <h1 className="text-[22px] sm:text-[28px] font-extrabold tracking-tight text-gray-900">
            People going
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {event.title} • <span className="font-semibold">{event.interestedCount}</span> going
          </p>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Link href={`/events/${event.id}/attendees`} className={chipClass(genderFilter === "all")}>
              All
            </Link>
            <Link
              href={`/events/${event.id}/attendees?gender=female`}
              className={chipClass(genderFilter === "female")}
            >
              Female
            </Link>
            <Link
              href={`/events/${event.id}/attendees?gender=male`}
              className={chipClass(genderFilter === "male")}
            >
              Male
            </Link>
          </div>

          {!isUnlocked ? (
            <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
              Attend to unlock
              <Users className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>

        {/* Gated banner */}
        {!isUnlocked ? (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 flex items-start gap-3">
            <div className="mt-0.5 h-9 w-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
              <Lock className="h-4 w-4 text-gray-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-gray-900">Profiles are locked</p>
              <p className="mt-1 text-sm text-gray-600">
                XXIBLE only reveals attendee details after you attend, to keep connections safe and relevant.
              </p>
            </div>
          </div>
        ) : null}

        {/* List */}
        <Card className="mt-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-extrabold text-gray-900">
                Showing{" "}
                <span className="text-gray-600 font-bold">
                  {filtered.length}
                </span>{" "}
                {genderFilter === "all" ? "attendees" : `${genderFilter} attendees`}
              </p>

              <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                {genderFilter === "all" ? "All" : genderFilter}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 text-center"
                >
                  <div className="relative mx-auto h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                    <Image
                      src={avatarSrc}
                      alt={a.name}
                      fill
                      className={isUnlocked ? "object-cover" : "object-cover blur-[6px] opacity-80"}
                    />
                    {!isUnlocked ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-7 w-7 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-gray-800" />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <p className="mt-3 text-[13px] sm:text-sm font-extrabold text-gray-900 leading-tight line-clamp-1">
                    {isUnlocked ? a.name : maskName(a.name)}
                  </p>

                  <p className="mt-1 text-[12px] text-gray-500 line-clamp-1">{a.role ?? "Member"}</p>

                  {isUnlocked ? (
                    <Button variant="outline" className="mt-3 w-full rounded-xl border-gray-300 text-xs">
                      View profile
                    </Button>
                  ) : (
                    <Button variant="outline" className="mt-3 w-full rounded-xl border-gray-300 text-xs" disabled>
                      Locked
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="mt-6 text-sm text-gray-600">No attendees found for this filter.</p>
            ) : null}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
