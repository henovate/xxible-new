"use client"

import { Heart, Clock, Users, MapPin, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import placeholderImg from  "../../../../public/assets/events/event3.png";
import { EventDataType } from "./type/eventDataType";
import "../../../../public/styles/main.css";

  

interface EventCardProps {
  event: EventDataType
  className?: string
}

const EventCard2 = ({ event, className = "" }: EventCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
  }

  const formatPrice = (price: number, currency: string) => {
    return `${currency}${price?.toLocaleString()}`
  }

  return (
    <Card
      className={`card3 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-[33.79px] p-5 border-none ${className}`}
    >
      {/* Hero Image Section */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
		<div className="relative w-full h-[340px]">
			<Image
			src={event?.imageUrl || placeholderImg}
			alt={event?.imageAlt}
			fill
			className="object-cover rounded-[16.82px]"
			// sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
			priority
			/>
		</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-md"
        >
          <Heart
            className={`w-4 h-4 sm:w-8 sm:h-8 transition-colors ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      <CardContent className="space-y-4 sm:space-y-5">
        {/* Event Title and Location */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold xl:text-[22px] xl:leading-[26px] mt-2 text-[#212121]">{event?.title}</h2>
          <div className="flex items-center gap-1 text-gray-600 mt-3">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mb-[2px]" />
            <p className="cat text-[14px] leading-[14px]">{event?.location}</p>
          </div>
        </div>

        {/* Event Details */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-sm sm:text-[12px] mt-4 font-[600] text-[#696B6F]">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              {event?.date}, {event?.time}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 sm:mr-7">
			<div className="flex items-center gap-1">
				<Ticket className="w-4 h-4 text-[#696B6F] mb-1" />
				<div>{formatPrice(event?.price, event?.currency)}</div>
			</div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>{event?.interestedCount} Interested</span>
            </div>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 text-[11px] font-[500] mt-3">
          {event?.categories.map((category, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="explore rounded-[20px] text-[#898989] bg-[#EDEDED] hover:bg-gray-200 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Brand Section */}
        <div className="relative flex items-center gap-3 pt-3 sm:pt-4 border-t-2 border-dashed border-gray-300">
			<div className='absolute left-0 top-[-14px] rounded-full h-8 w-8 bg-[#EDEDED] ml-[-30px]'></div>
			<div className='absolute right-0 top-[-14px] rounded-full h-8 w-8 bg-[#EDEDED] mr-[-30px]'></div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            {event?.brand.logo ? (
              <Image
                src={event?.brand.logo || "/placeholder.svg"}
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
              {event?.brand.name || "Quilox"} - {event?.brand.description || "Explore nightlife in Lagos"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard2
