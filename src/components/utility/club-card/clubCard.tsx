"use client"

import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ClubDataType } from "./type/clubType"

interface ClubCardProps {
  club: ClubDataType;
  className?: string;
	secondToLastItem: number;
	lastItem: number;
}

const ClubCard = ({ club, secondToLastItem, lastItem, className = "" }: ClubCardProps) => {
	
  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  return (
    <Card
      className={`w-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none ${Number(club.id) == 1 || Number(club.id) == 2? "rounded-t-[20px]" : null} ${Number(club.id) == secondToLastItem || Number(club.id) == lastItem? "rounded-b-[20px]" : null} ${className}`}
    >
      <CardContent className="relative pl-[22px] pr-[27px] pt-[24px] pb-[70px]">
        <div className="flex h-full gap-3 flex-col sm:flex-row">
          {/* Image Section */}
          <div className="img-cont relative h-[251px] sm:h-auto w-full sm:w-[40%] flex-shrink-0 rounded-[12px]">
            <Image
              src={club.imageUrl || "/placeholder.svg"}
              alt={club.imageAlt}
              fill
              className="object-cover rounded-[12px]"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px"
            />
          </div>

          {/* Content Section */}
          <div className="w-full sm:w-[60%] flex flex-col">
            {/* Header */}
            <div className="space-y-3 sm:space-y-[12px]">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl lg:text-[24px] font-bold text-gray-900">{club.name}</h3>
                {club.isVerified && (
                  <div className="flex items-center gap-1 text-blue-500 bg-[#E9F5FF] rounded-full px-2 py-[2px]">
                    <CheckCircle className="w-4 h-4 sm:w-[11.49px] sm:h-[11.49px]" />
                    <span className="text-xs sm:text-[9px] font-medium">Verified Club</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm sm:text-[15px] font-[500] text-[#696B6F]">
                <span className="font-medium"><span className="font-[600]">{formatNumber(club.eventCount)} </span>Events</span>
                <span className="font-medium"><span className="font-[600]">{formatNumber(club.followerCount)} </span>Followers</span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed sm:text-[13px] sm:leading-[15px] text-[#696B6F] line-clamp-3">{club.description}</p>

              {/* Primary Tags */}
              <div className="flex flex-wrap gap-2">
                {club.primaryTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-[#212121] hover:bg-gray-200 text-xs sm:text-[10px] px-2 py-[2px] rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Follow Button */}
            <div className="mt-4 sm:mt-[15px]">
              <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-2 rounded-lg font-medium text-[15px]">
                Follow Brand
              </Button>
            </div>
          </div>
        </div>
        <div className='absolute left-0 bottom-[-15px] rounded-full h-10 w-10 bg-[#EDEDED] ml-[-15px]'></div>
			  <div className='absolute right-0 bottom-[-15px] rounded-full h-10 w-10 bg-[#EDEDED] mr-[-15px]'></div>
      </CardContent>
    </Card>
  )
}


export default ClubCard;