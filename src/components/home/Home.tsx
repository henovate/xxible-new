"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import {
  Flame,
  TrendingUp,
  CalendarDays,
  MapPin,
  Users,
  MessageCircle,
  Heart,
  Plus,
  Settings,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/layout/Container";
import EventCard2 from "@/components/utility/cards/event-card2/EventCard2";
import { eventsData } from "@/components/utility/cards/event-card2/events";

// If you already have shadcn/ui:
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type EventDataType = any; // <-- keep as-is if you already export EventDataType type elsewhere

type TrendingItem = {
  id: number;
  title: string;
  subtitle: string;
  city: string;
  attending: number;
  image: string; // public path or remote url
  tag: string;
};

type Person = {
  id: number;
  name: string;
  city: string;
  avatar?: string | null;
  mutualEventTitle: string;
  mutualCount: number;
  interests: string[];
};

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.[0] || "U").toUpperCase();
  return (
    <div className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-extrabold">
      {initial}
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:block w-[260px] shrink-0">
      <div className="sticky top-[84px]">
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <h2 className="mt-1 text-base font-extrabold text-gray-900 tracking-tight">
              Henry Ugwoegbu
            </h2>

            <nav className="mt-4 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-100"
              >
                <Flame className="h-4 w-4" />
                Home
              </Link>

              <Link
                href="/find"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <CalendarDays className="h-4 w-4" />
                Find Events
              </Link>
            </nav>

            <div className="mt-5">
              <Link href="/add-event">
                <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4">
          <p className="text-sm font-extrabold text-gray-900">
            Your Upcoming Events
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Your next confirmed event
          </p>

          <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <p className="text-xs text-gray-600">Next event</p>
            <p className="mt-1 text-sm font-bold text-gray-900 line-clamp-2">
              Neon Friday: Rooftop Party & Live DJ
            </p>
            <div className="mt-2 flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-gray-500" />
              <p className="text-xs font-semibold">Victoria Island, Lagos</p>
            </div>
          </div>

          <Link href="/my-rsvps" className="block mt-3">
            <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800">
              View Event
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
}

