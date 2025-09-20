"use client"

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectComponent from "@/components/selectComp/selectComp";

interface SearchBarProps {
  widthAndBorderColorClass?: string;
  bgColorClass?: string;
  selectWidth?: string;
  searchBtnBgAndTextColor?: string;
  searchInput?: string;
}

export const selectList = ["Lagos, NG", "Abuja, NG", "Kano, NG", "Ibadan, NG"];

const SearchBar = ({
  widthAndBorderColorClass = "max-w-2xl bg-[linear-gradient(271.95deg,#7B0093_-30.8%,#F3DAFF_92.81%)]",
  bgColorClass = "bg-black",
  selectWidth = "min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]",
  searchBtnBgAndTextColor = "bg-white text-gray-900 hover:bg-gray-100",
  searchInput=""
}: SearchBarProps) => {
  return (
    <>
      <div
        className={`rounded-full p-[2px] sm:p-[3px] lg:p-[2px] 2xl:p-[3px] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl ${widthAndBorderColorClass}`}
      >
        <form
          className={`flex items-center rounded-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 border-gray-70 border-[2px] border-transparent [border-image-slice:1] ${bgColorClass}`}
        >
          <Search className="w-3 h-3 sm:w-4 sm:h-4 text-[#f5f5f5] mr-1 sm:mr-3 flex-shrink-0" />
          <input
            type="text"
            name="search"
            placeholder="Beach Party"
            className={`flex-1 bg-transparent text-[#f5f5f5] placeholder-[#f5f5f5] outline-none text-xs sm:text-sm lg:text-base min-w-0 mr-1 sm:mr-0 ${searchInput}`}
          />
          <div className="w-px h-3 sm:h-4 bg-gray-600 mx-2 sm:mx-3 hidden sm:block"></div>
          <div className={`min-w-0 hidden sm:block ${selectWidth}`}>
            <SelectComponent 
                label="Location" 
                selectItems={selectList} 
                placeholder="Lagos NG" 
                className="border-none bg-transparent text-white text-xs sm:text-sm lg:text-base h-auto p-0"
                selectItemClassName="data-[highlighted]:bg-[#F800E9] data-[highlighted]:font-[600]"
                />
          </div>
          <button
            type="submit"
            className={`ml-1 sm:ml-3 px-1.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-colors flex items-center gap-1 sm:gap-2 flex-shrink-0  ${searchBtnBgAndTextColor}`}
          >
            <Search className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
      </div>
    </>
  )
}

export default SearchBar
