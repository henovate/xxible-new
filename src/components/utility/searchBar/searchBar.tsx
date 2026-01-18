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
  inputTextClassName?: string;
  iconClassName?: string;
  dividerClassName?: string;
  selectClassName?: string;
}

export const selectList = ["Lagos, NG", "Abuja, NG", "Kano, NG", "Ibadan, NG"];

const SearchBar = ({
  widthAndBorderColorClass = "max-w-2xl 2xl:p-[3px] bg-[linear-gradient(271.95deg,#7B0093_-30.8%,#F3DAFF_92.81%)]",
  bgColorClass = "bg-black",
  selectWidth = "min-w-[100px] sm:min-w-[120px] lg:min-w-[140px]",
  searchBtnBgAndTextColor = "bg-white text-gray-900 hover:bg-gray-100",
  searchInput="",
  inputTextClassName = "text-[#f5f5f5] placeholder-[#f5f5f5]",
  iconClassName = "text-[#f5f5f5]",
  dividerClassName = "bg-gray-600",
  selectClassName = "border-none bg-transparent text-white text-xs sm:text-sm lg:text-xs 2xl:text-base !h-auto !min-h-0 !py-0"
}: SearchBarProps) => {
  return (
    <>
      <div
        className={`rounded-full p-[2px] sm:p-[3px] lg:p-[1px] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl ${widthAndBorderColorClass}`}
      >
        <form
          className={`flex items-center rounded-full px-2 sm:px-3 lg:px-1 lg:pl-3 py-1.5 sm:py-2 lg:py-1 border-gray-70 border-[2px] border-transparent [border-image-slice:1] ${bgColorClass}`}
        >
          <Search className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-3 flex-shrink-0 ${iconClassName}`} />
          <input
            type="text"
            name="search"
            placeholder="Beach Party"
            className={`flex-1 bg-transparent outline-none text-xs sm:text-sm lg:text-xs 2xl:text-base min-w-0 mr-1 sm:mr-0 ${inputTextClassName} ${searchInput}`}
          />
          <div className={`w-px h-3 sm:h-4 mx-2 sm:mx-3 hidden sm:block ${dividerClassName}`}></div>
          <div className={`min-w-0 hidden sm:block ${selectWidth}`}>
            <SelectComponent 
                arrayItemType="array"
                label="Location" 
                selectArrayItems={selectList} 
                placeholder="Lagos NG" 
                className={selectClassName}
                selectItemClassName="data-[highlighted]:bg-[#F800E9] data-[highlighted]:font-[600]"
                />
          </div>
          <button
            type="submit"
            className={`ml-1 sm:ml-3 px-1.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm lg:text-xs 2xl:text-base font-medium transition-colors flex items-center gap-1 sm:gap-2 flex-shrink-0  ${searchBtnBgAndTextColor}`}
          >
            <Search className="w-3 h-3 sm:w-4 sm:h-4 lg:w-3.5 lg:h-3.5 2xl:w-4 2xl:h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
      </div>
    </>
  )
}

export default SearchBar
