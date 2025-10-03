"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import "swiper/css";

interface SwiperSliderProps {
	Card: React.ComponentType<any>;
	arrayData: any[];
	cardHeightClass?: string;
}


const SwipeSlider = ({arrayData, Card, cardHeightClass}:SwiperSliderProps) => {
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
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 0px
        0: {
          slidesPerView: 1,
        },
      }}
	  modules={[Autoplay]}
	  className={`grid grid-cols-3 w-full ${cardHeightClass}`}
    >
      	{arrayData.map((item, index) => (
			<SwiperSlide key={index} className='h-full w-full bg-black'>
				<Card data={item}/>
			</SwiperSlide>
		))}
    </Swiper>
  )
}

export default SwipeSlider
