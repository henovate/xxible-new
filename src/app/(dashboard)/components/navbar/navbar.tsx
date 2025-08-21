"use client"

import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import SearchBar from "@/components/utility/searchBar/searchBar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-black text-white h-[4rem] sm:h-[5rem] xl:h-[5.9rem] w-full flex items-center px-4 sm:px-8 lg:px-[3.5rem] border-b-2 border-[#343434]">
      <div className="xl:hidden flex items-center gap-3 flex-1">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black border-gray-700 w-80 flex flex-col justify-between">
            <div className="flex flex-col gap-6 mt-6">
              {/* Logo + dropdown in mobile menu */}
              <div className="flex items-center gap-2">
                <div className="h-[2.4rem] w-[2.4rem] rounded-full bg-[url('/assets/img/dp.png')] bg-cover bg-center" />
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>

              {/* Brand text in mobile menu */}
              <span className="rounded-xl text-white text-sm font-medium flex justify-center items-center border-2 border-[#898989] px-3 py-2">
                Create your own brand
              </span>

              <div className="space-y-3">
                {/* Search input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Beach party"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                  <Icon
                    icon="material-symbols:search"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  />
                </div>

                {/* Location select */}
                <Select>
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Select Location" />
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

                {/* Search button */}
                <Button className="w-full bg-[#F800E9] hover:hover:bg-[#f599ef] text-white border border-zinc-700 rounded-lg py-3">
                  <Icon icon="material-symbols:search" className="w-5 h-5 mr-[3px]" />
                  Search
                </Button>
              </div>
            </div>

            <div>
              <ToggleSwitch />
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile: Only show essential buttons */}
        <div className="flex items-center gap-2 ml-auto">
          <Button className="bg-[#F800E9] hover:bg-[#f599ef] text-white px-2 py-2 rounded-lg">
            <Icon icon="solar:crown-bold" width="20" height="20" />
          </Button>
          <div className="hover:bg-gray-800 p-1.5 rounded">
            <Icon icon="material-symbols:settings-rounded" width="20" height="20" className="text-[#E9E9E9]" />
          </div>
          <div className="hover:bg-gray-800 p-1.5 rounded">
            <Icon icon="garden:notification-fill-12" width="20" height="20" className="text-[#E9E9E9]" />
          </div>
        </div>
      </div>

      <div className="hidden xl:flex items-center w-full">
        {/* LEFT: logo + brand + search */}
        <div className="flex items-center gap-10 flex-1 min-w-0">
          {/* Logo + dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-[2.4rem] w-[2.4rem] rounded-full bg-[url('/assets/img/dp.png')] bg-cover bg-center" />
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          {/* Brand text */}
          <span className="rounded-xl text-white text-sm font-medium flex justify-center items-center border-2 border-[#898989] px-3 py-2 shrink-0">
            Create your own brand
          </span>

          {/* SearchBar (fills remaining space) */}
          <div className="flex-1 min-w-0">
            <SearchBar
              widthAndBorderColorClass="max-w-[48rem] bg-[#818181]"
              bgColorClass="bg-[#2D2D2D]"
              searchBtnBgAndTextColor="bg-[#3c3c3c] text-white"
            />
          </div>
        </div>

        {/* MIDDLE: Adopt button */}
        <div className="shrink-0 mx-6">
          <Button className="bg-[#F800E9] hover:bg-pink-600 text-white px-3 py-2.5 rounded-lg flex items-center gap-2">
            <span className="text-base font-[600]">XXible+</span>
            <Icon icon="solar:crown-bold" width="24" height="24" />
          </Button>
        </div>

        {/* RIGHT: settings + notifications */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hover:bg-gray-800 p-2 rounded">
            <Icon icon="material-symbols:settings-rounded" width="28" height="28" className="text-[#E9E9E9]" />
          </div>
          <span className="opacity-50">|</span>
          <div className="hover:bg-gray-800 p-2 rounded">
            <Icon icon="garden:notification-fill-12" width="24" height="24" className="text-[#E9E9E9]" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
