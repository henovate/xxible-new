"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SlidersHorizontal,
  MapPin,
  CalendarDays,
  Ticket,
  Sparkles,
  Building2,
  Users,
  X,
} from "lucide-react";

import Container from "@/components/layout/Container";
import EventCard2 from "@/components/utility/cards/event-card2/EventCard2";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Mode = "events" | "brands";

type EventDataType = any; // Replace with your real EventDataType import if you want strict typing

type Brand = {
  id: number;
  name: string;
  description: string;
  city: string;
  category: string;
  followers: number;
  logo?: string | null;
  verified?: boolean;
};

function Toggle({
  checked,
  onChange,
  label,
  icon,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "w-full flex items-center justify-between rounded-xl border px-3 py-2 transition",
        checked
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-900",
      ].join(" ")}
      aria-pressed={checked}
    >
      <span className="inline-flex items-center gap-2 text-sm font-semibold">
        {icon}
        {label}
      </span>

      <span
        className={[
          "h-6 w-11 rounded-full p-1 transition",
          checked ? "bg-white/25" : "bg-gray-200",
        ].join(" ")}
      >
        <span
          className={[
            "block h-4 w-4 rounded-full transition",
            checked ? "translate-x-5 bg-white" : "translate-x-0 bg-white",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

const allowedCities = ["Lagos", "Abuja", "Port Harcourt", "Owerri", "Aba", "Enugu"] as const;

const eventCategories = [
  "Nightclub",
  "Lounge",
  "Beach Party",
  "Live Music",
  "House Party",
  "Festival",
  "Networking",
] as const;

const priceRanges = [
  { id: "free", label: "Free", min: 0, max: 0 },
  { id: "lt5k", label: "Under ₦5,000", min: 1, max: 4999 },
  { id: "5k-20k", label: "₦5,000 – ₦20,000", min: 5000, max: 20000 },
  { id: "20kplus", label: "₦20,000+", min: 20001, max: Infinity },
] as const;

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {brand.logo ? (
              <Image
                src={brand.logo}
                alt={brand.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="h-11 w-11 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-extrabold">
                {(brand.name?.[0] || "B").toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm sm:text-base font-extrabold text-gray-900 truncate">
                  {brand.name}
                </p>
                {brand.verified ? (
                  <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800 text-[11px]">
                    Verified
                  </Badge>
                ) : null}
              </div>

              <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-2">
                {brand.description}
              </p>
            </div>
          </div>

          <Link href={`/brand/${brand.id}`}>
            <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800">
              View
            </Button>
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
            <Building2 className="h-3.5 w-3.5 mr-1" />
            {brand.category}
          </Badge>
          <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            {brand.city}
          </Badge>
          <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
            <Users className="h-3.5 w-3.5 mr-1" />
            {brand.followers.toLocaleString()} followers
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FindPage() {
  const [mode, setMode] = useState<Mode>("events");

  // Sidebar filter state
  const [city, setCity] = useState<string>("Lagos");
  const [category, setCategory] = useState<string>("all");
  const [price, setPrice] = useState<(typeof priceRanges)[number]["id"]>("5k-20k");
  const [onlyTrending, setOnlyTrending] = useState(false);
  const [onlyThisWeekend, setOnlyThisWeekend] = useState(false);

  // Mobile filters drawer
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Mock dataset — replace with real API/DB results later
  const allEvents: EventDataType[] = useMemo(
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
        brand: { name: "Skyline", description: "Rooftop experiences", logo: null },
        _meta: { trending: true, weekend: true, city: "Lagos" },
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
        _meta: { trending: true, weekend: true, city: "Lagos" },
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
        _meta: { trending: false, weekend: true, city: "Lagos" },
      },
      {
        id: 4,
        title: "Abuja: Private House Party — Invite Only",
        location: "Wuse 2, Abuja",
        date: "Sat, Feb 8",
        time: "10:00 PM",
        price: 20000,
        currency: "₦",
        imageUrl: "/assets/events/event3.png",
        imageAlt: "House party",
        category: "House Party",
        categories: ["House Party", "Invite-only"],
        interestedCount: 89,
        brand: { name: "NightCircle", description: "Curated gatherings", logo: null },
        _meta: { trending: false, weekend: true, city: "Abuja" },
      },
    ],
    []
  );

  const allBrands: Brand[] = useMemo(
    () => [
      {
        id: 11,
        name: "Skyline",
        description: "Premium rooftop experiences and nightlife events in Lagos.",
        city: "Lagos",
        category: "Nightlife",
        followers: 12840,
        verified: true,
      },
      {
        id: 12,
        name: "Wave",
        description: "Beach parties, bonfires, and big social vibes.",
        city: "Lagos",
        category: "Beach",
        followers: 9030,
        verified: false,
      },
      {
        id: 13,
        name: "Velvet",
        description: "Lounges, cocktails, chill nights, curated crowd.",
        city: "Lagos",
        category: "Lounge",
        followers: 4210,
        verified: true,
      },
      {
        id: 14,
        name: "NightCircle",
        description: "Invite-only house parties for people who love premium vibes.",
        city: "Abuja",
        category: "House Party",
        followers: 1720,
        verified: false,
      },
    ],
    []
  );

  const filteredEvents = useMemo(() => {
    return allEvents.filter((ev: any) => {
      const meta = ev._meta || {};
      if (city && meta.city && meta.city !== city) return false;

      if (category !== "all" && ev.category !== category) return false;

      // Price filter
      const selectedRange = priceRanges.find((p) => p.id === price);
      if (selectedRange) {
        const evPrice = Number(ev.price || 0);
        if (selectedRange.id === "free") {
          if (evPrice !== 0) return false;
        } else {
          if (!(evPrice >= selectedRange.min && evPrice <= selectedRange.max)) return false;
        }
      }

      if (onlyTrending && !meta.trending) return false;
      if (onlyThisWeekend && !meta.weekend) return false;

      return true;
    });
  }, [allEvents, city, category, price, onlyTrending, onlyThisWeekend]);

  const filteredBrands = useMemo(() => {
    return allBrands.filter((b) => {
      if (city && b.city !== city) return false;
      if (category !== "all" && b.category !== category) return false;
      if (onlyTrending) {
        // For now: treat verified brands as "trending"
        if (!b.verified) return false;
      }
      return true;
    });
  }, [allBrands, city, category, onlyTrending]);

  const resetFilters = () => {
    setCity("Lagos");
    setCategory("all");
    setPrice("5k-20k");
    setOnlyTrending(false);
    setOnlyThisWeekend(false);
  };

  const resultsCount = mode === "events" ? filteredEvents.length : filteredBrands.length;

  const Filters = ({ compact = false }: { compact?: boolean }) => (
    <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <CardContent className={compact ? "p-4" : "p-5"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gray-700" />
            <p className="text-sm font-extrabold text-gray-900">Filters</p>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-gray-700 hover:text-gray-900"
            type="button"
          >
            Reset
          </button>
        </div>

        {/* City */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-600">City</p>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            {allowedCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-600">
            {mode === "events" ? "Event category" : "Brand category"}
          </p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            <option value="all">All</option>
            {eventCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price (events only) */}
        {mode === "events" ? (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-600">Price</p>
            <div className="mt-2 space-y-2">
              {priceRanges.map((p) => (
                <label
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-gray-900">{p.label}</span>
                  <input
                    type="radio"
                    name="price"
                    value={p.id}
                    checked={price === p.id}
                    onChange={() => setPrice(p.id)}
                    className="h-4 w-4 accent-gray-900"
                  />
                </label>
              ))}
            </div>
          </div>
        ) : null}

        {/* Toggles */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gray-700" />
              <p className="text-sm font-semibold text-gray-900">Trending</p>
            </div>
            <div className="mt-5 space-y-3">
  <Toggle
    checked={onlyTrending}
    onChange={setOnlyTrending}
    label="Trending"
    icon={<Sparkles className="h-4 w-4" />}
  />

  {mode === "events" ? (
    <Toggle
      checked={onlyThisWeekend}
      onChange={setOnlyThisWeekend}
      label="This weekend"
      icon={<CalendarDays className="h-4 w-4" />}
    />
  ) : null}
</div>

          </div>

          {mode === "events" ? (
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-700" />
                <p className="text-sm font-semibold text-gray-900">This weekend</p>
              </div>
              <div className="mt-5 space-y-3">
  <Toggle
    checked={onlyTrending}
    onChange={setOnlyTrending}
    label="Trending"
    icon={<Sparkles className="h-4 w-4" />}
  />

  {mode === "events" ? (
    <Toggle
      checked={onlyThisWeekend}
      onChange={setOnlyThisWeekend}
      label="This weekend"
      icon={<CalendarDays className="h-4 w-4" />}
    />
  ) : null}
</div>

            </div>
          ) : null}
        </div>

        {/* Helpful note */}
        <p className="mt-4 text-xs text-gray-600">
          Tip: Use the search bar in the header to narrow results faster.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-6 sm:pt-8 pb-12">
        <Container>
          {/* Header row */}
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Find your next vibe</p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Find {mode === "events" ? "events" : "brands"}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
                Filter by city, category, and more. Your header search is always available.
              </p>
            </div>

            {/* Mobile filters button */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="rounded-xl border-gray-300"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setMode("events")}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-extrabold transition",
                  mode === "events"
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                Events
              </button>
              <button
                type="button"
                onClick={() => setMode("brands")}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-extrabold transition",
                  mode === "brands"
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                Brands
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                {resultsCount} results
              </Badge>

              {mode === "events" ? (
                <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                  <Ticket className="h-3.5 w-3.5 mr-1" />
                  Pricing
                </Badge>
              ) : (
                <Badge variant="secondary" className="rounded-full bg-gray-100 text-gray-700">
                  <Building2 className="h-3.5 w-3.5 mr-1" />
                  Hosts
                </Badge>
              )}
            </div>
          </div>

          {/* Main layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-[88px]">
                <Filters />
              </div>
            </aside>

            {/* Results */}
            <main className="min-w-0">
              {mode === "events" ? (
                filteredEvents.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredEvents.map((ev: any) => (
                      <EventCard2
                        key={Number(ev.id)}
                        event={ev}
                        cardTag="eventCategory"
                        // clickHandler={(id: number) => {
                        //   window.location.href = `/event/${id}`;
                        // }}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-6">
                      <p className="text-base font-extrabold text-gray-900">No events found</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Try changing city/category/price, or use the search bar above.
                      </p>
                      <div className="mt-4">
                        <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800" onClick={resetFilters}>
                          Reset filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              ) : filteredBrands.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                  {filteredBrands.map((b) => (
                    <BrandCard key={b.id} brand={b} />
                  ))}
                </div>
              ) : (
                <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-base font-extrabold text-gray-900">No brands found</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Try another city/category, or use the header search.
                    </p>
                    <div className="mt-4">
                      <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800" onClick={resetFilters}>
                        Reset filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </main>
          </div>
        </Container>
      </div>

      {/* Mobile filters drawer (simple) */}
      {mobileFiltersOpen ? (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[92%] max-w-[420px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
              <p className="text-sm font-extrabold text-gray-900">Filters</p>
              <button
                className="p-2 text-gray-700"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <Filters compact />
              <Button
                className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Apply filters
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
