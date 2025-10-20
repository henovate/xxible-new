import { eventsData } from '@/app/(dashboard)/(events)/selectData/selectData'
import EventCard2 from '@/components/utility/cards/event-card2/eventCard2'
import React from 'react'
import NoItemCard from '../../noItemCard/noItemCard'
import { Icon } from '@iconify/react/dist/iconify.js'

const Interested = () => {

	const message = (
		<>
		  Tap the{" "}
		  <Icon icon="bxs:heart" width="24" height="24" className="w-3 h-3 text-[#FF00EA]" />{" "}
		  button on events to keep track of them here.
		</>
	  )

  return (
	<>
		{!eventsData || eventsData.length == 0 ?
		(<div className='flex items-center justify-center mt-16 lg:mt-36'>
			<NoItemCard iconName="si:heart-fill" cardDescription={message} iconClasses='text-[#da60cf]' /> 
		</div>) : (
	  	<div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
			{eventsData.map((_event, index) => (
				<EventCard2 key={index} 
							event={_event} 
							bgClassName="bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
							titleAndCompanyTextColor="text-[#F5F5F5]"
							cardInfoTextColor="text-[#A0A0A0]"
							imgHeight="h-[16rem]"
							curveDesignColor="bg-[#191A1A]"
							titleFontSize="2xl:text-xl 2xl:leading-6"
							eventInfoFontSize="2xl:text-xs 2xl:leading-4"
							locationFontSize="2xl:text-sm 2xl:leading-[1.1rem]"
							cardTag="eventCategory"
							// clickHandler={(id:number) => eventPage(id)}
							/>
			))}	
		</div>
		)}
	</>
  )
}

export default Interested
