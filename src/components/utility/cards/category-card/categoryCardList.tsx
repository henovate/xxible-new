"use client";
import CategoryCard, {CardPropType} from "./categoryCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import "swiper/css";
import "../../../../../public/styles/swiper.css";


interface CategoryListProps {
	cards?: CardPropType[],
	sliderType?: number,
}

const CategoryCardList = ({cards, sliderType}:CategoryListProps) => {
  return (
	<Swiper
      spaceBetween={20}
      slidesPerView={6}
	  autoplay={{
		delay: 2500,
		disableOnInteraction: false,
	  }}
	  breakpoints={{
        // when window width is >= 1024px
        1024: {
          slidesPerView: 6,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 4,
        },
        // when window width is >= 0px
        0: {
          slidesPerView: 2,
        },
      }}
	  modules={[Autoplay]}
	  className="flex justify-between items-center gap-3 w-full h-[300px]"
    >
      	{cards?.map((cardData, i) => (
			<SwiperSlide className={` ${sliderType == 2? "swiper-slide" : null}`}>
			<CategoryCard key={i} cardData={cardData}/>
		</SwiperSlide>
		))}
    </Swiper>
  )
}

export default CategoryCardList