"use client"

import Floating_Dock from "./components/floatingDock/floatingDock";
import Navbar from "./components/navbar/navbar";
import SideBar from "./components/sideBar/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      	<SideBar />
	  	<div className="w-full">
			<Navbar />
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-scroll overflow-hidden h-[calc(100%-5.9rem)]">{children}</div>
		</div>
		
		<div className="fixed bottom-[-220px] w-full flex justify-center xl:hidden">
			<Floating_Dock />
		</div>
    </div>
  )
}