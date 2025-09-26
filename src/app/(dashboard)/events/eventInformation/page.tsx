"use client";

import TicketCard from '@/components/utility/cards/ticketCard/ticketCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Clock, Ticket } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { tickets } from './data';
import AttendantCard from '@/components/utility/cards/attendantCard/attendantCard';
import { previewImages, socialData, users } from '@/components/utility/cards/attendantCard/data';
import MultipleAttendCard from '@/components/utility/cards/multipleAttendCard/multipleAttendCard';
import SocialMediaCard from '@/components/utility/cards/socialMediaCard/socialMediaCard';
import NextEventCard from '../../components/nextEventCard/nextEventCard';
import { nextEventList } from '../../components/nextEventCard/next-events';


const Page = () => {

  const category = ["Girls Night", "Karaoke", "DJ Night", "Late Night", "Beach Vibes", "Bonfire"]

  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(prev => !prev);
  }

  useEffect(() => {
    console.log("isFavorited updated:", isFavorited);
  }, [isFavorited]);

  return (
	<div className="bg-[#191A1A]">
    <div className="bg-[#221922] shadow-[0_0_20px_rgba(0,0,0,0.5)] text-xl lg:text-2xl py-5 pl-5 pr-5 xl:pl-5 xl:pr-[5.5rem] flex items-center justify-between text-[#f5f5f5]">
      <div className='flex items-center gap-3'>
      <Icon icon="majesticons:arrow-left-line" width="24" height="24" className='h-6 w-6' />
        <p className="font-[600]">Event Overview</p>
      </div>
      

      <div className="flex items-center gap-6">
        <div className='px-6 py-2 bg-[#f5f5f5] rounded-lg'>
          <p className='font-[500] text-base text-[#898989]'>Attend</p>
        </div>

        <div className={`flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:bg-[#f5f5f5] border border-[#f5f5f5] transition rounded-lg p-2 2xl:py-[0.65rem] 2xl:px-4 cursor-pointer`}>
          <Icon icon="fluent:share-ios-28-filled" width="28" height="28" className={`h-4 w-4 2xl:w-6 2xl:h-6 group-hover:text-zinc-900 text-[#f5f5f5]`}/>
          <span className='font-[500] text-base leading-none text-[#f5f5f5]'>Share</span>
        </div>
      </div>
    </div>

    <div className='grid grid-cols-1 lg:grid-cols-[70%_1fr] px-5 lg:pl-[3.7rem] gap-16 lg:pr-[5.4rem] pt-12 text-[#f5f5f5]'>
      {/* 1st Partition */}  
      <div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-[#202222] border border-[#343434] p-5 lg:py-6 lg:pl-6 lg:pr-16 rounded-xl gap-[5.3rem shadow-[0_0_20px_rgba(0,0,0,0.5)]'>
          <div className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Icon icon="solar:user-linear" width="24" height="24" className='h-5 w-5 text-[#A2A2A2]' />
              <p className='font-[500] leading-none text-base'>Host</p>
            </div>
            <p className='font-[500] leading-none text-sm'>Quilox - Explore nightlife in Lagos</p>
            <p className='font-[600] leading-none text-[#0866FF] text-sm'>View Profile and Past event</p>
          </div>


          <div className='sm:pl-6 lg:pl-0 mt-8 sm:mt-0'>
            <div className='flex items-center gap-2'>
              <Icon icon="formkit:time" width="16" height="16" className='h-5 w-5 text-[#A2A2A2]' />
              <p className='font-[500] leading-none text-base'>Date and time</p>
            </div>
            <p className='font-[500] leading-none text-sm mt-3'>Saturday, June 28, 2025</p>
            <p className='font-[500] leading-none text-sm mt-1'>06:00 PM WAT</p>
            <p className='font-[600] leading-none text-[#0866FF] mt-2 text-sm'>+ Add to Calendar</p>
          </div>


          <div className='mt-8 md:mt-0'>
            <div className='flex items-center gap-2'>
            <Icon icon="tdesign:location" width="24" height="24" className='h-5 w-5 text-[#A2A2A2]' />
              <p className='font-[500] leading-none text-base'>Venue</p>
            </div>
            <p className='font-[500] leading-4 text-sm mt-3 w-[14rem] lg:w-[19rem]'>873 Ozumba Mbadiwe Ave, Victoria Island, Lagos 106104, Lagos</p>
          </div>
        </div>

        <div className='mt-5 mb-8'>
          <div className='relative w-full h-[40.6rem] bg-black/40 bg-blend-overlay'>
            <Image src="https://images.pexels.com/photos/3419687/pexels-photo-3419687.jpeg" width={572.42} height={649.59} alt="event" className='w-full h-full object-cover rounded-xl' />
                 
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
                <div className='bg-black/20 backdrop-blur-md px-10 py-7'>
                  <p className='font-[600] text-2xl leading-7'>Unleasing XXible Nightlife</p>
                  <div className='flex flex-wrap gap-5 items-center mt-3 xl:mt-4'>
                    {category.map((item, i) => (
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
                  <p>Unleashing XXible Nightlife – The Ultimate Party Experience in Lagos</p>
                  <p>Victoria Island, Lagos</p>
                </div>

                <div>
                  <p>Saturday, July 26th, 2025 | 9:00 PM till dawn</p>
                </div>

                <div>
                  <p>
                    Step into the night where neon lights meet Afrobeat energy and the city’s boldest crowd comes alive. 
                    XXible Nightlife isn’t just an event — it’s an experience made for the unstoppable. 
                    Expect live DJ sets spinning Amapiano, Afrobeat, House, and more, welcome cocktails for early arrivals, 
                    a wild dance floor lit with stunning visuals, and photo booth moments to capture the night. There’ll be giveaways, 
                    surprises, and VIP guest appearances that take the night to a whole new level.
                    This party is for the unapologetically fun — so bring your best vibe and your crew!
                  </p>
                </div>

                <div>
                  <p>Dress Code: Bold. Black. Beautiful.</p>
                </div>

                <div>
                  <p>Limited slots available — RSVP now to secure entry</p>
                </div>
              </div>
            </div>

            <div className='border-t-2 border-[#343434] mt-4'></div>

            <div className='px-6 mt-5 flex justify-between items-center'>
              <div className='flex items-center gap-6 font-[500] text-[#A0A0A0]'>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Jun 28, 6PM
                  </span>
                </div>
               
                <div className="flex items-center gap-1">
                  <Ticket className="w-4 h-4" />
                  <span>Free</span>
                </div>

                <div className="flex items-center gap-1">
                  <Icon icon="solar:heart-angle-bold" width="24" height="24" className="w-5 h-5 fill-[#F800E9] text-[#F800E9]" />               
                  <span>51 Interested</span>
                </div>   
              </div>

              <div className='rounded-lg flex items-center gap-2 px-3 py-4 bg-[#F800E912] font-[400] text-[#f5f5f5] '>
                <Icon icon="mage:stars-b" width="24" height="24" className='w-6 h-6' />
                <span>Events in Victoria Island, NG</span>
              </div>
            </div>
          </div>

          <div className='border border-[#343434] rounded-xl mt-8 p-8'>
            <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Get Your Tickets</p>
            <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-5'>
                {tickets.map((item, i) => (
                  <TicketCard key={i} ticketData={item} curveDesignColor='bg-[#191A1A]'/>
                ))}
            </div>
          </div>

          <div className='border border-[#343434] rounded-xl mt-8 p-8'>
            <div className='md:flex items-center justify-between'>
              <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Who Is going (50)</p>
              <div className='flex items-center gap-1'>
                <p className='text-base font-[500] text-[#007AFF]'>See More</p>
                <Icon icon="iconamoon:arrow-right-2-duotone" width="24" height="24" className='h-6 w-6 text-[#007AFF]' />
              </div>
            </div>
           
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7'>
                {users.slice(0, 3).map((user, i) => (
                  <AttendantCard key={i} profile={user} />
                ))}
                <MultipleAttendCard data={users}/>
            </div>
          </div>


          <div className='border border-[#343434] rounded-xl mt-8 p-8'>
            <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Event Preview</p>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {previewImages.map((item, i) => (
                <div key={i} style={{backgroundImage: `url(${item.url})`}} className='rounded-xl h-[13.5rem] bg-black bg-cover bg-no-repeat bg-center shadow-[0_0_20px_rgba(0,0,0,0.5)]'></div>
              ))}
            </div>
          </div>

          <div className='border border-[#343434] rounded-xl mt-8 p-8'>
            <p className='font-[600] text-2xl leading-none text-[#f5f5f5]'>Contact & Support</p>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10'>
              {socialData.map((item, i) => (
                <SocialMediaCard key={i} data={item}/>
              ))}
            </div>
          </div>
        </div>
      </div>




      {/* 2nd Partition */}  
      <div className='hidden lg:block'>
        <div className='bg-[#232323] rounded-xl p-6 w-full shadow-[0_0_20px_rgba(0,0,0,0.5)]'>
          <div className='flex items-center justify-between'>
            <p className="w-[13.2rem] font-[600] text-xl leading-6">Quilox - Explore nightlife in Lagos</p>         
            <div className='w-[5.7rem] h-[5.7rem] bg-[#D9D9D9] rounded-lg'></div>
          </div>

          <div className='mt-7 border-t border-[#5D5D5D]'></div>

          <div className='flex items-center mt-[1.9rem]'>
            <p className='text-[1.15rem] font-[500] mr-1'>4.4</p>
            {Array.from({length:4}, (_, i) => (
              <Icon key={i} icon="ic:round-star-rate" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
            ))}
            <Icon icon="ic:round-star-half" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
            <p className="text-sm font-[400] underline text-[#A0A0A0] ml-1">22 ratings</p>
          </div>
        </div>

        <div className='mt-10 px-5 pt-5 pb-10 rounded-t-2xl bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)]'>
          <div className='flex gap-4'>
            <Icon icon="formkit:time" width="16" height="16" className='h-6 w-6 text-[#A2A2A2]' />
            <div className='text-[#E9E9E9]'>
              <p className='font-[500] leading-none text-sm'>Saturday, June 28, 2025</p>
              <p className='font-[500] leading-none text-sm mt-1'>06:00 PM WAT</p>
              <p className='font-[600] leading-none text-[#0866FF] mt-2 text-sm'>+ Add to Calendar</p>
            </div>
          </div>


          <div className='flex gap-4 mt-9'>
          <Icon icon="tdesign:location" width="24" height="24" className='h-6 w-6 text-[#A2A2A2]' />
            <div className='text-[#E9E9E9]'>
              <p className='font-[500] leading-none text-sm'>Club Quilox</p>
              <p className='font-[500] leading-4 text-sm mt-1 w-[14rem] lg:w-[13rem]'>873 Ozumba Mbadiwe Ave, Victoria Island, Lagos 106104, Lagos</p>
              <button className='bg-[#007AFF] px-3 py-[0.5rem] flex items-center rounded-xl gap-2 mt-5'>
                <Icon icon="solar:map-arrow-left-linear" width="24" height="24" />
                <span className='font-[500] text-sm'>Get Direction</span>
              </button>
            </div>
          </div>
        </div>

        <div className='bg-zinc-800 h-[26.8rem] shadow-[0_0_20px_rgba(0,0,0,0.5)]'></div>

        <div className='mt-[4.8rem]'>
          <p className="text-2xl leading-none font-[600] text-[#f5f5f5]">More Events by Quilox</p>

          <div className="mt-8 space-y-6">
            {nextEventList.map((_event, index) => (
              <NextEventCard key={index} 
                            event={_event}
                            titleClassName="text-base"
                            locationClassName="text-base"
                            timeClassName="text-base"
                            imageClassName="w-[5rem] h-[5rem]"
                            iconSizeClassName="w-3 h-3 sm:w-4 sm:h-4" 
                            />
             ))}
			    </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Page;