"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import CategoryFilter from "../components/categoryFilter/categoryFilter";
import SelectComponent from "@/components/selectComp/selectComp";
import { categories, eventFilters, eventsData } from "./selectData/selectData";
import { selectList } from "@/components/utility/searchBar/searchBar";
import NextEventCard from "../components/nextEventCard/nextEventCard";
import { nextEventList } from "../components/nextEventCard/next-events";
import Pagination from "@/components/pagination/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EventLayoutProps {
	children: React.ReactNode;
}

const EventLayout = ({children}:EventLayoutProps) => {
	const router = useRouter();
	const totalPage:number = eventsData.length/6
	const [currentPage, setCurrentPage] = useState<number>(1);

  return (
	<div className="grid grid-cols-1 lg:grid-cols-[75%_1fr] 2xl:grid-cols-[80%_1fr] bg-[#191A1A]">
		{/* 1st Partition */}
		<div className="text-gray-600 border-r-2 border-[#343434] min-w-0">
	 		<div className="bg-[#221922] text-xl sm:text-2xl py-5 pl-5 pr-5 xl:pl-16 xl:pr-10 flex items-center justify-between text-[#f5f5f5]">
				<p className="font-[600]">Events</p>
				<div className={`flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:bg-[#f5f5f5] transition rounded-full p-2 2xl:p-2.5 cursor-pointer bg-[#F800E9]`}>
					<Icon icon="fluent:add-32-filled" width="24" height="24" className={`h-4 w-4 2xl:w-6 2xl:h-6 group-hover:text-zinc-900 text-[#f5f5f5]`}/>
				</div>
			</div>

			<div className="mt-11 px-4 md:px-5">
				<CategoryFilter />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-9">
					<SelectComponent
						arrayItemType="array" 
						selectArrayItems={categories} 
						placeholder="Category" 
						className="w-full py-4 rounded-xl text-base font-[400] pl-4 focus-visible:ring-offset-0 outline-none #4A4A4A text-[#6F747E] bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] shadow-inner shadow-[inset_0_0_20px_#FC89FF2B]]" 
						selectItemClassName="data-[highlighted]:font-[600] data-[highlighted]:bg-[#F800E9] data-[highlighted]:text-[#F5f5f5] font-[400] text-base"
						/>

					<SelectComponent
						arrayItemType="array" 
						selectArrayItems={selectList} 
						placeholder="All Area" 
						className="w-full py-4 rounded-xl text-base font-[400] pl-4 focus-visible:ring-offset-0 outline-none #4A4A4A text-[#6F747E] bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] shadow-inner shadow-[inset_0_0_20px_#FC89FF2B]]" 
						selectItemClassName="data-[highlighted]:font-[600] data-[highlighted]:bg-[#F800E9] data-[highlighted]:text-[#F5f5f5] font-[400] text-base"
						/>

					<SelectComponent
						arrayItemType="object" 
						selectArrayOfObjectItems={eventFilters} 
						placeholder="Upcoming" 
						className="w-full py-4 rounded-xl text-base font-[400] pl-4 focus-visible:ring-offset-0 outline-none #4A4A4A text-[#6F747E] bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] shadow-inner shadow-[inset_0_0_20px_#FC89FF2B]]" 
						selectItemClassName="data-[highlighted]:font-[600] data-[highlighted]:bg-[#F800E9] data-[highlighted]:text-[#F5f5f5] font-[400] text-base"
						/>
				</div>


				{children}



				<div className="mt-24 mb-10 flex justify-center">
					<Pagination totalPage={10} currentPage={currentPage} onPageChange={setCurrentPage} delta={2}/>
				</div>
				
			</div>
		</div>

		{/* 2nd Partition */}
		<div className="hidden lg:block pt-[2.7rem] px-4 md:px-5 xxl:bg-pink-600">
			<p className="text-base font-[500] text-[#f5f5f5]">Trending This Week</p>
			<div className="mt-[0.9rem] space-y-5">
				{nextEventList.map((_event, index) => (
					<NextEventCard key={index} 
							       event={_event}
								   titleClassName="text-base"
								   locationClassName="text-base"
								   timeClassName="text-base"
								   imageClassName="w-[5rem] h-[5rem]"
								   cardUse="trending"
								   iconSizeClassName="w-3 h-3 sm:w-4 sm:h-4" 
							  	 />
				))}
			</div>
		</div>
	</div>
  )
}

export default EventLayout;