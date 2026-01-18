"use client";

import TicketCard from '@/components/utility/cards/ticketCard/ticketCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Clock, Ticket } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import AttendantCard from '@/components/utility/cards/attendantCard/attendantCard';
import { previewImages, socialData } from '@/components/utility/cards/attendantCard/data';
import MultipleAttendCard from '@/components/utility/cards/multipleAttendCard/multipleAttendCard';
import SocialMediaCard from '@/components/utility/cards/socialMediaCard/socialMediaCard';
import EventInformationLayout from '../eventInformationLayout';
import { tickets } from '../data';
import Link from 'next/link';
import { useAppData } from '@/context/AppDataContext';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const { data, currentUser, toggleRsvp } = useAppData();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [notice, setNotice] = useState<string | null>(null);

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

  const isRsvped = Boolean(
    currentUser && event && data.rsvps.some((rsvp) => rsvp.eventId === event.id && rsvp.userId === currentUser.id)
  );

  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
  };

  const handleToggleRsvp = () => {
    if (!event) {
      return;
    }
    const result = toggleRsvp(event.id);
    if (!result.ok) {
      setNotice(result.error);
      return;
    }
    setNotice(null);
  };

  if (!event) {
    return null;
  }

  return (
    <EventInformationLayout event={event} isRsvped={isRsvped} onToggleRsvp={handleToggleRsvp}>
      <div>
        {notice ? (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {notice}
          </div>
        ) : null}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_40%] bg-[#202222] border border-[#343434] p-5 lg:py-6 lg:pl-6 lg:pr-16 rounded-xl gap-[5.3rem shadow-[0_0_20px_rgba(0,0,0,0.5)]'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Icon icon="solar:user-linear" width="24" height="24" className='h-5 w-5 text-[#A2A2A2]' />
              <p className='font-[500] leading-none text-base'>Host</p>
            </div>
            <p className='font-[500] leading-none text-sm'>{event.hostName} - {event.hostDescription}</p>
            <p className='font-[600] leading-none text-[#0866FF] text-sm'>View Profile and Past event</p>
          </div>


          <div className='sm:pl-6 lg:pl-4 mt-8 sm:mt-0'>
            <div className='flex items-center gap-2'>
              <Icon icon="formkit:time" width="16" height="16" className='h-5 w-5 text-[#A2A2A2]' />
              <p className='font-[500] leading-none text-base'>Date and time</p>
            </div>
            <p className='font-[500] leading-none text-sm mt-3'>{event.date}</p>
            <p className='font-[500] leading-none text-sm mt-1'>{event.time}</p>
            <p className='font-[600] leading-none text-[#0866FF] mt-2 text-sm'>+ Add to Calendar</p>
          </div>


          <div className='mt-8 md:mt-0'>
            <div className='flex items-center gap-2'>
              <Icon icon="tdesign:location" width="24" height="24" className='h-5 w-5 text-[#A2A2A2]' />
              <p className='font-[500] leading-none text-base'>Venue</p>
            </div>
            <p className='font-[500] leading-4 text-sm mt-3 w-[14rem] lg:w-[19rem]'>{event.venue}</p>
          </div>
        </div>

        <div className='mt-5 mb-8'>
          <div className='relative w-full h-[40.6rem] bg-black/40 bg-blend-overlay'>
            <Image src={event.imageUrl} width={572.42} height={649.59} alt={event.imageAlt} className='w-full h-full object-cover rounded-xl' />

            <div className='absolute w-full h-full top-0 left-0 flex flex-col justify-end'>
              <button
                onClick={handleFavoriteToggle}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-white/20 rounded-full shadow-md flex justify-center items-center cursor-pointer"
              >
                <Icon
                  icon="solar:heart-angle-bold" width="24" height="24"
                  className={`w-4 h-4 sm:w-7 sm:h-7 transition-colors ${
                    isFavorited ? "fill-[#F800E9] text-[#F800E9]" : "text-[#f5f5f5]"
                  }`}
                />
              </button>
              <div>
                <div className='bg-black/20 backdrop-blur-md px-5 py-4 md:px-10 md:py-7'>
                  <p className='font-[600] text-2xl leading-7'>{event.title}</p>
                  <div className='flex flex-wrap gap-3 md:gap-5 items-center mt-3 xl:mt-4'>
                    {event.categories.map((item, i) => (
                      <div
                        key={i}
                        className={`px-3 py-1 lg:py-2 rounded-full text-[0.7rem] lg:text-[0.94rem] font-[500] whitespace-nowrap w-fit border border-[#83838312] text-[#A0A0A0] bg-white/5 backdrop-blur-sm`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#232323] pt-7 pb-5">
            <div className='px-6'>
              <p className='font-[600] text-2xl leading-none'>About This Event</p>
              <div className='font-[400] text-[0.95rem] leading-5 text-[#A0A0A0] mt-8 space-y-4'>
                <div>
                  <p>{event.description}</p>
                </div>

                <div>
                  <p>Limited slots available — RSVP now to secure entry</p>
                </div>
              </div>
            </div>

            <div className='border-t-2 border-[#343434] mt-4'></div>

            <div className='px-6 mt-5 md:flex justify-between items-center'>
              <div className='md:flex items-center gap-6 font-[500] text-[#A0A0A0] mb-5 md:mb-0 space-y-5 md:space-y-0'>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {event.date}, {event.time}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Ticket className="w-4 h-4" />
                  <span>{event.price === 0 ? "Free" : `${event.currency}${event.price.toLocaleString()}`}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Icon icon="solar:heart-angle-bold" width="24" height="24" className="w-5 h-5 fill-[#F800E9] text-[#F800E9]" />
                  <span>{attendees.length} Going</span>
                </div>
              </div>

              <div className='rounded-lg flex items-center justify-center gap-2 px-3 py-4 bg-[#F800E912] font-[400] text-[#f5f5f5] '>
                <Icon icon="mage:stars-b" width="24" height="24" className='w-6 h-6' />
                <span>Events in {event.location}</span>
              </div>
            </div>
          </div>

          <div className='border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl mt-8 p-8'>
            <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Get Your Tickets</p>
            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              {tickets.map((item, i) => (
                <TicketCard key={i} ticketData={item} curveDesignColor='bg-[#191A1A]' />
              ))}
            </div>
          </div>

          <div className='border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl mt-8 p-8'>
            <div className='md:flex items-center justify-between'>
              <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Who Is going ({attendees.length})</p>
              <Link href={`/eventGuests?eventId=${event.id}`}>
                <div className='flex items-center gap-1 cursor-pointer mt-3 md:mt-0 group'>
                  <p className='text-base font-[500] text-[#007AFF] group-hover:text-[#00bfff]'>See More</p>
                  <Icon icon="iconamoon:arrow-right-2-duotone" width="24" height="24" className='h-6 w-6 text-[#007AFF] group-hover:text-[#00bfff]' />
                </div>
              </Link>
            </div>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7'>
              {attendees.slice(0, 3).map((user, i) => (
                <AttendantCard key={i} profile={user} />
              ))}
              <MultipleAttendCard data={attendees} />
            </div>

            {currentUser ? (
              <div className="mt-8 flex items-center justify-between rounded-xl border border-[#343434] bg-[#1f1f1f] px-5 py-4">
                <div>
                  <p className="text-sm font-[600] text-[#f5f5f5]">Message attendees</p>
                  <p className="text-xs text-[#A0A0A0]">Start a chat with anyone who has RSVPed.</p>
                </div>
                <Link href={`/messages?eventId=${event.id}`} className="text-sm font-[500] text-[#F800E9]">
                  Open messages
                </Link>
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-[#343434] bg-[#1f1f1f] px-5 py-4 text-sm text-[#A0A0A0]">
                Log in to message attendees.
              </div>
            )}
          </div>


          <div className='border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl mt-8 p-8'>
            <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Event Preview</p>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {previewImages.map((item, i) => (
                <div key={i} style={{ backgroundImage: `url(${item.url})` }} className='rounded-xl h-[13.5rem] bg-black bg-cover bg-no-repeat bg-center shadow-[0_0_20px_rgba(0,0,0,0.5)]'></div>
              ))}
            </div>
          </div>

          <div className='border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl mt-8 p-8'>
            <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Contact & Support</p>
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10'>
              {socialData.map((item, i) => (
                <SocialMediaCard key={i} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </EventInformationLayout>
  );
};

export default Page;
