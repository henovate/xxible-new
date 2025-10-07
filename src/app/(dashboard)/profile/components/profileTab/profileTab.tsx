"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react/dist/iconify.js";
import Interested from "../tabPages/interested/interested";

const ProfileTab = () => {

	return(
	<Tabs defaultValue="account">
		<TabsList className="flex justify-center items-center gap-5 lg:gap-16 bg-[#191A1A] border-b border-[#343434] rounded-none">
			<TabsTrigger 
				value="interested" 
				className="flex items-center gap-1 text-sm lg:text-base">
					<Icon icon="solar:heart-angle-bold" width="24" height="24" className="h-3 w-3 lg:w-4 lg:h-4" />
					Interested
			</TabsTrigger>

			<TabsTrigger 
				value="myTickets" 
				className="flex items-center gap-1 text-sm lg:text-base">
					<Icon icon="solar:ticket-linear" width="24" height="24" className="h-3 w-3 lg:w-4 lg:h-4" />
					My Tickets
			</TabsTrigger>

			<TabsTrigger 
				value="Brand" 
				className="flex items-center gap-1 text-sm lg:text-base">
					<Icon icon="akar-icons:globe" width="24" height="24" className="h-3 w-3 lg:w-4 lg:h-4" />
					Brand
			</TabsTrigger>
		</TabsList>
		<TabsContent value="interested">
			<Interested />
		</TabsContent>
		<TabsContent value="myTickets">Change your password here.</TabsContent>
		<TabsContent value="Brand">Change your password here.</TabsContent>
	</Tabs>
	)
}

export default ProfileTab;