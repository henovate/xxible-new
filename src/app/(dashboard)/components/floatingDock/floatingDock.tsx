import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Icon } from "@iconify/react";


const Floating_Dock = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <Icon icon="lsicon:home-filled" width="20" height="20" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/home",
    },

    {
      title: "Explore",
      icon: (
        <Icon icon="streamline-sharp:magnifying-glass" width="20" height="20" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/explore",
    },
	{
		title: "Create Event",
		icon: (
			<Icon icon="material-symbols-light:add" width="20" height="20" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
		),
		href: "/create-event",
	},
    {
      title: "Events",
      icon: (
		<Icon icon="solar:bolt-linear" width="20" height="20" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/events",
    },
    {
      title: "Profile",
      icon: (
		<Icon icon="solar:user-circle-linear" width="20" height="20" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/profile",
    },
    {
      title: "Messages",
      icon: (
        <Icon icon="solar:chat-round-call-linear" width="20" height="20" className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/messages",
    },
  ];

  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        // mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}


export default Floating_Dock;