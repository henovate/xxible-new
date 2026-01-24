"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, Users } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import GenderFilterChips, { GenderFilter } from "./GenderFilterChips";

export type Attendee = {
  id: number | string;
  name: string;
  role?: string; // e.g. Host, Insider, Member
  gender?: "male" | "female"; // for filter
};

function maskName(name: string) {
  if (!name) return "XXIBLE Member";
  const first = name.split(" ")[0] ?? "Member";
  return `${first[0]?.toUpperCase() ?? "X"}***`;
}

export default function AttendeesModalClient({
  trigger,
  attendees,
  totalGoing,
  isUnlocked,
  avatarSrc = "/assets/events/event3.png",
  fullListHref = "#",
  onAttendClick,
}: {
  trigger: React.ReactNode; // the "See all" or "View" button/link UI
  attendees: Attendee[];
  totalGoing: number;
  isUnlocked: boolean; // ✅ attend-gated mode
  avatarSrc?: string;
  fullListHref?: string;
  onAttendClick?: () => void;
}) {
  const [gender, setGender] = useState<GenderFilter>("all");

  const filtered = useMemo(() => {
    if (gender === "all") return attendees;
    return attendees.filter((a) => a.gender === gender);
  }, [attendees, gender]);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[760px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-extrabold">
            People going <span className="text-gray-500 font-bold">({totalGoing})</span>
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">
            Filter who you want to see. {isUnlocked ? "You can view profiles." : "Attend to unlock profiles & connections."}
          </p>
        </DialogHeader>

        {/* Filter + actions row */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <GenderFilterChips value={gender} onChange={setGender} />

          <div className="flex gap-2">
            <Link href={fullListHref} className="inline-flex">
              <Button variant="outline" className="rounded-xl border-gray-300">
                Open full list
              </Button>
            </Link>

            {!isUnlocked ? (
              <Button
                className="rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                onClick={() => onAttendClick?.()}
              >
                Attend to unlock
                <Users className="ml-2 h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>

        {/* Gated notice */}
        {!isUnlocked ? (
          <div className="mt-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 flex items-start gap-3">
            <div className="mt-0.5 h-9 w-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
              <Lock className="h-4 w-4 text-gray-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold text-gray-900">Profiles are locked</p>
              <p className="mt-1 text-sm text-gray-600">
                To keep things safe and relevant, XXIBLE only reveals attendee details after you attend.
              </p>
            </div>
          </div>
        ) : null}

        {/* Attendees grid */}
        <div className="mt-4 max-h-[62vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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

                <p className="mt-1 text-[12px] text-gray-500 line-clamp-1">
                  {a.role ?? "Member"}
                </p>

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
            <p className="mt-6 text-sm text-gray-600">
              No attendees found for this filter.
            </p>
          ) : null}
        </div>

        {/* Footer hint */}
        <div className="mt-4 text-xs text-gray-600">
          Tip: Filters work best when attendee gender is saved in profile.
        </div>
      </DialogContent>
    </Dialog>
  );
}
