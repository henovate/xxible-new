"use client";

import { Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
	widthAndBorderColorClass?: string;
	bgColorClass?: string;
}

const SearchBar = ({ widthAndBorderColorClass='max-w-2xl  bg-[linear-gradient(271.95deg,#7B0093_-30.8%,#F3DAFF_92.81%)]', bgColorClass="bg-black"  }: SearchBarProps) => {
  return (
	<>
		 <div className={`flex-1  mx-20 rounded-full p-[3px] ${widthAndBorderColorClass}`}>
			<form className={`flex items-center rounded-full px-4 py-2 border-gray-70 border-[2px] border-transparent [border-image-slice:1] ${bgColorClass}`}>
				<Search className="w-4 h-4 text-gray-400 mr-3" />
				<input 
					type="text" 
					name="search" 
					placeholder="Beach Party"
					className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm 2xl:text-base"
				/>
				<div className="w-px h-4 bg-gray-600 mx-3"></div>
				<div className="min-w-[140px]">
					<Select>
						<SelectTrigger className="border-none bg-transparent text-white text-sm 2xl:text-base h-auto p-0 focus:ring-0">
							<SelectValue placeholder="Lagos, NG" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Location</SelectLabel>
								<SelectItem value="lagos">Lagos, NG</SelectItem>
								<SelectItem value="abuja">Abuja, NG</SelectItem>
								<SelectItem value="kano">Kano, NG</SelectItem>
								<SelectItem value="ibadan">Ibadan, NG</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<button 
					type="submit"
					className="ml-3 bg-white text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium 2xl:text-base hover:bg-gray-100 transition-colors flex items-center gap-2"
				>
					<Search className="w-4 h-4" />
					Search
				</button>
			</form>
		</div>
	</>
  )
}

export default SearchBar
