"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import NextEvent from "../components/nextEvent/nextEvent";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { categoryList } from "./categoryList";
// import { eventsData } from "@/components/utility/cards/event-card2/events";
import EventCard2 from "@/components/utility/cards/event-card2/eventCard2";
import { eventsData } from "./events";


const page = () => {
  return (
	<div className="grid grid-cols-1 lg:grid-cols-[80%_1fr] bg-[#191A1A]">
	  <div className="text-gray-600 border-r-2 border-[#343434] p-2.5 md:p-4">		
		<div className="w-full md:h-[18.5rem] bg-[url('/assets/img/db1.jpg')] md:bg-[url('/assets/img/db.png')] border border-[#5B5B5B] bg-[#000000a3] md:bg-[#00000052] bg-blend-overlay bg-cover bg-center rounded-2xl md:rounded-3xl md:flex justify-end">
			<div className="md:w-[50%] py-10 px-4 sm:py-8 md:py-0 md:px-0 md:pr-3 text-white flex flex-col justify-center">
				<p className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#ec7ee1] to-[#FF00EA] overflow-visible text-2xl leading-6 md:leading-8 md:text-3xl font-[600]">
					Find the Night. Live the Vibe.
				</p>
				<p className="w-[75%] sm:w-[60%] md:w-[75%] mt-4 text-base leading-4 md:leading-5 font-[500] text-[#A0A0A0]">Discover parties, connect with the crowd, and never miss a night out again.</p>
				<p className="font-[500] text-[0.75rem] mt-[0.75rem] text-[#E9E9E9]">Clubs • Events • Afterparties – All in One App</p>

				<div className="flex flex-row gap-3 mt-8 md:mt-11">
					<a href="#" className="inline-block">
						<div className="bg-black rounded-lg px-3 py-1.5 flex items-center space-x-2 border border-[#A6A6A6]">
							<Icon icon="logos:google-play-icon" width="256" height="283" className="h-5 w-5"/>
							<div className="text-left">
								<div className="text-[0.48rem] leading-[0.3rem] text-gray-300">GET IT ON</div>
								<div className="text-sm font-semibold">Google Play</div>
							</div>
						</div>
						</a>
						<a href="#" className="inline-block">
						<div className="bg-black rounded-lg px-3 py-1.5 flex items-center space-x-2 border border-[#A6A6A6]">
							<Icon icon="ri:apple-fill" width="24" height="24" className="h-5 w-5" />
							<div className="text-left">
								<div className="text-[0.48rem] leading-[0.3rem] text-gray-300">Download on the</div>
								<div className="text-sm font-semibold">App Store</div>
							</div>
						</div>
					</a>
               </div>
			</div>			
		</div>	


		<div className="mt-6">
			<p className="font-[600] text-2xl text-[#F5F5F5]">Event In Lagos</p>
		</div>
	
		<div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar w-full max-w-full snap-x snap-mandatory">
			{categoryList.map((category, index) => (
				<Badge key={index} variant={"outline"} className="bg-[#393939] py-3 px-2 text-sm cursor-pointer whitespace-nowrap rounded-lg">{category}</Badge>
			))}
		</div>

		<div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
			{eventsData.map((_event, index) => (
				<EventCard2 key={index} 
							event={_event} 
							bgClassName="bg-[#232323]" 
							titleAndCompanyTextColor="text-[#F5F5F5]"
							cardInfoTextColor="text-[#A0A0A0]"
							imgHeight="h-[16rem]"
							curveDesignColor="bg-[#191A1A]"
							titleFontSize="2xl:text-xl 2xl:leading-6"
							eventInfoFontSize="2xl:text-xs 2xl:leading-4"
							locationFontSize="2xl:text-sm 2xl:leading-[1.1rem]"
							/>
			))}
		</div>
	  </div>
	  <div>
		
	  </div>
	</div>
  )
}

export default page
