"use client";

import { Progress } from "@/components/ui/progress";
import { tabItems } from "./tabItems";
import EventBasics from "./eventBasics/eventBasics";
import { Icon } from "@iconify/react/dist/iconify.js";
import NextPreviousBtn from "../components/nextPreviousBtn/nextPreviousBtn";

interface createEventProps {
	children: React.ReactNode
}


const page = () => {

  return (
	<div className="px-3 py-3 xl:px-16 xl:py-11">
	  <div className="bg-[#1F1F1F] border border-[#343434] rounded-3xl py-5 px-3 xl:py-12 xl:px-[8.935rem]">
		<div className="flex flex-col items-center">
			<p className="text-2xl leading-6 lg:text-[2rem] lg:leading-[2rem] xl:text-[2.5rem] md:leading-[2.5rem] text-[#f5f5f5] font-[600]">Post Event</p>
			<p className="mt-2 xl:mt-3 text-[#A0A0A0] text-sm xl:text-xl leading-none font-[400] text-center md:text-start">Bring the nightlife to life with your amazing event</p>
		</div>

		<div className="w-full py-5 md:py-9 px-5 bg-[#232323] border border-[#343434] mt-7 md:mt-[3.45rem] rounded-[0.75rem]">
			<div className="flex justify-between items-center">
				<p className="text-base xl:text-2xl text-[#f5f5f5] font-[600]">Step 1 of 6</p>
				<p className="text-sm xl:text-xl text-[#A0A0A0] font-[500]">13% complete</p>
			</div>
			<Progress value={33} className="mt-3 md:mt-7 text-[#F800E9]"/>
		</div>

		<div className="mt-9 flex flex-wrap items-center gap-3 md:gap-5">
			{tabItems.map((item, index) => (
				<div key={index} className="px-3 py-1 md:py-2 border border-[#787878] text-[#C2C2C2] rounded-full text-[0.7rem] lg:text-[0.94rem] font-[500] whitespace-nowrap cursor-pointer">
					{item}
				</div>
			))}
		</div>

		<div className="mt-[4.75rem]">
			<EventBasics />
		</div>
	  </div>
	</div>
  )
}

export default page