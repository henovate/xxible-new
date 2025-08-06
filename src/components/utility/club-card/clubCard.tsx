"use client"

import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ClubDataType } from "./type/clubType"

interface ClubCardProps {
  club: ClubDataType,
  className?: string
}

const ClubCard = ({ club, className = "" }: ClubCardProps) => {
	
  const formatNumber = (num: number): string => {
    return num.toLocaleString()
  }

  return (
    <Card
      className={`w-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-none ${className}`}
    >
      <CardContent className="p-[14px]">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative w-full sm:w-64 md:w-72 lg:w-[334px] h-[251px] sm:h-aut flex-shrink-0">
            <Image
              src={club.imageUrl || "/placeholder.svg"}
              alt={club.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 320px"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 m:p-5 g:p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl lg:text-[24px] font-bold text-gray-900">{club.name}</h3>
                {club.isVerified && (
                  <div className="flex items-center gap-1 text-blue-500">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium">Verified Club</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm sm:text-base text-gray-600">
                <span className="font-medium">{formatNumber(club.eventCount)} Events</span>
                <span className="font-medium">{formatNumber(club.followerCount)} Followers</span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3">{club.description}</p>

              {/* Primary Tags */}
              <div className="flex flex-wrap gap-2">
                {club.primaryTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs sm:text-sm px-2 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Secondary Tags */}
              <div className="flex flex-wrap gap-2">
                {club.secondaryTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50 text-xs sm:text-sm px-2 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Follow Button */}
            <div className="mt-4 sm:mt-6">
              <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium">
                Follow Brand
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default ClubCard;