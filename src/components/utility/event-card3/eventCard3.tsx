"use client"

import { ChevronRight } from "lucide-react";

interface cardDataType {
	image: string;
	content: string;
}

interface EventCard3Props {
	cardData: cardDataType;
}

const EventCard3 = ({cardData}:EventCard3Props) => {
  return (
	<>
		<div className='card4 relative h-[250px] sm:h-[300px] lg:h-[230px] xl:h-[350px] bg-cover rounded-2xl overflow-hidden' style={{background: `url(${cardData.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
			<div className='card absolute inset-0 flex flex-col justify-between p-3 md:p-2 xl:p-4 bg-black/40'>
				<div>
					<p className="font-[600] text-[12px]">Xxible Chat</p>
				</div>

				<div className="card-info text-white">
					<div className='details'>
						<p className='cat text-[9px] leading-[9px] sm:text-[11px] sm:leading-[11px] md:text-[7px] md:leading-[7px] xl:text-[16px] xl:leading-[16px] font-[600] text-stone-100'>{cardData.content}</p>						
					</div>
					<button className="flex items-center uppercase text-[9.71px] text-white py-2 px-3 mt-[8px] bg-black/40 rounded-[25px]"><span className="mr-2">Join the vibe</span> <ChevronRight className="w-4 h-4 mb-[3px]" /> </button>
				</div>
			</div>
		</div>
	</>
  )
}

export default EventCard3