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
		<div className="card5 mr-10 relative h-[250px] w-[250px] rounded-full" style={{background: `url(${cardData.image})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
			<div className="absolute bottom-[20px] right-0 rounded-[25px] bg-[#F800E9] text-[#FFFFFF] py-[3px] px-5 text-[24px] font-[600]">
				<p>{cardData.location}</p>
			</div>
		</div>
	</>
  )
}

export default EventCard4