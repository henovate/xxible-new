"use client";

import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import "../../../../../public/styles/main.css";
import { sidebarItems } from "../sideBar/sidebarItems";
import Link from "next/link";
  


const NavigationDock = () => {
  const pathname = usePathname();
  const router = useRouter()
  const createEventRoute = "/create-event"
  const isCreateEventActive = pathname === createEventRoute


  const navigation =(route:any)=>{
      router.push(`${route.href}`)
  }

  return (
      <div className="w-full"> 
		<div className="flex justify-end mb-10 sm:mb-[3.6rem] pr-5">
			<Link href="/create-event?page=1" className="group">
				<div className={`flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:bg-[#f5f5f5] transition rounded-full mt-[2.5rem] p-3 sm:p-5 cursor-pointer ${isCreateEventActive? "bg-[#f5f5f5]" : "bg-[#F800E9]" }`}>
					<Icon icon="fluent:add-32-filled" width="24" height="24" className={`w-7 h-7 sm:w-[3.4rem] sm:h-[3.4rem]  group-hover:text-zinc-900 ${isCreateEventActive? "text-zinc-900" : "text-white"}`}/>
				</div>
			</Link>
		</div>

        <div className="w-full flex items-center justify-around border-y-1 border-[#343434] bg-[#191a1ab1] backdrop-blur-md py-5 sm:px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <div key={item.title} onClick={()=> navigation(item)} className="flex flex-col justify-center items-center group">
            
                  <div
                    className={`p-2 sm:p-3 rounded-full transition-opacity hover:opacity-100 group-hover:!bg-[#393939] group-hover:!shadow-[0_0_20px_rgba(0,0,0,0.5)]  ${
                      isActive ? "bg-[#393939] opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "opacity-70"
                    }`}
                  >
                      <Icon
                        icon={item.icon} 
                        width="20"
                        height="20"
                        className={`w-5 h-5 sm:w-7 sm:h-7 group-hover:!text-white cursor-pointer ${
                          isActive ? "text-white" : "text-[#898989] "
                        }`}
                      />
                  </div>
              </div>
            )
          })}
    
        </div>
      </div>
  )
}


export default NavigationDock;

