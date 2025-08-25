"use client";

import { Clock, Users, MapPin, Ticket } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { EventDataType } from "../../../../components/utility/cards/event-card2/type/eventDataType";
import "../../../../../public/styles/main.css";
import EventCard2 from "@/components/utility/cards/event-card2/eventCard2";

interface EventCardProps {
	event: EventDataType;
	className?: string;
  }

const upcomingEvent = ({event, className = "" }: EventCardProps) => {

	const formatPrice = (price: number, currency: string) => {
		return `${currency}${price?.toLocaleString()}`
	  }
	  
  return (
	<EventCard2>
		<CardContent className="space-y-4 sm:space-y-5">
			{/* Event Title and Location */}
			<div>
			<h2 className="text-lg sm:text-xl lg:text-2xl font-bold xl:text-[22px] xl:leading-[26px] 2xl:text-[24px] 2xl:leading-[28px] mt-2 text-[#212121]">{event?.title.length > 24? (`${event.title.substring(0, 24)}...`) : (event.title)}</h2>
			<div className="flex items-center gap-1 text-gray-600 mt-3">
				<MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mb-[2px]" />
				<p className="cat text-sm leading-[1.25rem] 2xl:text-base 2xl:leading-[1.25rem]">{event?.location}</p>
			</div>
			</div>

			{/* Event Details */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-sm sm:text-[0.75rem] 2xl:text-sm 2xl:leading-[1.125rem] mt-4 font-[600] text-[#696B6F]">
			<div className="flex items-center gap-1">
				<Clock className="w-4 h-4 flex-shrink-0" />
				<span>
				{event?.date}, {event?.time}
				</span>
			</div>

			<div className="flex items-center justify-between sm:justify-end gap-4 sm:mr-7">
				<div className="flex items-center gap-1">
				<Ticket className="w-4 h-4 text-[#696B6F] mb-1 2xl:mb-0" />
				<div>{formatPrice(event?.price, event?.currency)}</div>
				</div>
				<div className="flex items-center gap-1">
				<Users className="w-4 h-4 flex-shrink-0" />
				<span>{event?.interestedCount} Interested</span>
				</div>
			</div>
			</div>

			{/* Category Tags */}
			<div className="flex flex-wrap gap-2 font-[500] mt-3">
			{event?.categories.length > 3 ? (
				<>
				{event.categories.slice(0, 3).map((category, index) => (
					<Badge
					key={index}
					variant="secondary"
					className="explore rounded-[20px] text-[#898989] bg-[#EDEDED] hover:bg-gray-200 text-xs sm:text-sm 2xl:text-[0.94rem] px-2 py-1 sm:px-3 sm:py-1"
					>
					{category}
					</Badge>
				))}
				<Badge  className="explore rounded-[20px] text-[#898989] bg-[#EDEDED] hover:bg-gray-200 text-xs sm:text-sm 2xl:text-[0.94rem] px-2 py-1 sm:px-3 sm:py-1">
					+{event.categories.length - 3} more
				</Badge>
				</>
			) : (
				event.categories.map((category, index) => (
				<Badge
					key={index}
					variant="secondary"
					className="explore rounded-[1.25rem] text-[#898989] bg-[#EDEDED] hover:bg-gray-200 text-xs sm:text-sm 2xl:text-[0.94rem] px-2 py-1 sm:px-3 sm:py-1"
				>
					{category}
				</Badge>
				))
			)}
			</div>


			{/* Brand Section */}
			<div className="relative flex items-center gap-3 pt-3 sm:pt-4 border-t-2 border-dashed border-gray-300">
			<div className='absolute left-0 top-[-14px] rounded-full h-8 w-8 bg-[#EDEDED] ml-[-30px]'></div>
			<div className='absolute right-0 top-[-14px] rounded-full h-8 w-8 bg-[#EDEDED] mr-[-30px]'></div>
			<div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
				{event?.brand.logo ? (
				<Image
					src={event?.brand.logo}
					alt={`${event?.brand.name} logo`}
					width={32}
					height={32}
					className="rounded-full"
				/>
				) : (
				<span className="text-white text-xs sm:text-sm font-bold">{event?.brand.name.charAt(0)}</span>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-xs sm:text-sm text-gray-500 mb-1">Brand</p>
				<p className="text-sm sm:text-base font-medium text-gray-900 leading-tight">
				{event?.brand.name} - {event?.brand.description.length > 24? (`${event.brand.description.substring(0, 24)}...`) : (event.brand.description)}
				</p>
			</div>
			</div>
        </CardContent>
	</EventCard2>
  )
}

export default upcomingEvent