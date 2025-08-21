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
      <div className="sign-up-cont w-[6.6rem] h-full [display:none] xl:flex flex-col items-center bg-[#202222] border-x-2 border-[#343434]">
        <Link className="flex items-center mt-9" href="/">
          <div className="h-[2.6rem] w-[3.5rem]">
            <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
          </div>
        </Link>


        <div className="flex flex-col items-center mt-[4.54rem] space-y-[1.15rem]">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <div key={item.title} onClick={()=> navigation(item)} className="flex flex-col justify-center items-center group">
            
                  <div
                    className={`p-2.5 rounded-full transition-opacity hover:opacity-100 group-hover:!bg-[#393939]  ${
                      isActive ? "bg-[#393939] opacity-100" : "opacity-70"
                    }`}
                  >
                      <Icon
                        icon={item.icon} 
                        width="20"
                        height="20"
                        className={`w-6 h-6 group-hover:!text-white ${
                          isActive ? "text-white" : "text-[#898989] "
                        }`}
                      />
                  </div>
                
                  <p
                    className={`mt-[0.2rem] text-sm font-[400] group-hover:!text-white ${
                      isActive ? "text-white" : "text-[#898989]"
                    }`}
                  >
                    {item.title}
                  </p>
                
              </div>
            )
          })}
    
        </div>
        <hr className="w-16 h-[3px] bg-[#393939] mt-[2.5rem]"></hr>

        <div className="flex items-center justify-center bg-[#393939] rounded-full mt-[2.5rem] p-2.5">
          <Icon icon="material-symbols-light:add" width="24" height="24" className="w-6 h-6 text-white"/>
        </div>


        <div className="mt-[4.54rem]">
          <ToggleSwitch />
        </div>
      </div>
  )
}


export default SideBar;

