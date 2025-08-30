"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { sidebarItems } from "./sidebarItems";
import { Icon } from "@iconify/react";
import Image from "next/image";
import brandLogo from "../../../../../public/assets/img/logo2.png";
import "../../../../../public/styles/main.css";
import ToggleSwitch from "../toggleSwitch/toggleSwitch";
  


const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter()


  const navigation =(route:any)=>{
      router.push(`${route.href}`)
  }

  return (
      <div className="sign-up-cont w-[6.6rem] h-full [display:none] lg:flex flex-col items-center bg-[#202222] border-x-2 border-[#343434]">
        <Link className="flex items-center mt-9" href="/">
          <div className="h-[1.8rem] w-[2.8rem] 2xl:h-[2.6rem] 2xl:w-[3.5rem]">
            <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
          </div>
        </Link>


        <div className="flex flex-col items-center mt-[3.8rem] 2xl:mt-[4.54rem] space-y-[1rem] 2xl:space-y-[1.15rem]">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <div key={item.title} onClick={()=> navigation(item)} className="flex flex-col justify-center items-center group">
            
                  <div
                    className={`p-2 2xl:p-2.5 rounded-full transition-opacity hover:opacity-100 group-hover:!bg-[#393939] group-hover:!shadow-[0_0_20px_rgba(0,0,0,0.5)]  ${
                      isActive ? "bg-[#393939] opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "opacity-70"
                    }`}
                  >
                      <Icon
                        icon={item.icon} 
                        width="20"
                        height="20"
                        className={`w-5 h-5 2xl:w-6 2xl:h-6 group-hover:!text-white cursor-pointer ${
                          isActive ? "text-white" : "text-[#898989] "
                        }`}
                      />
                  </div>
                
                  <p
                    className={`mt-[0.2rem] text-xs 2xl:text-sm font-[400] group-hover:!text-white ${
                      isActive ? "text-white" : "text-[#898989]"
                    }`}
                  >
                    {item.title}
                  </p>
                
              </div>
            )
          })}
    
        </div>
        <hr className="w-16 h-[3px] bg-[#393939] mt-[1.7rem] 2xl:mt-[2.5rem]"></hr>

        <div className="flex items-center justify-center bg-[#393939] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-full mt-[2.5rem] p-2 2xl:p-2.5 cursor-pointer">
          <Icon icon="material-symbols-light:add" width="24" height="24" className="h-4 w-4 2xl:w-6 2xl:h-6 text-white"/>
        </div>


        <div className="mt-[4.54rem]">
          <ToggleSwitch />
        </div>
      </div>
  )
}


export default SideBar;

