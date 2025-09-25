"use client";

import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

interface TicketProps {
	curveDesignColor: string;
	bgClassName?: string;
}

const TicketCard = ({curveDesignColor, bgClassName="bg-gradient-to-r from-[#F800E9] to-[#5500CD]"}:TicketProps) => {
  return (
	<div>
		<Card
		className={`card3 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-[33.79px] p-5 border-none ${bgClassName}`}
		>
		
		<CardContent className="space-y-4 sm:space-y-5">
			{/* Brand Section */}
			<div className={`relative flex items-center gap-3 pt-3 sm:pt-4`}>
				<div className={`absolute left-0 top-[-14px] rounded-full h-8 w-8 ${curveDesignColor}  ml-[-30px]`}></div>
				<div className={`absolute right-0 top-[-14px] rounded-full h-8 w-8 ${curveDesignColor} mr-[-30px]`}></div>
			</div>
		</CardContent>
		</Card>
	</div>
  )
}

export default TicketCard