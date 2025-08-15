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
		<div className='card1 relative h-[200px] sm:h-[250px] lg:h-[180px] xl:h-[250px] 2xl:h-[300px] bg-cover rounded-2xl overflow-hidden' style={{background: `url(${cardData.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
			<div className='card absolute inset-0 flex flex-col justify-end p-3 md:p-2 xl:p-4 bg-black/40'>
				<div className="card-info text-white">
					<div className='details'>
						<p className='cat text-[9px] leading-[9px] sm:text-[11px] sm:leading-[11px]  md:text-[7px] md:leading-[7px] xl:text-[9.24px] xl:leading-[9.24px] font-[600] text-stone-100'>{cardData.eventCategory}</p>
						<div className='flex justify-between items-center'>
							<p className='type mt-2 text-[16px] leading-[16px] sm:text-[17px] sm:leading-[17px] md:text-[14px] md:leading-[14px] xl:text-[20px] xl:leading-[20px] font-[600]'>{cardData.eventType}</p>
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