function TrendingCard({ item }: { item: TrendingItem }) {
  return (
    <Link href={`/event/${item.id}`} className="block">
      <div className="group w-[280px] sm:w-[320px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
        <div className="relative h-[150px] w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {item.tag}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-white text-[15px] font-extrabold leading-snug line-clamp-2">
              {item.title}
            </p>
            <p className="mt-1 text-white/85 text-xs line-clamp-1">
              {item.subtitle}
            </p>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-gray-700">
              <MapPin className="h-4 w-4 text-gray-500" />
              <p className="text-[12px] font-semibold line-clamp-1">
                {item.city}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-gray-700">
              <Users className="h-4 w-4 text-gray-500" />
              <p className="text-[12px] font-semibold">{item.attending}</p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[12px] font-semibold text-gray-900">
              See details
            </p>
            <ArrowRight className="h-4 w-4 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  // Mock trending (replace with real query: order by rsvp_count / views / likes)
  const trending: TrendingItem[] = useMemo(
    () => [
      {
        id: 101,
        title: "Neon Friday: Rooftop Party + Live DJ",
        subtitle: "Rooftop • Afrobeats • Late night vibes",
        city: "Victoria Island, Lagos",
        attending: 412,
        image: "/assets/events/event3.png",
        tag: "Trending",
      },
      {
        id: 102,
        title: "Beach Rave: Bonfire + Afrobeats",
        subtitle: "Beach • Bonfire • Social connection",
        city: "Landmark Beach, Lagos",
        attending: 585,
        image: "/assets/events/event3.png",
        tag: "Hot this weekend",
      },
      {
        id: 103,
        title: "Lounge Experience: Cocktail Night",
        subtitle: "Lounge • Cocktails • Chill vibe",
        city: "Lekki Phase 1, Lagos",
        attending: 233,
        image: "/assets/events/event3.png",
        tag: "Editors pick",
      },
    ],
    [],
  );

  // Mock events for Lagos section (MUST match what EventCard2 expects)
  // Replace with real events from DB later.
  const lagosEvents: EventDataType[] = useMemo(
    () => [
      {
        id: 1,
        title: "Neon Friday: Rooftop Party & Live DJ",
        location: "Victoria Island, Lagos",
        date: "Fri, Feb 7",
        time: "9:00 PM",
        price: 10000,
        currency: "₦",
        imageUrl: "/assets/events/event3.png",
        imageAlt: "Rooftop party",
        category: "Nightclub",
        categories: ["Nightlife", "DJ", "Rooftop", "Afrobeats"],
        interestedCount: 214,
        brand: {
          name: "Skyline",
          description: "Rooftop experiences",
          logo: null,
        },
      },
      {
        id: 2,
        title: "Beach Rave: Bonfire + Afrobeats",
        location: "Landmark Beach, Lagos",
        date: "Sat, Feb 8",
        time: "6:00 PM",
        price: 8000,
        currency: "₦",
        imageUrl: "/assets/events/event3.png",
        imageAlt: "Beach rave",
        category: "Beach Party",
        categories: ["Beach", "Bonfire", "Afrobeats"],
        interestedCount: 389,
        brand: { name: "Wave", description: "Beach events & more", logo: null },
      },
      {
        id: 3,
        title: "Lounge Experience: Cocktail Night",
        location: "Lekki Phase 1, Lagos",
        date: "Sun, Feb 9",
        time: "7:30 PM",
        price: 0,
        currency: "₦",
        imageUrl: "/assets/events/event3.png",
        imageAlt: "Cocktail lounge",
        category: "Lounge",
        categories: ["Lounge", "Cocktails", "Chill"],
        interestedCount: 126,
        brand: { name: "Velvet", description: "Cocktails & chill", logo: null },
      },
    ],
    [],
  );

  const people: Person[] = useMemo(
    () => [
      {
        id: 11,
        name: "Ada",
        city: "Lagos",
        mutualEventTitle: "Neon Friday: Rooftop Party & Live DJ",
        mutualCount: 2,
        interests: ["Nightlife", "Afrobeats", "Lounge"],
      },
      {
        id: 12,
        name: "Tunde",
        city: "Lagos",
        mutualEventTitle: "Beach Rave: Bonfire + Afrobeats",
        mutualCount: 1,
        interests: ["Beach", "Parties", "Networking"],
      },
      {
        id: 13,
        name: "Chioma",
        city: "Lagos",
        mutualEventTitle: "Lounge Experience: Cocktail Night",
        mutualCount: 3,
        interests: ["Cocktails", "Chill", "Live Music"],
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full width background area */}
      <div className="pt-6 sm:pt-8 pb-12">
        <Container>
          <div className="flex items-start gap-6">
            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <main className="min-w-0 flex-1">
              {/* Top intro / quick actions */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Welcome back Henry
                  </h1>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
                    See what’s trending, find events in around you, and connect
                    with people attending the same events.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/find">
                    <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                      Find Events
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/connect">
                    <Button
                      variant="outline"
                      className="rounded-xl border-gray-300 text-gray-900 hover:bg-white"
                    >
                      Connect
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Professional Trending */}
              <section className="mt-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-700" />
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                      Trending Events
                    </h2>
                  </div>

                  <Link
                    href="/events"
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                  >
                    See all
                  </Link>
                </div>

                <div className="mt-4 flex gap-4 overflow-x-auto pb-2 pr-1">
                  {trending.map((t) => (
                    <TrendingCard key={t.id} item={t} />
                  ))}
                </div>

                {/* Quick filters (optional) */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Nightclubs",
                    "Lounges",
                    "Beach",
                    "Live music",
                    "House party",
                  ].map((f) => (
                    <Badge
                      key={f}
                      variant="secondary"
                      className="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Events in Lagos - uses YOUR EventCard2 */}
              <section className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    Events in Lagos
                  </h2>

                  <Link
                    href="/events?city=lagos"
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {eventsData.map((_event, i) => (
                    <EventCard2 key={i} event={_event} cardTag="likes" />
                  ))}
                </div>
              </section>

              {/* Connect with others + Right column panel on large screens */}
              <section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Connect list */}
                <div className="xl:col-span-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                      Connect with others
                    </h2>

                    <Link
                      href="/connect"
                      className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                    >
                      See more
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {people.map((p) => (
                      <Card
                        key={p.id}
                        className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              {p.avatar ? (
                                <Image
                                  src={p.avatar}
                                  alt={p.name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                />
                              ) : (
                                <InitialAvatar name={p.name} />
                              )}

                              <div className="min-w-0">
                                <p className="text-sm font-extrabold text-gray-900 leading-none">
                                  {p.name}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                  {p.city}
                                </p>
                              </div>
                            </div>

                            <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                          </div>

                          <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-3">
                            <p className="text-xs text-gray-600">
                              You both RSVP’d:
                            </p>
                            <p className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">
                              {p.mutualEventTitle}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {p.mutualCount} more shared RSVP(s)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}
