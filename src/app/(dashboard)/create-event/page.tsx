"use client";

import { Progress } from "@/components/ui/progress";
import { tabItems } from "./tabItems";
import EventBasics from "./eventBasics/eventBasics";
import { useSearchParams } from "next/navigation";
import DateAndTime from "./dateAndTime/dateAndTime";
import { useState } from "react";
import Location from "./location/location";
import Tickets from "./tickets/tickets";
import OrganizerInfo from "./organizerInfo/organizerInfo";
import Publish from "./publish/publish";
import { Icon } from "@iconify/react/dist/iconify.js";


const page = () => {	
	const searchParams = useSearchParams();
	const [step, setStep] = useState<number>(1);
	const nextStep = searchParams.get("page");

	const stagePercentage = (currentStage:number, totalNo:number) => {
		return (currentStage/totalNo) * 100
	}

	const stageProgress = Math.round(stagePercentage(Number(nextStep), tabItems.length));

	const renderPage = (step:number) => {

		switch (step) {
			case 1:
				return <EventBasics setStep={setStep}/>;
			case 2:
				return <DateAndTime setStep={setStep}/>;
			case 3:
				return <Location setStep={setStep}/>;
			case 4:
				return <Tickets setStep={setStep}/>;
			case 5:
				return <OrganizerInfo setStep={setStep}/>;
			case 6:
				return <Publish setStep={setStep}/>;	
			default:
				return <EventBasics setStep={setStep}/>;
		}
	  };

  return (
	<div className="px-3 py-3 lg:p-7 xl:px-16 xl:py-11">
	  <div className="bg-[#1F1F1F] border border-[#343434] rounded-3xl py-5 px-3 lg:px-7 lg:py-9 xl:py-12 xl:px-[8.935rem]">
		<div className="flex flex-col items-center">
			<p className="text-2xl leading-6 lg:text-[2rem] lg:leading-[2rem] xl:text-[2.5rem] md:leading-[2.5rem] text-[#f5f5f5] font-[600]">Post Event</p>
			<p className="mt-2 xl:mt-3 text-[#A0A0A0] text-sm xl:text-xl leading-none font-[400] text-center md:text-start">Bring the nightlife to life with your amazing event</p>
		</div>

		<div className="w-full py-5 md:py-9 px-5 bg-[#232323] border border-[#343434] mt-7 md:mt-[3.45rem] rounded-[0.75rem]">
			<div className="flex justify-between items-center">
				<p className="text-base xl:text-2xl text-[#f5f5f5] font-[600]">Step {nextStep} of {tabItems.length}</p>
				<p className="text-sm xl:text-xl text-[#A0A0A0] font-[500]">{stageProgress}% complete</p>
			</div>
			<Progress value={stageProgress} className="mt-3 md:mt-7 text-[#F800E9]"/>
		</div>

		<div className="mt-9 flex flex-wrap items-center gap-3 md:gap-5">
			{tabItems.map((item, index) => (
				<div 
					key={index} 
					className={`flex items-center gap-[0.4rem] px-3 py-1 md:py-2 rounded-full text-[0.7rem] lg:text-[0.94rem] font-[500] whitespace-nowrap 
						${Number(nextStep) - 1 === index? "bg-[#F800E9] text-[#f5f5f5]" : "border border-[#787878] text-[#C2C2C2]"}
						${Number(nextStep) - 1 > index && "bg-[#102D18] border border-[#33861D]"}
						`}>
					<Icon icon="ic:round-check" width="24" height="24" className={`h-5 w-5 ${Number(nextStep) - 1 > index? "block" : "hidden"} `}/>
					{item}
				</div>
			))}
		</div>

		<div className="mt-[4.75rem]">
			{renderPage(Number(nextStep))}
		</div>
	  </div>
	</div>
  )
}

export default page