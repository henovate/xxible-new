"use client"

import Image from "next/image";
import { nextEventType } from "./nextEventType";
import { Clock, MapPin } from "lucide-react";

interface NextEventProps {
  event: nextEventType;
  titleClassName?: string;
  locationClassName?: string;
  timeClassName?: string;
  imageClassName?: string;
  iconSizeClassName?: string;
  cardUse?: string;
}

const NextEventCard = ({ event, titleClassName="text-base", cardUse="nextEvent", locationClassName="text-xs", timeClassName="text-xs", imageClassName="w-20 h-20", iconSizeClassName="w-3 h-3 lg:h-[0.88rem] lg:w-[0.88rem]" }:NextEventProps) => {
  return (
	<>
    <div className={`flex items-center py-[0.6rem] pl-[0.6rem] pr-[1.8rem] bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-[#343434] gap-3 rounded-2xl ${cardUse == "trending" && "w-full"} whitespace-nowrap flex-shrink-0 snap-start`}>
        <div className={`bg-cover rounded-xl bg-zinc-900 ${imageClassName}`}>
            <Image src={event.eventImage} width={50} height={50} alt="Event Image" className="w-full h-full bg-cover bg-center rounded-xl"/>
        </div>
        <div className="space-y-1">
          <div>
            <p className={`text-[#F5F5F5] font-[600] ${titleClassName}`}>{cardUse == "nextEvent"? event.eventTitle : event.eventTitle.substring(0, 9)}{cardUse !== "nextEvent" && "..."}</p>
          </div>
          <div className="flex items-center text-[#A0A0A0] gap-2">
            <MapPin className={`flex-shrink-0 mb-[2px] ${iconSizeClassName}`} />
            <p className={`font-[500] ${locationClassName}`}>{cardUse == "nextEvent"? event.eventLocation : event.eventLocation.substring(0, 9)}{cardUse !== "nextEvent" && "..."}</p>
          </div>
          <div className="flex items-center text-[#A0A0A0] gap-2">
            <Clock className={`flex-shrink-0  ${iconSizeClassName}`} />
            <p className={`font-[500] ${timeClassName}`}>{event.eventTime}</p>
          </div>
        </div>
    </div>
  </>
  )
}

export default NextEventCard;