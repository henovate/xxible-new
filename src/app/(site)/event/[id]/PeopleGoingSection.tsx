"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import AttendeesModalClient, { Attendee } from "./AttendeesModalClient";

type Person = {
  id: number | string;
  name: string;
  role?: string;
  gender?: "male" | "female";
};

function MiniPersonCard({ p, avatarSrc }: { p: Person; avatarSrc: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm px-3 py-4 flex flex-col items-center text-center">
      <div className="relative h-14 w-14 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
        <Image src={avatarSrc} alt={p.name} fill className="object-cover" />
      </div>

      {p.role ? (
        <span className="mt-2 inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-[11px] font-bold">
          {p.role}
        </span>
      ) : (
        <div className="mt-2 h-[18px]" />
      )}

      <p className="mt-2 text-[13px] font-extrabold text-gray-900 leading-tight line-clamp-1">{p.name}</p>
      <p className="mt-1 text-[12px] text-gray-500 line-clamp-1">{p.role ? "Organizer" : "Member"}</p>
    </div>
  );
}

function PersonCard({ p, avatarSrc }: { p: Person; avatarSrc: string }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm px-4 py-5 lg:px-6 lg:py-6 flex flex-col items-center text-center">
      <div className="relative h-16 w-16 lg:h-20 lg:w-20 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
        <Image src={avatarSrc} alt={p.name} fill className="object-cover" />
      </div>

      <p className="mt-4 text-sm lg:text-base font-extrabold text-gray-900 leading-tight line-clamp-1">{p.name}</p>
      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{p.role ?? "Member"}</p>
    </div>
  );
}

function MoreCard({
  remaining,
  avatarSrc,
  stackCount = 3,
}: {
  remaining: number;
  avatarSrc: string;
  stackCount?: number;
}) {
  const bubbles = Array.from({ length: stackCount });

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6 flex flex-col items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,#111827,transparent_45%),radial-gradient(circle_at_80%_70%,#4f46e5,transparent_50%)]" />

      <div className="relative z-10 flex -space-x-2">
        {bubbles.map((_, idx) => (
          <div
            key={idx}
            className="relative h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden border-2 border-white bg-gray-100"
          >
            <Image src={avatarSrc} alt="Attendee" fill className="object-cover" />
          </div>
        ))}

        <div className="h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-extrabold border-2 border-white text-[12px] sm:text-[13px] lg:text-sm">
          +{Math.max(remaining, 0)}
        </div>
      </div>

      <p className="relative z-10 mt-3 text-[13px] sm:text-sm lg:text-base font-extrabold text-gray-900">
        More
      </p>
      <p className="relative z-10 mt-1 text-[12px] sm:text-[12px] lg:text-sm text-gray-600">
        {remaining > 0 ? `${remaining} others` : "See all"}
      </p>

      <span className="relative z-10 mt-3 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-[12px] sm:text-[12px] lg:text-sm font-semibold text-gray-900 hover:bg-gray-50">
        View
      </span>
    </div>
  );
}

export default function PeopleGoingSection({
  totalGoing,
  people,
  isUnlocked,
  avatarSrc = "/assets/events/event3.png",
  fullListHref = "#",
  onAttendClick,
}: {
  totalGoing: number;
  people: Person[];
  isUnlocked: boolean;
  avatarSrc?: string;
  fullListHref?: string;
  onAttendClick?: () => void;
}) {
  const mobileShown = people.slice(0, 2);
  const desktopShown = people.slice(0, 3);

  const mobileRemaining = Math.max(totalGoing - mobileShown.length, 0);
  const desktopRemaining = Math.max(totalGoing - desktopShown.length, 0);

  const attendees: Attendee[] = people.map((p) => ({
    id: p.id,
    name: p.name,
    role: p.role,
    gender: p.gender,
  }));

  return (
    <section>
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">People Going</h2>
          <span className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-extrabold text-gray-900">
            {totalGoing}
          </span>
        </div>

        {/* See all opens modal */}
        <AttendeesModalClient
          attendees={attendees}
          totalGoing={totalGoing}
          isUnlocked={isUnlocked}
          avatarSrc={avatarSrc}
          fullListHref={fullListHref}
          onAttendClick={onAttendClick}
          trigger={
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              See all
            </button>
          }
        />
      </div>

      {/* Mobile: 2 people + more (3 columns) */}
      <div className="mt-4 grid grid-cols-3 gap-3 sm:hidden">
        {mobileShown.map((p) => (
          <MiniPersonCard key={p.id} p={p} avatarSrc={avatarSrc} />
        ))}

        <AttendeesModalClient
          attendees={attendees}
          totalGoing={totalGoing}
          isUnlocked={isUnlocked}
          avatarSrc={avatarSrc}
          fullListHref={fullListHref}
          onAttendClick={onAttendClick}
          trigger={<MoreCard remaining={mobileRemaining} avatarSrc={avatarSrc} stackCount={2} />}
        />
      </div>

      {/* Tablet/Desktop: 3 people + more (single row of 4) */}
      <div className="mt-4 hidden sm:grid sm:grid-cols-4 gap-4">
        {desktopShown.map((p) => (
          <PersonCard key={p.id} p={p} avatarSrc={avatarSrc} />
        ))}

        <AttendeesModalClient
          attendees={attendees}
          totalGoing={totalGoing}
          isUnlocked={isUnlocked}
          avatarSrc={avatarSrc}
          fullListHref={fullListHref}
          onAttendClick={onAttendClick}
          trigger={<MoreCard remaining={desktopRemaining} avatarSrc={avatarSrc} stackCount={3} />}
        />
      </div>
    </section>
  );
}
