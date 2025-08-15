"use client"

import Image from 'next/image';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import like from "../../../../../public/assets/img/like.png";
// import { SplideSlide } from "@splidejs/react-splide";
import { SwiperSlide } from 'swiper/react';

export interface cardType {
	id: number
	image: string,
	// eventCategory: string,
	// eventType: string,
	// eventLocation: string,
	// eventTime: string,
	// eventAmount: number | string
	// eventInterest: string
}


interface EventCardProps {
	cardDetails: cardType,
	key: string | number
}

const EventCard = ({cardDetails}:EventCardProps) => {
  return (
	<>
		 {/* <SwiperSlide> */}
			<div className='card2 relative h-[400px] xl:h-[428px] 2xl:h-[500px] rounded-2xl overflow-hidden' style={{background: `url(${cardDetails.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
				<div className='card absolute inset-0 flex flex-col justify-between bg-black/40'>
					<div className='pl-5 pt-5'>
						<div className='cardNum h-[69.74px] w-[80.74px] border-[#0E101A] border-4 rounded-[11.6px] flex justify-center items-center text-[36px] font-[900] bg-zinc-900'>
							<p>{`0${cardDetails.id}`}</p>
						</div>
					</div>
				
					<div className='relative h-[33%] w-full'>
						<div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10" />
						<div className="card-info absolute z-20 inset-0 text-white px-5 pt-[9px]">
							<div className='details2'>
								<p className='cat text-[13px] leading-[15px] text-stone-100 font-[600]'>Top Ten</p>
								<p className='type text-[20px] leading-[20px] mt-2 font-[600]'>Unleashing XXible Nightlife</p>
							</div>


							<div className='mt-4 w-[80%] flex justify-between items-center text-[13px] font-[500]'>
								<div>
									<div className="flex items-center gap-2">
										<MapPin className="w-4 h-4 text-white mb-1" />
										<span>VGC, Ajah</span>
									</div>

									<div className="flex items-center gap-2 mt-[12px]">
										<Calendar className="w-4 h-4 text-white mb-1" />
										<span>Jun 13, 6PM</span>
									</div>
								</div>

								
								<div>
									<div className="flex items-center gap-2">
										<Ticket className="w-4 h-4 text-white mb-1" />
										<span>₦50,000</span>
									</div>

									<div className="flex items-center gap-2 mt-[12px]">
										<div className='h-[15px] w-[15px] mb-1'>
											<Image src={like} alt="right arrow" className="w-full h-full"/>
										</div>
										<span className="text-gray-300">50 Interested</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        {/* </SwiperSlide> */}
	</>
  )
}

export default EventCard