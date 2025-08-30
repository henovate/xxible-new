"use client"

import Image from "next/image";
import { nextEventType } from "./nextEventType";
import { Clock, MapPin } from "lucide-react";

interface NextEventProps {
  event: nextEventType;
}

const NextEventCard = ({ event }:NextEventProps) => {
  return (
	<>
    <div className="flex items-center py-[0.6rem] pl-[0.6rem] pr-[1.8rem] bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-[#343434] gap-3 rounded-2xl w-fit whitespace-nowrap flex-shrink-0 snap-start">
        <div className="2xl:w-24 2xl:h-24 bg-cover rounded-xl">
            <Image src={event.eventImage} width={50} height={50} alt="Event Image" className="w-full h-full bg-cover bg-center rounded-xl"/>
        </div>
        <div className="space-y-1">
          <div>
            <p className="text-xl text-[#F5F5F5] font-[600]">{event.eventTitle}</p>
          </div>
          <div className="flex items-center text-[#A0A0A0] gap-2">
            <MapPin className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0 mb-[2px]" />
            <p className="text-base font-[500]">{event.eventLocation}</p>
          </div>
          <div className="flex items-center text-[#A0A0A0] gap-2">
            <Clock className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" />
            <p className="text-base font-[500]">{event.eventTime}</p>
          </div>
        </div>
    </div>
  </>
  )
}

export default NextEventCard;