"use client"
import EventCard, { cardType } from "./eventCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import "swiper/css";


interface EventCardListProps {
	cards: cardType[]
}

const EventCardList = ({cards}:EventCardListProps) => {
  return (
	<Swiper
      spaceBetween={50}
      slidesPerView={3}
	  autoplay={{
		delay: 2500,
		disableOnInteraction: false,
	  }}
	  modules={[Autoplay]}
	  className="grid grid-cols-3 items-center h-[428px] w-full"
    >
      	{cards.map((item, index) => (
			<SwiperSlide>
				<EventCard cardDetails={item} key={index}/>
			</SwiperSlide>
		))}
    </Swiper>
  )
}

export default EventCardList;