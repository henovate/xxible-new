"use client";

import { Icon } from '@iconify/react/dist/iconify.js';
import NextEventCard from '../../components/nextEventCard/nextEventCard';
import { nextEventList } from '../../components/nextEventCard/next-events';
import { useRouter } from 'next/navigation';

interface EventInformationLayoutProps {
  children?: React.ReactNode;
}

const eventInformationLayout = ({children}:EventInformationLayoutProps) => {

  const router = useRouter();

  const handleGoBack = () => {
    router.push("/events");
  }


  return (
	<div className="bg-[#191A1A]">
    <div className="bg-[#221922] text-xl lg:text-2xl py-5 pl-5 pr-5 xl:pl-5 xl:pr-[5.5rem] flex items-center justify-between text-[#f5f5f5]">
      <div onClick={handleGoBack} className='flex items-center gap-3 cursor-pointer group'>
        <Icon icon="majesticons:arrow-left-line" width="24" height="24" className='h-6 w-6 group-hover:text-[#00baf8]' />
        <p className="font-[600] group-hover:text-[#a29f9f]">Event Overview</p>
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

    <div className='grid grid-cols-1  xl:grid-cols-[70%_1fr] px-5 xl:pl-[3.7rem] xl:pr-[5.4rem] pt-12 lg:gap-8 xl:gap-12 text-[#f5f5f5]'>
      {/* 1st Partition */}  
      {children}
     

      {/* 2nd Partition */}  
      <div className='hidden xl:block'>
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

export default eventInformationLayout;