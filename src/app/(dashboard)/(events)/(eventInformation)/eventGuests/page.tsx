"use client";

import AttendantCard from '@/components/utility/cards/attendantCard/attendantCard'
import React, { useMemo } from 'react'
import EventInformation from '../eventInformationLayout'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppData } from '@/context/AppDataContext';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data } = useAppData();
  const eventId = searchParams.get('eventId') ?? data.events[0]?.id;
  const event = data.events.find((item) => item.id === eventId) ?? data.events[0];

  const attendees = useMemo(() => {
    if (!event) {
      return [];
    }
    const attendeeIds = data.rsvps.filter((rsvp) => rsvp.eventId === event.id).map((rsvp) => rsvp.userId);
    return data.users
      .filter((user) => attendeeIds.includes(user.id))
      .map((user) => ({
        id: Number(user.id.replace(/\D/g, "").slice(0, 6)) || 0,
        username: user.name,
        image: user.profile.photoUrl || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }));
  }, [data.rsvps, data.users, event]);

  const handleGoBack = () => router.back();

  if (!event) {
    return null;
  }

  return (
    <EventInformation event={event}>
      <div className='border border-[rgb(52,52,52)] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl p-8'>
        <div className="mb-6">
          <p className="text-xl font-[600] text-white">Attendees for {event.title}</p>
          <p className="text-sm text-[#A0A0A0]">{attendees.length} guests have RSVP'd.</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7'>
          {attendees.map((user, i) => (
            <AttendantCard key={i} profile={user} />
          ))}
        </div>

        <div onClick={handleGoBack} className='flex items-center gap-2 mt-10 group w-fit cursor-pointer'>
          <div className='rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] w-fit p-4 group-hover:scale-110 transition'>
            <Icon icon="akar-icons:arrow-back" width="24" height="24" className='h-5 w-5 text-[#F800E9] group-hover:text-[#00baf8] transition' />
          </div>
          <p className='text-base leading-none text-[#f5f5f5] group-hover:text-[#a29f9f]'>Back</p>
        </div>
      </div>
    </EventInformation>
  )
}

export default Page
