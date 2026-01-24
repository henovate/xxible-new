"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Sparkles,
  Heart,
  CalendarDays,
  ShieldCheck,
  Camera,
  PencilLine,
} from "lucide-react";

import Container from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type LookingTo = "Socialize" | "Make Friends";

type Brand = {
  id: number;
  name: string;
  category: string;
  city: string;
  followers: number;
  verified?: boolean;
  logo?: string | null;
};

function InitialAvatar({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] || "U").toUpperCase();
  return (
    <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-gray-900 text-white flex items-center justify-center font-extrabold text-3xl">
      {initial}
    </div>
  );
}

export default function ProfilePage() {
  const user = useMemo(
    () => ({
      id: "me",
      name: "Henry Ugwoegbu",
      username: "henry",
      location: "Lagos, Nigeria",
      lookingTo: ["Socialize", "Make Friends"] as LookingTo[],
      about:
        "I’m here for good vibes, new people, and unforgettable nights. I love curated events, great music, and connecting with people who match the energy.",
      joinedLabel: "Jan 2026",
      interests: ["Afrobeats", "Nightlife", "Beach", "Live music", "Networking", "Food"],
      profilePhoto: "/assets/events/event3.png",
      photos: Array.from({ length: 6 }).map(() => "/assets/events/event3.png"),
    }),
    []
  );

  const brandsFollowed: Brand[] = useMemo(
    () => [
      { id: 11, name: "Skyline", category: "Nightlife", city: "Lagos", followers: 12840, verified: true },
      { id: 12, name: "Wave", category: "Beach", city: "Lagos", followers: 9030, verified: false },
      { id: 13, name: "Velvet", category: "Lounge", city: "Lagos", followers: 4210, verified: true },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="pt-6 sm:pt-10 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5">
            {/* Left: Identity card */}
            <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-5 sm:p-6">
                {/* Responsive identity layout */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Bigger profile photo */}
                  <div className="flex items-start gap-3">
                    {user.profilePhoto ? (
                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-3xl border border-gray-200 bg-gray-100">
                        <Image
                          src={user.profilePhoto}
                          alt={`${user.name} profile`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <InitialAvatar name={user.name} />
                    )}

                    {/* ✅ On small screens, name can stack under photo */}
                    <div className="min-w-0 sm:hidden">
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-extrabold text-gray-900 leading-tight">
                          {user.name}
                        </p>

                        {/* Verified icon-only on small screens */}
                        <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800 px-2">
                          <ShieldCheck className="h-4 w-4" />
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600">@{user.username}</p>

                      <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {user.location}
                      </div>
                    </div>
                  </div>

                  {/* Desktop+ identity details */}
                  <div className="hidden sm:block min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-extrabold text-gray-900 truncate">
                        {user.name}
                      </p>

                      {/* Full badge on larger screens */}
                      <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800 text-[11px]">
                        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                        Verified
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 truncate">@{user.username}</p>

                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      {user.location}
                    </div>
                  </div>
                </div>

                {/* ✅ Profile actions row (keeps it clean, no gear icon) */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Link href="/account" className="w-full">
                    <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-gray-800">
                      <PencilLine className="h-4 w-4 mr-2" />
                      Edit profile
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-300"
                    type="button"
                  >
                    View public profile
                  </Button>
                </div>

                {/* About */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500">About me</p>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {user.about}
                  </p>
                </div>

                {/* Looking to */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500">I’m looking to</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.lookingTo.map((t) => (
                      <Badge
                        key={t}
                        className="rounded-full bg-gray-900 text-white hover:bg-gray-800"
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500">My Interests</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.interests.map((i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="rounded-full bg-gray-100 text-gray-700"
                      >
                        {i}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Joined */}
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    Joined <span className="text-gray-900">{user.joinedLabel}</span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span>Vibe</span>
                    <span className="text-gray-900">8.7</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right: Gallery + brands */}
            <div className="space-y-5">
              {/* Photo Gallery */}
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">Photo gallery</p>
                      <p className="mt-1 text-xs text-gray-600">
                        People can view your gallery when they see you on an event.
                      </p>
                    </div>

                    <Button variant="outline" className="rounded-xl border-gray-300" type="button">
                      <Camera className="h-4 w-4 mr-2" />
                      Add photos
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {user.photos.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                      >
                        <Image src={src} alt={`photo ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Brands You follow */}
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-gray-900">Brands you follow</p>
                      <p className="mt-1 text-xs text-gray-600">
                        Hosts you love — you’ll get updates when they post events.
                      </p>
                    </div>

                    <Link href="/find?mode=brands">
                      <Button variant="outline" className="rounded-xl border-gray-300">
                        Find brands
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brandsFollowed.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 hover:bg-gray-100 transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-extrabold text-gray-900 truncate">
                                {b.name}
                              </p>
                              {b.verified ? (
                                <Badge className="rounded-full bg-gray-900 text-white hover:bg-gray-800 text-[11px]">
                                  <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                                  Verified
                                </Badge>
                              ) : null}
                            </div>
                            <p className="mt-1 text-xs text-gray-600">
                              {b.category} • {b.city}
                            </p>
                          </div>

                          <Link href={`/brand/${b.id}`}>
                            <Button className="rounded-xl bg-gray-900 text-white hover:bg-gray-800 h-9 px-3">
                              View
                            </Button>
                          </Link>
                        </div>

                        <p className="mt-2 text-xs font-semibold text-gray-700">
                          {b.followers.toLocaleString()} followers
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
