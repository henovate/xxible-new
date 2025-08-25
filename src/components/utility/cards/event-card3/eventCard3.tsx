"use client"

import { ChevronRight } from "lucide-react";

interface cardDataType {
	id: number;
	image: string;
	content: string;
}

interface EventCard3Props {
	cardData: cardDataType;
}

const EventCard3 = ({cardData}:EventCard3Props) => {
  return (
	<>
		<div className={`card4 relative h-[21.9rem] sm:h-[18.75rem] lg:h-[21.9rem] bg-cover rounded-2xl overflow-hidden `} 
			 style={{background: `url(${cardData.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
			 >
			<div className='card absolute inset-0 flex flex-col justify-between p-5 xl:p-4 bg-black/40'>
				<div>
					<p className="font-[500] lg:font-[600] text-[0.75rem]">Xxible Chat</p>
				</div>

				<div className="card-info text-white">
					<div className='details'>
						<p className='cat w-[80%] sm:w-full lg:w-[70%] xl:w-full text-[0.938rem] leading-4 sm:text-[0.69rem] sm:leading-[0.69rem] md:text-sm md:leading-[0.875rem] lg:text-base lg:leading-4 font-[600] text-stone-100'>{cardData.content}</p>						
					</div>
					<button className="flex items-center uppercase text-[0.6rem] text-white py-2 px-3 mt-[8px] bg-black/40 rounded-[25px]"><span className="mr-2">Join the vibe</span> <ChevronRight className="w-4 h-4 mb-[3px]" /> </button>
				</div>
			</div>
		</div>
	</>
  )
}

export default EventCard3