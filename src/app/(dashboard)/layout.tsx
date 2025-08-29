"use client"

import Floating_Dock from "./components/floatingDock/floatingDock";
import Navbar from "./components/navbar/navbar";
import SideBar from "./components/sideBar/sideBar";
import "../../../public/styles/main.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
	<div className="bg-[#191A1A]">
		<div className="container layout-cont flex h-screen">
			<SideBar />
			<div className="w-full">
				<Navbar />
				<div className="flex flex-1 flex-col gap-4 overflow-y-scroll overflow-hidden h-[calc(100%-5.9rem)]">{children}</div>
			</div>
			
			<div className="fixed bottom-[-220px] w-full flex justify-center lg:hidden">
				<Floating_Dock />
			</div>
    	</div>
	</div>
  )
}