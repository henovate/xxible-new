"use client";

import { Heart, Clock, Users, MapPin, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import placeholderImg from "../../../../../public/assets/events/event3.png";
import { EventDataType } from "./type/eventDataType";
import "../../../../../public/styles/main.css";

interface EventCardProps {
  event: EventDataType;
  cardTag?: "likes" | "latest" | "eventCategory";
}

export default function EventCard2({ event, cardTag }: EventCardProps) {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const goToEvent = () => {
    router.push(`/event/${Number(event.id)}`);
  };

  const formatPrice = (price?: number, currency?: string) => {
    if (price === 0) return "Free";
    if (!price || !currency) return "Free";
    return `${currency}${price.toLocaleString()}`;
  };

  const title = useMemo(() => {
    const t = event?.title || "Untitled Event";
    return t.length > 60 ? `${t.slice(0, 60)}…` : t;
  }, [event?.title]);

  const brandLine = useMemo(() => {
    if (!event?.brand?.name) return "";
    const desc = event?.brand?.description || "";
    const short = desc.length > 38 ? `${desc.slice(0, 38)}…` : desc;
    return short ? `${event.brand.name} — ${short}` : event.brand.name;
  }, [event?.brand?.name, event?.brand?.description]);

  const topLeftPill =
    cardTag === "latest" ? "Latest" : cardTag === "eventCategory" ? event?.category : null;

  return (
    <Card className="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
      {/* Image */}
      <div onClick={goToEvent} className="relative cursor-pointer">
        <div className="relative h-[220px] sm:h-[270px] lg:h-[290px] w-full">
          <Image
            src={event?.imageUrl || placeholderImg}
            alt={event?.imageAlt || event?.title || "Event image"}
            fill
            className="object-cover"
            priority
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent" />

          {/* Tag pill */}
          {topLeftPill && (
            <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {topLeftPill}
            </div>
          )}

          {/* Like button */}
          {cardTag === "likes" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation(); // 🚫 prevent navigation
                setIsFavorited((s) => !s);
              }}
              className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md"
            >
              <Heart
                className={[
                  "h-5 w-5 transition-colors",
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-700",
                ].join(" ")}
              />
            </Button>
          )}
        </div>
      </div>

      <CardContent className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-[17px] sm:text-[18px] lg:text-[20px] font-bold text-gray-900 leading-snug">
          {title}
        </h3>

        {/* Address */}
        <div className="mt-2 flex items-center gap-2 text-gray-700">
          <MapPin className="h-4 w-4 shrink-0 text-gray-500" />
          <p className="text-[13px] sm:text-[14px] font-medium line-clamp-1">
            {event?.location || "Location TBA"}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-4 space-y-3">
          {/* Date & Time */}
          <div className="flex items-start gap-2 text-gray-800">
            <Clock className="h-4 w-4 mt-[2px] shrink-0 text-gray-500" />
            <p className="text-[13px] sm:text-[14px] font-semibold leading-snug">
              {event?.date
                ? `${event.date}${event?.time ? `, ${event.time}` : ""}`
                : "Date/Time TBA"}
            </p>
          </div>

          {/* Price + Attending */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <div className="flex items-center gap-2 text-gray-800">
              <Ticket className="h-4 w-4 shrink-0 text-gray-500" />
              <p className="text-[13px] sm:text-[14px] font-semibold">
                {formatPrice(event?.price, event?.currency)}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-800 sm:justify-end">
              <Users className="h-4 w-4 shrink-0 text-gray-500" />
              <p className="text-[13px] sm:text-[14px] font-semibold">
                {typeof event?.attendingCount === "number"
                  ? `${event.attendingCount} Attending`
                  : "Attending: —"}
              </p>
            </div>
          </div>
        </div>

        {/* Host */}
        {brandLine && (
          <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold shrink-0">
              {event?.brand?.logo ? (
                <Image
                  src={event.brand.logo}
                  alt={`${event.brand.name} logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                (event?.brand?.name?.[0] || "B").toUpperCase()
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs text-gray-500">Host</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {brandLine}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
