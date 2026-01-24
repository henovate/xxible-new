"use client";

import React from 'react';
import EventLayout from '../../../eventLayout';
import { pastEventsData } from '../../../selectData/pastEventData';
import EventCard2 from '@/components/utility/cards/event-card2/EventCard2';
import { useRouter } from 'next/navigation';

const page = () => {

	const router = useRouter();

	const eventPage = (id:number) => {
		router.push("/eventInformation/past-events/past-event-details")
		// router.push(`/event-overview?title=${id}`)
	}

  return (
	<EventLayout>
		<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-9'>
		{pastEventsData.map((_event, index) => (
					<EventCard2 key={index} 
								event={_event} 
								bgClassName="bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
								titleAndCompanyTextColor="text-[#F5F5F5]"
								cardInfoTextColor="text-[#A0A0A0]"
								imgHeight="h-[24.15rem]"
								curveDesignColor="bg-[#191A1A]"
								titleFontSize="2xl:text-xl 2xl:leading-6 mt-4"
								eventInfoFontSize="2xl:text-xs 2xl:leading-4"
								locationFontSize="2xl:text-sm 2xl:leading-[1.1rem]"
								// clickHandler={(id:number) => eventPage(id)}
								/>
				))}
		</div>
	</EventLayout>
  )
}

export default page
