"use client";

import React, { useMemo, useState } from "react";
import { CalendarPlus, MapPin, CalendarDays, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function truncate(text: string, max = 260) {
  if (!text) return "";
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toICSDate(d: Date) {
  // UTC: YYYYMMDDTHHMMSSZ
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
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

function buildGoogleCalendarUrl(args: {
  title: string;
  startsAtISO: string;
  endsAtISO: string;
  location: string;
  details?: string;
}) {
  const start = new Date(args.startsAtISO);
  const end = new Date(args.endsAtISO);

  // Google calendar wants UTC in YYYYMMDDTHHMMSSZ but without separators
  const dates = `${toICSDate(start)}/${toICSDate(end)}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: args.title,
    dates,
    location: args.location,
    details: args.details ?? "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadICS(args: {
  title: string;
  startsAtISO: string;
  endsAtISO: string;
  location: string;
  details?: string;
}) {
  const start = new Date(args.startsAtISO);
  const end = new Date(args.endsAtISO);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//XXIBLE//Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${args.title}`,
    `LOCATION:${args.location}`,
    args.details ? `DESCRIPTION:${args.details.replace(/\n/g, "\\n")}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "xxible-event.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

export default function EventDetailsClient(props: {
  description: string;
  categories?: string[];
  title: string;
  startsAtISO: string;
  endsAtISO: string;
  venueName: string;
  venueAddress: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(props.venueAddress);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [props.venueAddress]);

  const googleCalUrl = useMemo(() => {
    return buildGoogleCalendarUrl({
      title: props.title,
      startsAtISO: props.startsAtISO,
      endsAtISO: props.endsAtISO,
      location: props.venueAddress,
      details: `Venue: ${props.venueName}`,
    });
  }, [props.title, props.startsAtISO, props.endsAtISO, props.venueAddress, props.venueName]);

  const shownText = expanded ? props.description : truncate(props.description, 320);
  const isLong = (props.description?.length ?? 0) > 320;

  return (
    <div className="space-y-5">
      {/* About */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-extrabold text-gray-900">About this event</h2>
            {isLong ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 underline underline-offset-4"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            ) : null}
          </div>

          <p className="mt-3 text-sm sm:text-[15px] leading-6 text-gray-700 whitespace-pre-line">
            {shownText}
          </p>

          {props.categories?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {props.categories.map((c) => (
                <Badge
                  key={c}
                  variant="secondary"
                  className="rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {c}
                </Badge>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Date & time + Add to calendar */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-extrabold text-gray-900">Date &amp; time</h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-600">Starts</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-gray-900">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                {formatFullDateTime(props.startsAtISO)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-600">Ends</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-gray-900">
                <Clock className="h-4 w-4 text-gray-500" />
                {formatFullDateTime(props.endsAtISO)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
              onClick={() =>
                downloadICS({
                  title: props.title,
                  startsAtISO: props.startsAtISO,
                  endsAtISO: props.endsAtISO,
                  location: props.venueAddress,
                  details: `Venue: ${props.venueName}`,
                })
              }
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to calendar (.ics)
            </Button>

            <Button
              variant="outline"
              className="rounded-xl border-gray-300"
              onClick={() => window.open(googleCalUrl, "_blank", "noopener,noreferrer")}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to Google Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location + map */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg font-extrabold text-gray-900">Location</h2>

          <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-extrabold text-gray-900">{props.venueName}</p>
            <p className="mt-1 text-sm text-gray-700 inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
              <span>{props.venueAddress}</span>
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="rounded-xl border-gray-300"
                onClick={() => window.open(`https://www.google.com/maps?q=${encodeURIComponent(props.venueAddress)}`, "_blank")}
              >
                Open in Maps
              </Button>

              <Button
                variant="outline"
                className="rounded-xl border-gray-300"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(props.venueAddress)}`,
                    "_blank"
                  )
                }
              >
                Directions
              </Button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <iframe
              title="Event map"
              src={mapSrc}
              className="h-[280px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="mt-3 text-xs text-gray-600">
            Map is approximate. Confirm venue details with the host if needed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
