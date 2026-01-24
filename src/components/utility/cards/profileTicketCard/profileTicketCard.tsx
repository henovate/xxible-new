import { LimitedTimeTag, PopularTag, VipTag } from '@/app/(dashboard)/profiler/components/tags/tags';
import { TicketType } from '@/app/(dashboard)/profiler/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@iconify/react/dist/iconify.js';
import { MapPin } from 'lucide-react';
import React from 'react'

interface ProfileTicketProps {
	curveDesignColor?: string;
	ticketData: TicketType;
	cardBgColor: string;
	cardBtnColor: string;
} 

const ProfileTicketCard = ({curveDesignColor, cardBgColor, ticketData, cardBtnColor}:ProfileTicketProps) => {
  return (
	<div>
		<Card
			className={`
			card3 w-full max-w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-3xl px-5 py-6 border-none ${cardBgColor}
			`}>	
		<CardContent>
			<div className='relative h-[21.2rem] bg-cover bg-center bg-no-repeat rounded-2xl' style={{backgroundImage: `url(${ticketData.image})`}}>
				<div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#102D18] border border-[#58A942] text-[#F5F5F5] py-2.5 px-5 text-base font-[500] rounded-full">
					Active
				</div>
			</div>

			<div className='mt-7 flex flex-col items-center text-center space-y-5'>
				<div>
					<p className='font-[600] text-3xl leading-none text-[#f5f5f5]'>{ticketData.title}</p>
				</div>
				
				{ticketData.ticketType == "Vip" ? <VipTag /> 
				: ticketData.ticketType == "Popular" ? <PopularTag />
				: <LimitedTimeTag />}

				<div className="text-[#A0A0A0] flex items-center gap-2.5 lg:gap-1.5">
					<MapPin className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mb-[2px] text-[#A0A0A0]" />
					<p className="font-[400] text-sm lg:text-base">Club Voltage, Downtown PH</p>
				</div>

				<div className='flex items-center gap-2 text-[#A0A0A0]'>
					<Icon icon="formkit:time" width="16" height="16" className='h-5 w-5 text-[#A2A2A2]' />
					<p className='font-[500] leading-none text-base'>{ticketData.date}</p>
				</div>
			</div>
			
			<div className={`relative flex items-center gap-3 pt-3 mt-3.5 sm:pt-10 border-t-[0.09rem] border-dashed border-t-[#808080]`}>
				<div className={`absolute left-0 top-[-14px] rounded-full h-10 w-10 ${curveDesignColor}  ml-[-30px]`}></div>
				<div className={`absolute right-0 top-[-14px] rounded-full h-10 w-10 ${curveDesignColor} mr-[-30px]`}></div>
			</div>


			<div className='flex flex-col items-center justify-center'>
				<div>
					<p className='font-[400] text-[#A0A0A0]'>Ticket ID: QRXGKJTQ8D5</p>
				</div>

				<button className={`py-4 w-80 font-[500] text-2xl mt-9 rounded-2xl ${cardBtnColor}`}>Add to calendar</button>
			</div>
		</CardContent>
		</Card>
	</div>
  )
}

export default ProfileTicketCard