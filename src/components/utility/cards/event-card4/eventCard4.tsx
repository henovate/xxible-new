"use client";

export interface CardDataType {
	image: string;   
	location: string;
}

interface EventCard4Props {
	cardData: CardDataType;
	key: number | string
}

const EventCard4 = ({cardData}:EventCard4Props) => {
  return (
	<>
		<div className="card5 mr-10 relative h-44 w-44 sm:h-[15.65rem] sm:w-[15.65rem] rounded-full" style={{background: `url(${cardData.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
			<div className="absolute bottom-[20px] right-0 rounded-[25px] bg-[#F800E9] text-[#FFFFFF] py-[3px] px-5 text-base sm:text-[1.5rem] font-[600]">
				<p>{cardData.location}</p>
			</div>
		</div>
	</>
  )
}

export default EventCard4