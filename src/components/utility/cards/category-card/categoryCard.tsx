"use client";

import Image from "next/image";
import arrow from "../../../../../public/assets/img/rightarrow.png";
import { SwiperSlide } from "swiper/react";
// import { SplideSlide } from "@splidejs/react-splide";

export interface CardPropType {
	image: string,
	id: number,
	eventType: string,
	eventCategory: string
}

interface CardProps{
	cardData: CardPropType,
	key: number | string
}

const CategoryCard = ({cardData}:CardProps) => {
  return (
	<>
		<div className='card1 relative h-[12.5rem] sm:h-[19rem] md:h-[12.5rem] lg:h-[11.3rem] xl:h-[15.65rem] 2xl:h-[18.8rem] bg-cover rounded-2xl overflow-hidden' style={{background: `url(${cardData.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
			<div className='card absolute inset-0 flex flex-col justify-end p-3 md:p-2 xl:p-4 bg-black/40'>
				<div className="card-info text-white">
					<div className='details'>
						<p className='cat text-[9px] leading-[9px] sm:text-[11px] sm:leading-[11px]  md:text-[7px] md:leading-[7px] xl:text-[9.24px] xl:leading-[9.24px] 2xl:text-[12px] 2xl:leading-[12px] font-[600] text-stone-100'>{cardData.eventCategory}</p>
						<div className='flex justify-between items-center'>
							<p className='type mt-2 text-base leading-[16px] sm:text-[1.06rem] sm:leading-[1.06rem] md:text-sm md:leading-[0.875rem] xl:text-[1.25rem] xl:leading-[1.25rem] font-[600]'>{cardData.eventType}</p>
							<div className='rounded-full bg-black/40 w-[25px] h-[25px] flex items-center justify-center'>
								<div className='h-[15px] w-[15px]'>
									<Image width={15} height={15} src={arrow} alt="right arrow" className="w-full h-full"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
  )
}

export default CategoryCard