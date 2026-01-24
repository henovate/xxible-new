"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import EventCard2 from "@/components/utility/cards/event-card2/EventCard2";
import { eventsData } from "./data/events";
import { nextEventList } from "../components/nextEventCard/next-events";
import UpcomingEventCard from "@/components/utility/cards/upcoming-event-card/upcomingEventCard";
import { clubData } from "./data/clubData";
import FollowClubCard from "@/components/utility/cards/follow-club-card/followClubCard";
import NextEventCard from "../components/nextEventCard/nextEventCard";
import CategoryFilter from "../components/categoryFilter/categoryFilter";
import { categoryList } from "../data/categoryList";
import Container from "@/components/layout/Container";


const page = () => {

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[70%_1fr] xl:grid-cols-[77.5%_1fr] 2xl:grid-cols-[80%_1fr] bg-[#191A1A]">
        {/* 1st Partition */}
      <div className="text-gray-600 border-r-2 border-[#343434] min-w-0">
        <div className="p-4 md:p-5 lg:p-4">	
            <div className="w-full md:h-[14.5rem] lg:h-56 2xl:h-[18.5rem] bg-[url('/assets/img/db1.jpg')] md:bg-[url('/assets/img/db.png')] border border-[#5B5B5B] shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#000000a3] md:bg-[#00000052] bg-blend-overlay bg-cover bg-center rounded-2xl md:flex justify-end">
                <div className="md:w-[50%] py-10 px-4 sm:py-8 md:py-0 md:px-0 md:pr-3 text-white flex flex-col justify-center">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#ec7ee1] to-[#FF00EA] overflow-visible text-2xl leading-6 sm:text-xl sm:leading-5 lg:text-2xl lg:leading-6 font-[600]">
                        Find the Night. Live the Vibe.
                    </p>
                    <p className="w-[75%] sm:w-[60%] md:w-[75%] mt-4 sm:mt-3 2xl:mt-4 text-base sm:text-xs xl:text-[0.82rem] 2xl:text-base leading-4 xl:leading-4 2xl:leading-5 font-[500] text-[#A0A0A0]">Discover parties, connect with the crowd, and never miss a night out again.</p>
                    <p className="font-[500] text-[0.75rem] md:text-[0.55rem] lg:text-[0.6rem] 2xl:text-[0.75rem]  mt-[0.75rem] lg:mt-[0.44rem] 2xl:mt-[0.75rem] text-[#E9E9E9]">Clubs • Events • Afterparties – All in One App</p>

                    <div className="flex flex-row gap-3 mt-8 lg:mt-9 2xl:mt-11">
                        <a href="#" className="inline-block">
                            <div className="bg-black rounded-lg lg:rounded-md 2xl:rounded-lg px-3 lg:px-2 2xl:px-3 py-1.5 lg:py-1 2xl:py-1.5 flex items-center space-x-2 lg:space-x-1 2xl:space-x-2 border border-[#A6A6A6]">
                                <Icon icon="logos:google-play-icon" width="256" height="283" className="h-5 w-5 lg:h-4 lg:w-4 2xl:h-5 2xl:w-5"/>
                                <div className="text-left">
                                    <div className="text-[0.48rem] leading-[0.3rem] lg:text-[0.38rem] lg:leading-[0.27rem] 2xl:text-[0.48rem] 2xl:leading-[0.3rem] text-gray-300">GET IT ON</div>
                                    <div className="text-sm lg:text-xs 2xl:text-sm font-semibold">Google Play</div>
                                </div>
                            </div>
                            </a>
                            <a href="#" className="inline-block">
                            <div className="bg-black rounded-lg lg:rounded-md 2xl:rounded-lg px-3 lg:px-2 2xl:px-3 py-1.5 lg:py-1 2xl:py-1.5 flex items-center space-x-2 lg:space-x-1 2xl:space-x-2 border border-[#A6A6A6]">
                                <Icon icon="ri:apple-fill" width="24" height="24" className="h-5 w-5 lg:h-4 lg:w-4 2xl:h-5 2xl:w-5" />
                                <div className="text-left">
                                    <div className="text-[0.48rem] leading-[0.3rem] lg:text-[0.38rem] lg:leading-[0.27rem] 2xl:text-[0.48rem] 2xl:leading-[0.3rem] text-gray-300">Download on the</div>
                                    <div className="text-sm lg:text-xs 2xl:text-sm font-semibold">App Store</div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>			
            </div>	


            <div className="mt-6">
                <p className="font-[600] text-xl sm:text-2xl lg:text-xl 2xl:text-2xl text-[#F5F5F5]">Event In Lagos</p>
            </div>
        
            <div className="mt-8 lg:mt-6 2xl:mt-8">
                <CategoryFilter listItems={categoryList} />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-4">
                {eventsData.map((_event, index) => (
                    <EventCard2 key={index} 
                                event={_event} 
                                bgClassName="bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
                                titleAndCompanyTextColor="text-[#F5F5F5]"
                                cardInfoTextColor="text-[#A0A0A0]"
                                imgHeight="h-[16rem] lg:h-[13.2rem]"
                                curveDesignColor="bg-[#191A1A]"
                                titleFontSize="lg:text-base mt-5"
                                locationFontSize="lg:text-[0.65rem] lg:leading-[0.7rem]"
                                />
                ))}
            </div>

            <div className="mt-7 flex justify-end">
                <p className="text-[#007AFF] font-[500] text-sm lg:text-xs">View all</p>
            </div>
        </div>


        {/* Your Next Event */}
        <div className="mt-12 border-y border-[#343434] px-2.5 md:px-5">
            <p className="text-[#F5F5F5] font-[600] text-xl sm:text-2xl lg:text-xl mt-4">Your next events</p>

            <div className="mt-6 flex items-center w-full overflow-x-auto gap-5 snap-x snap-mandatory no-scrollbar min-w-0">
                {nextEventList.map((_event, index) => (
                    <NextEventCard key={index} 
                                   event={_event}
                                    />
                ))}
            </div>

            <div className="mt-6 flex justify-end mb-5">
                <p className="text-[#007AFF] font-[500] text-sm lg:text-xs">View all</p>
            </div>
        </div>


        {/* Trending */}
        <div className="mt-[3.4rem] px-4 md:px-5">
            <p className="text-[#F5F5F5] font-[600] text-center sm:text-start text-xl sm:text-2xl lg:text-xl mt-[1.15rem]">Trending</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {eventsData.map((_event, index) => (
                    <EventCard2 key={index}
                                event={_event} 
                                cardTag="latest"
                                bgClassName="bg-[#232323]" 
                                titleAndCompanyTextColor="text-[#F5F5F5]"
                                cardInfoTextColor="text-[#A0A0A0]"
                                imgHeight="h-[16rem] lg:h-[13.2rem]"
                                curveDesignColor="bg-[#191A1A]"
                                titleFontSize="lg:text-base mt-5"
                                locationFontSize="lg:text-[0.65rem] lg:leading-[0.7rem]"		
                                />
                            ))}				
            </div>
        </div>



        <div className="mt-[4.6rem]  px-4 md:px-5 pb-16">
            <p className="text-[#F5F5F5] font-[600] text-center sm:text-start text-xl sm:text-2xl lg:text-xl mt-[1.15rem]">Events from brands you follow</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {eventsData.map((_event, index) => (
                    <EventCard2 key={index}
                                event={_event} 
                                cardTag="latest"
                                bgClassName="bg-[#232323]" 
                                titleAndCompanyTextColor="text-[#F5F5F5]"
                                cardInfoTextColor="text-[#A0A0A0]"
                                imgHeight="h-[16rem] lg:h-[13.2rem]"
                                curveDesignColor="bg-[#191A1A]"
                                titleFontSize="lg:text-base mt-5"
                                locationFontSize="lg:text-[0.65rem] lg:leading-[0.7rem]"		
                                />
                            ))}				
            </div>
        </div>
      </div>	


        {/* 2nd Partition */}
      <div className="hidden lg:block pt-[2.2rem] px-4 md:px-5 lg:px-4">
        <div className="border border-gradient-to-r from-[#353535] to-[#9B9B9B] bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)] p-4 rounded-2xl">
            <p className="text-base font-[600] text-[#F5F5F5]">Subscribe to XXible+</p>
            <p className="text-[0.7rem] leading-[0.9rem] font-[400] text-[#C8C8C8] mt-1.5">Stay ahead of the vibe, subscribe for early access and premium features.</p>

            <div className="rounded-full px-3 py-2 bg-[#F800E8] text-[#f5f5f5] mt-6 w-fit shadow-[0_0_15px_rgba(255,0,212,0.6)] hover:scale-105 transition-transform">
                <p className="text-xs font-[600]">Subscribe</p>
            </div>
        </div>

        <div>
            <div className="mt-7">
                <p className="font-[600] text-sm text-[#F5F5F5]">Top 10 Upcoming events </p>
            </div>

            <div className="mt-6">
                {eventsData.map((_event, index)=>(			
                    <UpcomingEventCard key={index} 
                                       event={_event} 
                                       eventNumber={Number(index + 1)} 
                                       />
                ))}	
            </div>
        </div>


        <div>
            <div className="mt-[2.7rem]">
                <p className="font-[600] text-sm text-[#F5F5F5]">Brands to follow</p>
            </div>

            <div className="mt-6">
                {clubData.map((club, index)=>(
                    <FollowClubCard key={index} 
                                    clubData={club} 
                                    />
                ))}	
            </div>

            <div className="mt-6">
                <p className="text-[#007AFF] font-[500] text-sm lg:text-xs">Show all</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default page
