"use client";

import { TicketType } from '@/app/(dashboard)/(events)/(eventInformation)/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';

interface TicketProps {
	ticketData:TicketType;
	curveDesignColor?: string;
}

const TicketCard = ({ticketData, curveDesignColor}:TicketProps) => {
	const [ticketNo, setTicketNo] = useState<number>(0);

	const increaseTicket = () => {
		setTicketNo(prev => prev + 1);
	}

	const reduceTicket = () => {
		setTicketNo(prev => {
			return prev > 0 ? prev - 1 : 0;
		})
	}

	useEffect(() => {
		console.log("ticketNo:", ticketNo);
	}, [ticketNo])
	
  return (
	<div>
		<Card
			className={`
			card3 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl p-5 border-none 
			${ticketData.ticketType == "general" ? "bg-gradient-to-b from-[#2A0F30] to-[#1A0C1E]" 
			: ticketData.ticketType == "vip" ? "bg-gradient-to-b from-[#2C1A0C] to-[#1B120C]" 
			: "bg-gradient-to-b from-[#0F1A2C] to-[#0C121B]"}
			`}
		>	
		<CardContent>
			<div>
				<div className='flex flex-col justify-center items-center text-center'>
					<p className={`text-base sm:text-[1.1rem] font-[600] text-[#f5f5f5] leading-none`}>{ticketData.title}</p>
					<p className="mt-2 font-[400] text-[#A0A0A0] text-xs">{ticketData.description}</p>
					<p className={`mt-4 text-xl sm:text-2xl font-[600] text-[#f5f5f5] leading-none`}>{ticketData.price}</p>
					<Badge 
						className={`
							mt-3 rounded-3xl gap-1 flex items-center px-3 py-2 w-fit
							${ticketData.ticketType == "general" ? "bg-gradient-to-r from-[#F800E9] to-[#5500CD]"
							: ticketData.ticketType == "vip"? "bg-gradient-to-r from-[#F99D32] to-[#FF6607]"
							: "bg-gradient-to-r from-[#007AFF] to-[#08509E]"}
							`}>
						<Icon icon={ticketData.tag.icon} width="24" height="24" className='text-[#f5f5f5] h-3 w-3' />
						<p className='text-[0.7rem] leading-[0.7rem] font-[500] text-[#f5f5f5]'>{ticketData.tag.label}</p>
					</Badge>

					<div 
						className={`
							mt-2 border border-[#393939] rounded-[0.5rem] p-[0.65rem] w-full
							${ticketData.ticketType == "general" ? "bg-[#241924]" 
							: ticketData.ticketType == "vip"? "bg-[#241E19]"
							: "bg-[#181D21]"}
							`}>
						<p className='font-[400] text-[0.7rem] leading-none text-[#007AFF] text-start'>Perks & Benefits</p>
						<div className="mt-2 flex flex-wrap items-center gap-2">
							{ticketData.perks.map((item, i) => (
								<Badge key={i} variant={'outline'} className='rounded-3xl gap-2 px-2.5 py-1.5 text-[0.7rem] border border-[#343434] text-[#f5f5f5] font-[500] whitespace-nowrap'>
									{item}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className={`relative flex items-center gap-3 pt-3 mt-5 sm:pt-5`}>
				<div className={`absolute left-0 top-[-14px] rounded-full h-6 w-6 ${curveDesignColor}  ml-[-30px]`}></div>
				<div className={`absolute right-0 top-[-14px] rounded-full h-6 w-6 ${curveDesignColor} mr-[-30px]`}></div>
			</div>

			<div className='px-1.5 py-2 bg-[#2A2A2A24] flex justify-between items-center font-[600] text-base'>
				<p onClick={reduceTicket} className='cursor-pointer hover:scale-150 transition-all'>-</p>
				<p>{ticketNo}</p>
				<p onClick={increaseTicket} className='cursor-pointer hover:scale-150 transition-all'>+</p>
			</div>
		</CardContent>
		</Card>
	</div>
  )
}

export default TicketCard