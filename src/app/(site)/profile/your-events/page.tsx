"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Heart, History, Ticket } from "lucide-react";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventCard2 from "@/components/utility/cards/event-card2/EventCard2";

type TabKey = "going" | "favorites" | "past";

type EventDataType = any; // replace with your actual EventDataType import if you want strict typing

export default function YourEventsPage() {
  const [tab, setTab] = useState<TabKey>("going");

  // ✅ Mock data (replace later with API fetch: /api/events?type=going etc.)
  const goingEvents: EventDataType[] = useMemo(
    () => [
      {
        id: 101,
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
        brand: { name: "Skyline", description: "Rooftop experiences", logo: null },
      },
      {
        id: 102,
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
    ],
    []
  );

  const favoriteEvents: EventDataType[] = useMemo(
    () => [
      {
        id: 103,
        title: "Lounge Night: Cocktails + Live Sax",
        location: "Lekki Phase 1, Lagos",
        date: "Sun, Feb 9",
        time: "8:00 PM",
        price: 0,
        currency: "₦",
        imageUrl: "/assets/events/event3.png",
        imageAlt: "Lounge cocktails",
        category: "Lounge",
        categories: ["Lounge", "Cocktails", "Live music"],
        interestedCount: 126,
        brand: { name: "Velvet", description: "Cocktails & chill", logo: null },
      },
    ],
    []
  );

  const pastEvents: EventDataType[] = useMemo(
    () => [
      {
        id: 201,
        title: "Afrobeats Thursdays: Club Session",
        location: "Ikeja, Lagos",
        date: "Thu, Jan 12",
        time: "10:00 PM",
        price: 5000,
        currency: "₦",
        imageUrl: "/assets/events/event3.png",
        imageAlt: "Afrobeats club",
        category: "Nightclub",
        categories: ["Nightlife", "Afrobeats"],
        interestedCount: 301,
        brand: { name: "Pulse", description: "Club energy", logo: null },
      },
    ],
    []
  );

  const activeList = tab === "going" ? goingEvents : tab === "favorites" ? favoriteEvents : pastEvents;

  const tabButton = (key: TabKey, label: string, Icon: any) => {
    const isActive = tab === key;
    return (
      <button
        type="button"
        onClick={() => setTab(key)}
        className={[
          "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-extrabold transition",
          isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-50",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" />
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="pt-6 sm:pt-10 pb-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Your activity</p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Your events
              </h1>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                Track what you’re attending, what you’ve saved, and your past vibe history.
              </p>
            </div>

            <Link href="/find">
              <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                <Ticket className="h-4 w-4 mr-2" />
                Find events
              </Button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-5 inline-flex w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
            <div className="flex gap-1">
              {tabButton("going", "Going", CalendarCheck)}
              {tabButton("favorites", "Favorites", Heart)}
              {tabButton("past", "Past", History)}
            </div>
          </div>

          {/* Content */}
          {activeList.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeList.map((ev: any) => (
                <EventCard2
                  key={Number(ev.id)}
                  event={ev}
                  // optional tags (you can change per list)
                  cardTag={tab === "favorites" ? "likes" : "eventCategory"}
                //   clickHandler={(id: number) => {
                //     window.location.href = `/event/${id}`;
                //   }}
                />
              ))}
            </div>
          ) : (
            <Card className="mt-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-6">
                <p className="text-base font-extrabold text-gray-900">Nothing here yet</p>
                <p className="mt-2 text-sm text-gray-600">
                  {tab === "going"
                    ? "RSVP to events and they’ll appear here."
                    : tab === "favorites"
                    ? "Save events you like and they’ll show up here."
                    : "Your past events will appear here once you attend events."}
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Link href="/find">
                    <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                      Find events
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="outline" className="rounded-xl border-gray-300">
                      View profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}
