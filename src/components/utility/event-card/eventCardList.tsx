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
	  breakpoints={{
		// when window width is >= 1536px
		1536: {
			slidesPerView: 4,
			spaceBetween: 20
		},
		 // when window width is >= 1024px
		1028: {
			slidesPerView: 3,
			spaceBetween: 50
		},
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
		  spaceBetween: 20
        },
        // when window width is >= 768px
        640: {
          slidesPerView: 2,
        },
        // when window width is >= 0px
        0: {
          slidesPerView: 1,
        },
      }}
	  modules={[Autoplay]}
	  className="grid grid-cols-3 items-center h-[428px] 2xl:h-[33rem] w-full"
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