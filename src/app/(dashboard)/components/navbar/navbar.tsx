"use client"

import { use, useState } from "react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import SearchBar from "@/components/utility/searchBar/searchBar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
import Link from "next/link";
import Image from "next/image";
import brandLogo from "../../../../../public/assets/img/logo2.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLargeScreenSearchOpen, setIsLargeScreenSearchOpen] = useState<boolean>(false);

  return (
    <nav className="bg-[#191A1A] text-white h-[4rem] sm:h-[5rem] xl:h-[5.9rem] w-full flex items-center px-4 xl:px-8 border-b-2 border-[#343434]">
      <div className="lg:hidden flex items-center gap-3 flex-1">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-800">
              <Menu className="w-5 h-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#1F1F1F] border-[#343434] w-80 flex flex-col justify-between">
            <div className="flex flex-col gap-6 mt-6">
              {/* Logo + dropdown in mobile menu */}
              <div className="flex items-center gap-2">
                <div className="h-[2.4rem] w-[2.4rem] rounded-full bg-[url('/assets/img/dp.png')] bg-cover bg-center" />
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>

              {/* Brand text in mobile menu */}
              <span className="rounded-lg text-white text-sm font-medium flex justify-center items-center border border-[#898989] px-3 py-2">
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
                  {/* <Icon
                    icon="material-symbols:search"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  /> */}
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0 absolute right-3 top-1/2 transform -translate-y-1/2" />
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
                <Button className="w-full bg-[#F800E9] hover:hover:bg-[#f599ef] text-[#f5f5f5] border border-zinc-700 rounded-lg py-3">
                  <Search className="w-4 h-4 text-[#f5f5f5] mr-1 flex-shrink-0" />
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
        <Link className="flex items-center" href="/">
          <div className="h-[1.7rem] w-[2.7rem]">
            <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
          </div>
        </Link>
        <div className="flex items-center gap-2 ml-auto">
          <Button className="bg-[#F800E9] shadow-[0_0_15px_rgba(255,0,212,0.6)] hover:scale-105 hover:bg-[#F800E9] transition-transform text-white px-2 py-2 rounded-lg">
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











      <div className="hidden lg:flex items-center w-full">
        {/* LEFT: logo + brand + search */}
        <div className="flex items-center lg:gap-3 xl:gap-5 2xl:gap-10 flex-1 min-w-0">
          {/* Logo + dropdown */}
          <div className="flex items-center lg:gap-1 xl:gap-2 shrink-0 cursor-pointer">
            <div className="h-[2rem] w-[2rem] 2xl:h-[2.4rem] 2xl:w-[2.4rem] rounded-full bg-[url('/assets/img/dp.png')] bg-cover bg-center" />
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>

          {/* Brand text */}
          <span className="rounded-xl text-white lg:text-[0.6rem] xl:text-[0.7rem] 2xl:text-sm font-medium flex justify-center items-center border-2 border-[#898989] px-2 py-1.5 xl:px-3 xl:py-2 shrink-0 cursor-pointer hover:scale-105 transition">
            Create your own brand
          </span>

          {/* SearchBar */}
          <div className="flex-1 min-w-0 ml-1 mr-1 sm:ml-4 sm:mr-4 lg:ml-2 xl:ml-4 lg:mr-12 xl:mr-16 lg:hidde xl:block">
            <SearchBar
              widthAndBorderColorClass="max-w-[48rem] bg-[#818181] lg:p-[1px]"
              bgColorClass="bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] shadow-inner shadow-[inset_0_0_20px_#FC89FF2B]"
              searchBtnBgAndTextColor="bg-[#3c3c3c] text-white hover:bg-[#2f2e2e]"
            />
          </div>
        </div>

        {/* MIDDLE: Adopt button */}
        <div className="shrink-0 ml-6 mr-12 lg:hidden xl:block">
          <Button className="bg-[#F800E9] hover:bg-[#F800E9] shadow-[0_0_15px_rgba(255,0,212,0.6)] hover:scale-105 transition-transform text-white py-1.5 px-2 2xl:px-3 2xl:py-2.5 rounded-lg flex items-center gap-2">
            <span className="lg:text-xs 2xl:text-base font-[600]">XXible+</span>
            <Icon icon="solar:crown-bold" width="24" height="24" className="h-4 w-4 2xl:h-5 2xl:w-5" />
          </Button>
        </div>

        <Button className="xl:hidden bg-[#F800E9] shadow-[0_0_15px_rgba(255,0,212,0.6)] hover:scale-105 hover:bg-[#F800E9] transition-transform text-white px-2 py-1 rounded-lg mr-5">
            <Icon icon="solar:crown-bold" width="20" height="20" />
        </Button>

        {/* RIGHT: settings + notifications */}
        <div className="flex items-center gap-2 2xl:gap-3 shrink-0">
          <div className="hover:bg-[#393939] p-2 rounded-full cursor-pointer">
            <Icon icon="material-symbols:settings-rounded" width="28" height="28" className="text-[#E9E9E9] w-6 h-6 2xl:w-7 2xl:h-7" />
          </div>
          <span className="opacity-50">|</span>
          <div className="hover:bg-[#393939] p-2 rounded-full cursor-pointer">
            <Icon icon="garden:notification-fill-12" width="24" height="24" className="text-[#E9E9E9] w-5 h-5 2xl:w-6 2xl:h-6" />
          </div>


        {/* Display only on lg screen size */}
          {/* <span className="opacity-50 hidden lg:block xl:hidden">|</span> */}

          <div className="hidden lg:flex items-center xl:hidden gap-3 flex-1">
            <Sheet open={isLargeScreenSearchOpen} onOpenChange={setIsLargeScreenSearchOpen}>
              {/* <SheetTrigger asChild>
                <div className="p-2 hover:bg-gray-800 rounded cursor-pointer">
                  <Icon icon="material-symbols:search"
                      className="w-7 h-7 text-[#E9E9E9]"
                      />
                </div>
              </SheetTrigger> */}
              <SheetContent side="right" className="bg-[#1F1F1F] border-[#343434] w-80 flex flex-col justify-between">
                <div className="flex flex-col gap-6 mt-6">
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
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
