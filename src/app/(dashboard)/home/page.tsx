"use client";

import EventCard2 from "@/components/utility/cards/event-card2/eventCard2";
import { nextEventList } from "../components/nextEventCard/next-events";
import UpcomingEventCard from "@/components/utility/cards/upcoming-event-card/upcomingEventCard";
import NextEventCard from "../components/nextEventCard/nextEventCard";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContext";
import { useMemo } from "react";

const page = () => {
  const { data, currentUser } = useAppData();

  const eventsWithCounts = useMemo(() => {
    return data.events.map((event) => ({
      ...event,
      interestedCount: data.rsvps.filter((rsvp) => rsvp.eventId === event.id).length,
    }));
  }, [data.events, data.rsvps]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[70%_1fr] 2xl:grid-cols-[75%_1fr]">
      {/* Left partition */}
      <div className="border-r-2 border-[#343434]">
        <div className="p-5 lg:p-7">
          <div>
            <p className="text-[#F5F5F5] font-[600] text-xl sm:text-2xl lg:text-xl">Good evening{currentUser ? `, ${currentUser.name}` : ""}</p>
            <p className="text-[#A0A0A0] text-sm sm:text-base mt-1">Find the next vibe for your weekend.</p>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-[#F5F5F5] font-[600] text-xl sm:text-2xl lg:text-xl">Featured events</p>
              <Link href="/events" className="text-[#007AFF] text-sm font-[500]">See all</Link>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventsWithCounts.slice(0, 2).map((_event) => (
                <EventCard2 key={_event.id} event={_event} cardTag="likes" />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <p className="text-[#F5F5F5] font-[600] text-xl sm:text-2xl lg:text-xl">Upcoming events</p>
              <Link href="/events" className="text-[#007AFF] text-sm font-[500]">Explore</Link>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventsWithCounts.slice(2, 4).map((_event) => (
                <EventCard2 key={_event.id} event={_event} cardTag="latest" />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[#F5F5F5] font-[600] text-xl sm:text-2xl lg:text-xl mt-4">Your next events</p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nextEventList.map((_event, index) => (
                <NextEventCard key={index} event={_event} />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[#F5F5F5] font-[600] text-xl sm:text-2xl lg:text-xl">Discover more</p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventsWithCounts.slice(4).map((_event) => (
                <EventCard2 key={_event.id} event={_event} cardTag="latest" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right partition */}
      <div className="p-4 lg:p-5">
        <div className="bg-[#202222] border border-[#343434] rounded-xl p-4">
          <p className="text-[#F5F5F5] font-[600] text-sm mb-3">Your RSVP status</p>
          {currentUser ? (
            <div className="space-y-2 text-sm text-[#A0A0A0]">
              <p>Logged in as <span className="text-white">{currentUser.name}</span></p>
              <p>You have RSVPed to {data.rsvps.filter((rsvp) => rsvp.userId === currentUser.id).length} events.</p>
            </div>
          ) : (
            <p className="text-sm text-[#A0A0A0]">Log in to track your RSVPs.</p>
          )}
        </div>

        <div className="mt-6">
          <p className="font-[600] text-sm text-[#F5F5F5]">Top 10 Upcoming events </p>
        </div>

        <div className="mt-6">
          {eventsWithCounts.slice(0, 5).map((_event, index)=>(			
            <UpcomingEventCard key={index} 
                  event={_event} 
                  eventNumber={Number(index + 1)} 
                />
          ))}	
        </div>
      </div>
    </div>
  )
}

export default page;
