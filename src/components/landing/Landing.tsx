"use client";

import React from "react";
import {
  GlassWater,
  Globe,
  Mic,
  Music,
  PartyPopper,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import graphUp from "../../../../public/assets/img/graphUp.png";
import star from "../../../../public/assets/img/star.png";
import Image from "next/image";
import EventCard2 from "@/components/utility/cards/event-card2/EventCard2";
import { eventsData } from "@/components/utility/cards/event-card2/events";
import ClubCard from "@/components/utility/cards/club-card/clubCard";
import { clubsData } from "@/components/utility/cards/club-card/clubData";
import { cardContents } from "@/components/utility/cards/event-card3/content";
import EventCard3 from "@/components/utility/cards/event-card3/eventCard3";
import { data } from "@/components/utility/cards/event-card4/data";
import EventCard4 from "@/components/utility/cards/event-card4/eventCard4";
import Marquee from "react-fast-marquee";
// import "../public/styles/main.css";
import HeroSearchBar from "@/components/utility/searchBar/heroSearchBar";
import { CategoriesSection } from "@/components/CategoriesSection";
import Container from "@/components/layout/Container";

export default function Home() {
  const handleLoad = () => {
    console.log("loaded");
  };

  const lastClubItem = clubsData.length;
  const secondtoLastClubItem = clubsData.length - 1;

  return (
    <>
      <div className="container h-full w-full bg-black layout-cont">
        <div className="h-full w-full">
          <div className="relative w-full">
            <div className="relative h-[18rem] sm:h-[22rem] md:h-[30rem] xl:h-[36rem] 2xl:h-[40rem] w-full overflow-hidden">
              {/* <div className="relative h-[26rem] sm:h-[32rem] md:h-[42rem] xl:h-[48rem] 2xl:h-[52rem] w-full overflow-hidden"> */}
              {/* Desktop video */}
              <div className="absolute inset-0 hidden md:block">
                <video
                  className="h-full w-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source
                    src="https://videos.pexels.com/video-files/6225458/6225458-hd_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Mobile image */}
              <div className="absolute inset-0 md:hidden">
                <Image
                  src="/assets/hero-background.png"
                  alt="Nightlife crowd"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Overlay (gradient like your screenshot) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10 h-full">
                <div className="mx-auto h-full w-full max-w-7xl px-5 sm:px-10 lg:px-16">
                  <div className="grid h-full items-center md:grid-cols-12">
                    {/* Left: Hero text */}
                    <div className="md:col-span-8 xl:col-span-7">
                      <h1
                        className="
    text-white tracking-tight font-normal
    md:whitespace-nowrap
    text-[2.1rem] leading-[2.5rem]
    sm:text-[2.8rem] sm:leading-[3.2rem]
    lg:text-[4.2rem] lg:leading-[4.6rem]
    xl:text-[4.8rem] xl:leading-[5.1rem]
  "
                      >
                        Find The Hottest{" "}
                        <span className="text-fuchsia-500">Events</span>
                        <br />
                        And <span className="text-fuchsia-500">Meet</span> New
                        People
                      </h1>

                      <div className="mt-7 w-full max-w-2xl">
                        <HeroSearchBar />
                      </div>
                    </div>

                    {/* Right: intentional empty space for video visibility */}
                    <div className="hidden md:block md:col-span-4 xl:col-span-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="bg-[#F4F4F5] px-5 sm:px-10 lg:px-16 py-10">
            <Container>
              <div className="mt-8">
                <CategoriesSection />
              </div>
            </Container>
          </section>
          <div className="sec3 px-5 lg:px-8 xl:px-16 pt-[10px] bg-[#EDEDED] w-full text-[#212121] pb-10">
            <Container>
              <div className="eventHeading">
                <div className="topdetails text-[1.5rem] leading-[1.7rem] sm:text-[30px] sm:leading-[35px] xl:text-[48px] xl:leading-[53px] font-[500] mt-4  text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-pink-500 to-[#FF00EA] overflow-visible">
                  <p>Featured Events</p>
                </div>
              </div>

              <div className="mt-[32px] grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4">
                {eventsData.map((_event, i) => (
                  <EventCard2 key={i} event={_event} cardTag="likes" />
                ))}
              </div>

              <div className="flex justify-end mt-14">
                <div className="flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2">
                  <p>SEE MORE</p>
                </div>
              </div>

              <div className="line pt-[72px] mt-[43px] border-t bg-[#EDEDED]">
                <div className="eventHeading">
                  <div>
                    <div className="discover flex items-center py-1 lg:py-2.5 px-5 bg-[#242424]/40 rounded-[24px] w-fit">
                      <Globe className="h-[13px] w-[13px] lg:h-[0.875rem] lg:w-[0.875rem] mr-1 text-stone-100" />
                      <p className="text-[12px] lg:text-[14px] 2xl:text-[16px] font-[400] uppercase explore text-stone-100 p-0 m-0">
                        Brands
                      </p>
                    </div>
                  </div>

                  <div className="topdetails text-[1.5rem] leading-[1.7rem] sm:text-[30px] sm:leading-[35px] xl:text-[48px] xl:leading-[53px] font-[500] mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-pink-500 to-[#FF00EA] overflow-visible">
                    <p>Popular Brands to Follow</p>
                  </div>

                  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-y-0">
                    {clubsData.map((club, index) => (
                      <ClubCard
                        key={index}
                        club={club}
                        lastItem={lastClubItem}
                        secondToLastItem={secondtoLastClubItem}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-14">
                <div className="flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2">
                  <p>SEE MORE</p>
                </div>
              </div>

            </Container>
          </div>
          <div className="">
            <div className='pt-[94px] bg-[url("/assets/img/bg1.png")] bg-cover bg-center bg-no-repeat bg-black px-5 lg:px-8 xl:px-0 pb-[36px]'>
              <Container>
                <div className="flex justify-center">
                  <div className="w-full xl:w-[75%]">
                    <p className="text-[30px] leading-[35px] xl:text-center xl:text-[48px] xl:leading-[47px] py-3 font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-pink-500 to-[#e28edb] overflow-visible">
                      Popular Cities on XXible
                    </p>
                    <p className="sm:w-[70%] lg:w-[50%] xl:w-full text-[16px] leading-[16px] md:text-[18px] md:leading-[20px] lg:leading-[22px] xl:text-center xl:text-[24px] xl:leading-[34px] font-[400] mt-8 text-[#ffffff]">
                      Looking for fun things to do near you? See what XXible
                      organizers are planning in cities around the country.
                    </p>
                  </div>
                </div>

                <div className="mt-[6rem] pb-[8rem] sm:mt-[139px] sm:pb-[180px]">
                  <Marquee autoFill={true} pauseOnHover={true}>
                    <div className="flex items-center">
                      {data.map((item, i) => (
                        <EventCard4 key={i} cardData={item} />
                      ))}
                    </div>
                  </Marquee>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
