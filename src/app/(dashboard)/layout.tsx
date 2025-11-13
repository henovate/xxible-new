"use client"

import Floating_Dock from "./components/floatingDock/floatingDock";
import Navbar from "./components/navbar/navbar";
import SideBar from "./components/sideBar/sideBar";
import "../../../public/styles/main.css"
import NavigationDock from "./components/navigationDock/navigationDock";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
	<div className="bg-[#191A1A] h-screen overflow-hidden"> 
      <div className="container layout-cont flex h-full">
        <SideBar />

        {/* Main column */}
        <div className="flex flex-col w-full min-w-0">
          <Navbar />

          <div className="flex-1 overflow-y-auto min-w-0">
            {children}
          </div>
        </div>

        {/* Floating dock */}
        <div className="fixed bottom-0 inset-x-0 flex justify-center lg:hidden">
          {/* <Floating_Dock /> */}
          <NavigationDock />
        </div>
      </div>
    </div>
  )
}