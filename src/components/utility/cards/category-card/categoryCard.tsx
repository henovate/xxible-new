"use client";

import Image from "next/image";
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
		<div className='card1 flex h-full flex-col items-start gap-4 rounded-2xl bg-white p-4 shadow-[0px_8px_30px_rgba(0,0,0,0.08)]'>
			<div className='flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50'>
				<Image width={28} height={28} src={cardData.image} alt={cardData.eventType} className="h-7 w-7 object-contain"/>
			</div>
			<div className='space-y-1'>
				<p className='text-sm font-[600] text-[#212121]'>{cardData.eventType}</p>
				<p className='text-xs text-zinc-500'>{cardData.eventCategory}</p>
			</div>
		</div>
	</>
  )
}

export default CategoryCard
