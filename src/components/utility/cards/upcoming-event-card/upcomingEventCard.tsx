"use client";

import { Icon } from '@iconify/react/dist/iconify.js';
import { Clock, Ticket } from 'lucide-react';
import { EventDataType } from '../event-card2/type/eventDataType';

interface UpcomingEventCardProp {
	event: EventDataType;
	eventNumber: number
}

const UpcomingEventCard = ({ event, eventNumber }:UpcomingEventCardProp) => {

	const formatPrice = (price: number, currency: string) => {
		return `${currency}${price?.toLocaleString()}`
	  }

  return (
	<>
		<div className="border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl p-2 mb-4">
			<div className="flex justify-between">
				<div className="flex items-center gap-2">
					<div className="border-2 border-[#0E101A] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-1 rounded-lg">
						<p className="text-xl font-[900] bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#06b6d4] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(217,70,239,0.7)]">0{eventNumber}</p>
					</div>
					<div>
						<p className="text-[0.65rem] font-[400] text-[#898989]">In {event.location}</p>
						<p className="font-[600] text-[0.79rem] leading-4 text-[#f5f5f5] mt-[0.2rem]">{event.title.substring(0, 20)}...</p>
					</div>
				</div>
				<span className='font-[600] text-3xl text-[#f5f5f5]'>...</span>
			</div>

			<div className="flex items-center gap-3.5 text-[0.65rem] leading-[0.82rem] text-[#A0A0A0] mt-2">
				<div className="flex items-center gap-1">
					<Clock className="w-3 h-3 flex-shrink-0" />
					<span>{event?.date}, {event?.time}</span>
				</div>

				<div className="flex items-center gap-1">
					<Ticket className="w-3 h-3" />
					<div>
						{event.currency
							? formatPrice(event?.price ?? 0, event?.currency)
							: "Free"}
					</div>
				</div>

				<div className="flex items-center gap-1">
					<Icon icon="solar:heart-angle-linear" width="24" height="24" className="w-3 h-3" />
					<span>{event?.interestedCount ?? 0}</span>
				</div>
			</div>
		</div>	
	</>
  )
}

export default UpcomingEventCard
