"use client"

import { Heart, Clock, Users, MapPin, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import placeholderImg from  "../../../../../public/assets/events/event3.png";
import { EventDataType } from "./type/eventDataType";
import "../../../../../public/styles/main.css";
import { Icon } from "@iconify/react/dist/iconify.js";

  

interface EventCardProps {
  event: EventDataType;
  bgClassName?: string;
  titleAndCompanyTextColor?: string;
  cardInfoTextColor?: string;
  imgHeight?: string;
  curveDesignColor?: string;
  titleFontSize?: string;
  locationFontSize?: string;
  eventInfoFontSize?: string;
  cardTag?: string;
  clickHandler?: (id:number) => void;
}

const EventCard2 = ({ event, 
                      bgClassName="bg-white", 
                      titleAndCompanyTextColor="text-[#212121]", 
                      cardInfoTextColor="text-[#696B6F]", 
                      imgHeight="h-[21.25rem]", 
                      curveDesignColor="bg-[#EDEDED]",
                      titleFontSize="2xl:text-2xl 2xl:leading-7",
                      locationFontSize="2xl:text-base 2xl:leading-[1.25rem]",
                      eventInfoFontSize="2xl:text-sm 2xl:leading-[1.125rem]",
                      cardTag,
                      clickHandler
                    }: EventCardProps) => {
  
  
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
  }

  const formatPrice = (price: number, currency: string) => {
    return `${currency}${price?.toLocaleString()}`
  }

  return (
    <Card
      className={`card3 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-[33.79px] p-5 border-none ${bgClassName}`}
    >
      {/* Hero Image Section */}
      <div onClick={() => clickHandler?.(Number(event.id))} className="relative cursor-pointer">
        <div className={`relative w-full bg-[#000000] rounded-[16.82px] ${imgHeight}`}>
          <Image
          src={event?.imageUrl || placeholderImg}
          alt={event?.imageAlt}
          fill
          className="object-cover rounded-[16.82px]"
          priority
          />
        </div>

        {cardTag === "likes"? 
        (<Button
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
        ) : cardTag === "latest"? (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#53535354] border border-[#838383] text-[#F5F5F5] py-0.5 px-2.5 text-xs font-[500] rounded-full">
                  Latest
          </div>
          ) : cardTag === "eventCategory"? (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#53535354] border border-[#838383] text-[#F5F5F5] py-0.5 px-2.5 text-xs font-[500] rounded-full">
                  {event?.category}
            </div>
          ) : (
            <></>
          )
        }
      </div>


      <CardContent className="space-y-4 sm:space-y-5">
        {/* Event Title and Location */}
        <div>
          <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold xl:text-[22px] xl:leading-[26px] mt-2 ${titleFontSize} ${titleAndCompanyTextColor}`}> {event?.title.length > 24? (`${event.title.substring(0, 24)}...`) : (event.title)} </h2>
          <div className={`flex items-center gap-1 mt-3 ${cardInfoTextColor}`}>
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mb-[2px]" />
            <p className={`cat text-sm leading-[1.25rem] ${locationFontSize}`}>{event?.location}</p>
          </div>
        </div>

        {/* Event Details */}
        {event?.interestedCount? (
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-sm sm:text-[0.75rem] mt-4 font-[600] ${eventInfoFontSize}  ${cardInfoTextColor}`}>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              {event?.date}, {event?.time}
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 sm:mr-7">
            <div className="flex items-center gap-1">
              <Ticket className="w-4 h-4 mb-1 2xl:mb-0" />
              <div>{event?.price && event?.currency && formatPrice(event?.price, event?.currency)}</div>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>{event?.interestedCount} Interested</span>
            </div>
          </div>
        </div>
        ) : null}



        {/* Event Ratings and Review */}
        {event?.ratings && event?.review ? (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className='flex items-center'>
              <p className='text-[1.15rem] font-[500] mr-1 text-[#f5f5f5]'>{event.ratings}</p>
              {Array.from({length:4}, (_, i) => (
                <Icon key={i} icon="ic:round-star-rate" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
              ))}
              <Icon icon="ic:round-star-half" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
            </div>

            <div>
              <p className="font-[400] text-base leading-none text-[#A0A0A0]">({event.review.reviewTotal} Reviews)</p>
            </div>
          </div>

          <div className="mt-3 border border-[#3A3A3A] rounded-xl text-base font-[400] text-[#A0A0A0] leading-5 py-5 px-6">
            <p className="italic">
            "{event.review?.review}"
            </p>
            <p className="leading-none mt-1"> - {event.review?.reviewersName}</p>
          </div>
        </div>
        ) : null}






        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 font-[500] mt-3">
          {event.categories &&
            event?.categories.length > 3 ? (
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
              event.categories && event.categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="explore rounded-[1.25rem] text-[#898989] bg-[#EDEDED] hover:bg-gray-200 text-xs sm:text-sm 2xl:text-[0.94rem] px-2 py-1 sm:px-3 sm:py-1"
                >
                  {category}
                </Badge>
              ))
            )
          }
        </div>


        {/* Brand Section */}
        <div className={`relative flex items-center gap-3 pt-3 sm:pt-4 ${event?.categories && "border-t-2 border-dashed border-gray-300"}`}>
          <div className={`absolute left-0 top-[-14px] rounded-full h-8 w-8 ${curveDesignColor}  ml-[-30px]`}></div>
          <div className={`absolute right-0 top-[-14px] rounded-full h-8 w-8 ${curveDesignColor} mr-[-30px]`}></div>
          <div className={`${!event?.categories? "px-2 py-3 border border-[#343434] bg-[#2B2B2B] flex items-center gap-3 rounded-2xl w-full" : "flex items-center gap-3"}`}>
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
              {event?.categories && <p className="text-xs sm:text-sm text-gray-500 mb-1">Brand</p>}
              <p className={`text-sm sm:text-base leading-tight sm:leading-4 font-medium ${titleAndCompanyTextColor}`}>
                {event?.brand.name} - {event?.brand.description.length > 24? (`${event.brand.description.substring(0, 24)}...`) : (event.brand.description)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard2
