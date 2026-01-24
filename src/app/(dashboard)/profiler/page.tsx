"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { MapPin } from "lucide-react";
import ProfileTab from "./components/profileTab/profileTab";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import UpcomingEventCard from "@/components/utility/cards/upcoming-event-card/upcomingEventCard";
import FollowClubCard from "@/components/utility/cards/follow-club-card/followClubCard";
import { eventsData } from "../home/data/events";
import { clubData } from "../home/data/clubData";
import { getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";


const page = () => {

	const profileItems = ["Link Up", "Karaoke", "House Party", "Dancing"];
	const [date, setDate] = useState<Date | undefined>(new Date());

  return (
	<div className=" grid grid-cols-1 lg:grid-cols-[75%_1fr] 2xl:grid-cols-[80%_1fr] bg-[#191A1A]">
		{/* 1st Partition */}
		<div className="border-r-2 border-[#343434] min-w-0">
			<div className="bg-[#221922] py-2.5 px-6 md:px-12 flex items-center justify-between text-[#f5f5f5]">
				<div>
					<p className="font-[600] text-xl leading-none">Event Recap</p>
					<p className="font-[400] text-base text-[#A0A0A0] leading-none mt-1.5">22 event attended</p>
				</div>	

				<div className='flex items-center gap-4'>
					<div className="p-2.5 bg-[#393939] rounded-full cursor-pointer">
						<Icon icon="akar-icons:globe" width="24" height="24" className="h-5 w-5 lg:h-7 lg:w-7" />
					</div>

					<div className="p-2.5 bg-[#393939] rounded-full cursor-pointer">
						<Icon icon="solar:graph-new-up-linear" width="24" height="24" className="h-5 w-5 lg:h-7 lg:w-7" />
					</div>
				</div>
			</div>


			<div className="p-5 lg:p-7">
				<div className="rounded-3xl border border-[#212121] bg-[url('/assets/img/profbg.png')] bg-cover bg-center bg-no-repeat px-5 lg:px-10 py-7">
					<div className="lg:flex justify-between">
						<div className="lg:flex gap-6">
							<div className="border-[0.38rem] border-[#FCDDEC] rounded-full h-40 w-40 lg:h-44 lg:w-44 bg-black bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://images.pexels.com/photos/2291450/pexels-photo-2291450.jpeg')"}}></div>
							<div className="mt-5 lg:mt-0">
								<p className="text-2xl lg:text-3xl font-[600] text-[#f5f5f5] leading-none">Tracy Williams</p>
								<p className="text-sm lg:text-base font-[400] text-[#A0A0A0] leading-none mt-1.5 lg:mt-2">Tracywilliams@gmail.com</p>
								<div className="flex items-center gap-1 mt-3">
									<Icon icon="solar:link-minimalistic-2-bold" width="24" height="24" className="text-[#A0A0A0] w-4 h-4 lg:h-5 lg:w-5" />
									<p className="text-[#0080FF] text-sm lg:text-base font-[400]">xxible.events</p>
								</div>
								<p className="mt-3 font-[400] text-base leading-5 lg:text-[1.15rem] lg:leading-[1.35rem] w-full lg:w-[32.15rem] text-[#f5f5f5]">
									Dolore sapiente eaque molestias at itaque error sit et. Aut neque amet est. Tenetur aliquam dolore sed delectus ut.
								</p>
								<div className="lg:flex items-center gap-3 mt-4">
									<div className="flex items-center gap-1 text-[#f5f5f5]">
										<p className="text-base font-[400]">Interests</p>
										<Icon icon="mage:stars-b" width="24" height="24" className="h-6 w-6" />
									</div>

									<div className="flex items-center flex-wrap gap-3 mt-3 lg:mt-0">
										{profileItems.map((item, i) => (
											<div key={i} className="border border-[#838383] bg-[#5353538A] text-sm lg:text-base py-1 lg:py-2 px-4 rounded-3xl text-[#f5f5f5]">
												<p className="whitespace-nowrap">{item}</p>
											</div>
										))}
									</div>
								</div>

								<div className="mt-7 grid grid-cols-1 lg:flex items-center gap-4 lg:gap-6">
									<div className="text-[#A0A0A0] flex items-center gap-2.5 lg:gap-1.5">
										<MapPin className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 mb-[2px] text-[#A0A0A0]" />
										<p className="font-[400] text-sm lg:text-base">Abuja</p>
									</div>

									<div className="text-[#A0A0A0] flex items-center gap-2.5 lg:gap-1.5">
										<Icon icon="simple-line-icons:calender" width="1024" height="1024" className="w-3 h-3 lg:w-4 lg:h-4" />
										<p className="font-[400] text-sm lg:text-base">Joined October 2020</p>
									</div>

									<div className="text-[#A0A0A0] flex items-center gap-2.5 lg:gap-1.5">
										<Icon icon="solar:bolt-outline" width="24" height="24" className="h-4 w-4 lg:h-5 lg:w-5" />
										<p className="font-[400] text-sm lg:text-base">22 Event Attended</p>
									</div>

									<div className="text-[#A0A0A0] flex items-center gap-2.5 lg:gap-1.5">
										<Icon icon="akar-icons:globe" width="24" height="24" className="h-4 w-4 lg:w-5 lg:h-5 text-[#A0A0A0]" />
										<p className="font-[400] text-sm lg:text-base">Following <span className="text-[#f5f5f5]">30</span> Brands</p>
									</div>
								</div>
							</div>
						</div>


						<button className="mt-10 lg:mt-0 py-2.5 px-6 text-base font-[500] text-[#231F20] hover:text-[#6f326b] bg-[#f5f5f5] transition rounded-full w-full lg:w-fit h-fit whitespace-nowrap">Edit Profile</button>
					</div>
				</div>


				<div className="mt-10">
					<ProfileTab />
				</div>
			</div>
		</div>


		{/* 2nd Partition */}
		<div className="hidden lg:block p-4 lg:p-5">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-lg border bg-[#1d1d1f]"
				classNames={{
					selected: "bg-[#FF00EA] rounded-lg",
					today: "bg-[#FF00EA] rounded-lg"
				}}
			/>


			<div>
				<div className="mt-10">
					<p className="font-[600] text-base text-[#F5F5F5]">Upcoming events </p>
				</div>

				<div className="mt-6">
					{eventsData.map((_event, index)=>(			
						<UpcomingEventCard key={index} 
										   event={_event} 
										   eventNumber={Number(index + 1)} 
										/>
					))}	
				</div>
			</div>


			<div>
				<div className="mt-[3.4rem]">
					<p className="font-[600] text-base text-[#F5F5F5]">Brands to follow</p>
				</div>

				<div className="mt-6">
					{clubData.map((club, index)=>(
						<FollowClubCard key={index} 
										clubData={club} 
										/>
					))}	
				</div>

				<div className="mt-6">
					<p className="text-[#007AFF] font-[500] text-sm 2xl:text-base cursor-pointer">Show all</p>
				</div>
			</div>
		</div>
	</div>
  )
}

export default page;