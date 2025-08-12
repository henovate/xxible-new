"use client"

import CategoryCardList from '../utility/category-card/categoryCardList';
import { events } from './events';
import EventCardList from '../utility/event-card/eventCardList';
import { eventType } from './eventType';
// import EventCard4List from '../utility/event-card4/eventCard4List';
import { data } from '../utility/event-card4/data';

interface Swiper1PropType{
	cardType: number,
}

const SwiperSlider = ({cardType}:Swiper1PropType) => {
  return (
    <div>
		{
		cardType == 1? (<CategoryCardList cards={events} sliderType={2}/>)
		: (<EventCardList cards={eventType}/>)
		}
	</div>
)}

export default SwiperSlider;