import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  ShieldCheck,
  Share2,
  Users,
  Heart,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AboutEventClient from "./AboutEventClient";
import LocationClient from "./LocationClient";
import PeopleGoingSection from "./PeopleGoingSection";

import TicketModalClient, { TicketTier } from "./TicketModalClient";

const isUnlocked = false;
type Params = { id: string };

async function getEventById(id: string) {
  if (!id) return null;

  const startsAtISO = "2026-02-07T21:00:00+01:00";
  const endsAtISO = "2026-02-08T02:00:00+01:00";

  const people = [
  {
    id: 1,
    name: "Ladi Yisa",
    role: "Insider",
    image: "/assets/people/ladi.jpg", // put a real image in /public/assets/people/
  },
  {
    id: 2,
    name: "Carla Ihenacho",
    image: "/assets/people/carla.jpg",
  },
  {
    id: 3,
    name: "Becky",
    image: "/assets/people/becky.jpg",
  },
  {
    id: 4,
    name: "Tomi",
    image: "/assets/people/tomi.jpg",
  },
  {
    id: 5,
    name: "Jay",
    image: "/assets/people/jay.jpg",
  },
  {
    id: 6,
    name: "Nne",
    image: "/assets/people/nne.jpg",
  },
];
  const ticketTiers: TicketTier[] = [
    {
      id: "free",
      name: "General Admission",
      price: 0,
      currency: "₦",
      note: "Free entry (limited slots).",
      badge: "Free",
    },
    {
      id: "vip",
      name: "VIP Experience",
      price: 15000,
      currency: "₦",
      note: "Priority entry + premium seating zone.",
      badge: "VIP",
    },
    {
      id: "table",
      name: "Table Reservation",
      price: 120000,
      currency: "₦",
      note: "Reserved table for group (includes bottle service).",
      badge: "Table",
    },
  ];

  return {
    id: Number(id),
    title: "Neon Friday: Rooftop Party & Live DJ",
    locationLabel: "Victoria Island, Lagos",
    category: "Nightclub",
    categories: ["Nightlife", "DJ", "Rooftop", "Afrobeats"],
    description:
      "A premium rooftop experience with Afrobeats, live DJ sets, and a high-energy crowd. Dress sharp, come early, and connect with new people through shared vibes. Expect great music, classy energy, and a safe, curated crowd. Arrive early for the best spots and smoother entry. A premium rooftop experience with Afrobeats, live DJ sets, and a high-energy crowd. Dress sharp, come early, and connect with new people through shared vibes. Expect great music, classy energy, and a safe, curated crowd. Arrive early for the best spots and smoother entry. A premium rooftop experience with Afrobeats, live DJ sets, and a high-energy crowd. Dress sharp, come early, and connect with new people through shared vibes. Expect great music, classy energy, and a safe, curated crowd. Arrive early for the best spots and smoother entry. A premium rooftop experience with Afrobeats, live DJ sets, and a high-energy crowd. Dress sharp, come early, and connect with new people through shared vibes. Expect great music, classy energy, and a safe, curated crowd. Arrive early for the best spots and smoother entry. A premium rooftop experience with Afrobeats, live DJ sets, and a high-energy crowd. Dress sharp, come early, and connect with new people through shared vibes. Expect great music, classy energy, and a safe, curated crowd. Arrive early for the best spots and smoother entry. A premium rooftop experience with Afrobeats, live DJ sets, and a high-energy crowd. Dress sharp, come early, and connect with new people through shared vibes. Expect great music, classy energy, and a safe, curated crowd. Arrive early for the best spots and smoother entry.",
    startsAtISO,
    endsAtISO,
    timezoneLabel: "WAT",

    // Main Banner Photo
    imageUrl: "/assets/events/event3.png",
    imageAlt: "Rooftop party",

    // Photo Gallery (placed later in the page)
    gallery: [
      "/assets/events/event3.png",
      "/assets/events/event3.png",
      "/assets/events/event3.png",
      "/assets/events/event3.png",
      "/assets/events/event3.png",
      "/assets/events/event3.png",
    ],

    venue: {
      name: "Skyline Rooftop",
      address: "12A Adeola Odeku, Victoria Island, Lagos",
      city: "Lagos",
      country: "Nigeria",
    },

    host: {
      name: "Skyline",
      description: "Rooftop experiences",
      logo: null as string | null,
      verified: true,
    },

    interestedCount: 214,
    ticketTiers,
  };
}

function formatPrice(price?: number, currency?: string) {
  if (!price || price <= 0) return "Free";
  if (!currency) return price.toLocaleString();
  return `${currency}${price.toLocaleString()}`;
}

function formatFullDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.[0] || "U").toUpperCase();
  return (
    <div className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-extrabold">
      {initial}
    </div>
  );
}

function buildMapEmbed(address: string) {
  const q = encodeURIComponent(address);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export default async function EventPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) return notFound();

  const people = [
    { id: 1, name: "Ada" },
    { id: 2, name: "Tunde" },
    { id: 3, name: "Chioma" },
    { id: 4, name: "Ife" },
    { id: 5, name: "Kemi" },
  ];

  const fullAddress = `${event.venue.address}, ${event.venue.city}, ${event.venue.country}`;
  const mapSrc = buildMapEmbed(fullAddress);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 sm:py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to events
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-xl border-gray-300">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="rounded-xl border-gray-300">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Title + meta */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
              {event.category}
            </Badge>

            {event.host.verified ? (
              <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Verified host
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-3 text-[26px] sm:text-[34px] font-extrabold tracking-tight text-gray-900 leading-tight">
            {event.title}
          </h1>

          <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-gray-700">
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{event.locationLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{formatFullDateTime(event.startsAtISO)}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{event.timezoneLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="font-semibold">{event.interestedCount ?? 0} going</span>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* MAIN (Left) */}
          <div className="lg:col-span-8 space-y-5">
            {/* 1) Main Banner Photo */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image
                    src={event.imageUrl}
                    alt={event.imageAlt || event.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 2) About this event */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
  <CardContent className="p-4 sm:p-6">
    <AboutEventClient
      description={event.description}
      categories={event.categories}
      maxChars={360}
    />
  </CardContent>
</Card>

            {/* 3) People Going */}
            

<PeopleGoingSection
  totalGoing={event.interestedCount ?? people.length}
  people={people} // your existing list (DB later)
  isUnlocked={isUnlocked}
  avatarSrc="/assets/events/event3.png"
  fullListHref={`/events/${event.id}/attendees`} // optional fallback route
  // onAttendClick={() => {
  //   // Hook this to your ticket modal open / attend flow later.
  //   // For now it can do nothing; but modal will show "Attend to unlock" button.
  // }}
/>;

            {/* 4) Location */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
  <CardContent className="p-4 sm:p-6">
    <h2 className="text-lg font-extrabold text-gray-900">Location</h2>

    <LocationClient
      venueName={event.venue.name}
      fullAddress={`${event.venue.address}, ${event.venue.city}, ${event.venue.country}`}
    />
  </CardContent>
</Card>

            {/* 5) Photo Gallery */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-extrabold text-gray-900">Photo gallery</h2>
                  <Link
                    href="#"
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900 underline underline-offset-4"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {event.gallery?.slice(0, 6).map((src: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                    >
                      <Image src={src} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* SIDEBAR (Right) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="lg:sticky lg:top-6 space-y-5">
              {/* Hosted By */}
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg font-extrabold text-gray-900">Hosted by</h2>

                  <div className="mt-4 flex items-start gap-3">
                    {event.host.logo ? (
                      <Image
                        src={event.host.logo}
                        alt={event.host.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <InitialAvatar name={event.host.name} />
                    )}

                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-gray-900 leading-none">{event.host.name}</p>
                      <p className="mt-1 text-sm text-gray-700">{event.host.description}</p>
                      {event.host.verified ? (
                        <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <ShieldCheck className="h-4 w-4" />
                          Verified host
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" className="rounded-xl border-gray-300">
                      View profile
                    </Button>
                    <Button variant="outline" className="rounded-xl border-gray-300">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Info + Attend modal */}
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900">Ticket info</h2>
                      <p className="mt-1 text-xs text-gray-600">
                        Choose a tier + quantity. Free events can still have VIP / Table options.
                      </p>
                    </div>
                    <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                      {event.ticketTiers?.length ?? 0} tiers
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2">
                    {/* Client modal trigger */}
                    <TicketModalClient
                      eventTitle={event.title}
                      tiers={event.ticketTiers}
                      startsAtISO={event.startsAtISO}
                      endsAtISO={event.endsAtISO}
                      venueAddress={fullAddress}
                      currencyFallback={event.ticketTiers?.[0]?.currency || "₦"}
                    />

                    <Button variant="outline" className="w-full rounded-xl border-gray-300">
                      Invite friends
                    </Button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold text-gray-600">Starting from</p>
                    <p className="mt-1 text-xl font-extrabold text-gray-900">
                      {formatPrice(
                        Math.min(...(event.ticketTiers?.map((t) => t.price) ?? [0])),
                        event.ticketTiers?.[0]?.currency
                      )}
                    </p>
                  </div>

                  <p className="mt-3 text-xs text-gray-600">
                    After Attend, you’ll unlock attendee profiles and can connect with people going.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
