"use client";

import React from 'react';
import { Globe } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
// import Layout from '@/app/(site)/layout';
import CircularText from '../../../components/circularText/circularText';
import arrow from "../../../../public/assets/img/rightarrow.png";
import graphUp from "../../../../public/assets/img/graphUp.png";
import brandLogo from "../../../../public/assets/img/logo2.png";
import star from "../../../../public/assets/img/star.png";
import Image from 'next/image';
import SwiperSlider from '@/components/swiper/swiperSlider';
import EventCard2 from '@/components/utility/cards/event-card2/eventCard2';
import { eventsData } from '@/components/utility/cards/event-card2/events';
import ClubCard from '@/components/utility/cards/club-card/clubCard';
import { clubsData } from '@/components/utility/cards/club-card/clubData';
import { cardContents } from '@/components/utility/cards/event-card3/content';
import EventCard3 from '@/components/utility/cards/event-card3/eventCard3';
import { data } from '@/components/utility/cards/event-card4/data';
import EventCard4 from '@/components/utility/cards/event-card4/eventCard4';
import Marquee from "react-fast-marquee";
import "../../../../public/styles/main.css"



export default function Home() {
  const { theme, toggleTheme } = useTheme();



const handleLoad = () => {
  console.log("loaded")
}


const lastClubItem = clubsData.length;
const secondtoLastClubItem = clubsData.length - 1


  return ( 
      <>
          <div className='container h-full w-full bg-black layout-cont'>
            <div className='h-full w-full'>

              <div className='relative w-full'>
                {/* Video Section */}
                <div className='video-container h-[20rem] sm:h-[30rem] md:h-[40rem] xl:h-[45rem] xxl:h-[50rem] 2xl:h-[56rem] w-full overflow-hidden bg-[#000000] bg-blend-overlay'>
                  <video className='w-full h-full min-w-full scale-150 grayscal' muted autoPlay loop>
                    <source onLoad={()=> handleLoad()} src='https://videos.pexels.com/video-files/6225458/6225458-hd_1920_1080_30fps.mp4' type='video/mp4' />
                  </video>
                </div>

                <div className='absolute bottom-0 left-0 w-full'>
                  <div className='exclusive hidden sm:flex justify-end w-full px-5 md:px-10 md:pr-32 lg:pr-40 gap-10 text-[#f5f5f5] text-[0.5rem] md:text-[0.65rem] xl:text-xs 2xl:text-sm font-[800]'>
                    <div className='flex-1'>
                      <p>Stay in the loop with the latest vibes, epic events, and unforgettable nights.</p>
                    </div>
                    <div className='w-[25%]'>
                      <p>Whether you’re chasing the beats, the vibes, or the people, this is your all-access guide to the coolest scene.</p>
                    </div>
                    <div className='w-[25%]'>
                      <p>Stay in the loop with the latest vibes, epic events, and unforgettable nights.</p>
                    </div>
                    <div className='w-[25%]'>
                      <p>All Exclusive - Updates on parties, night clubs, and the coolest crowd</p>
                      <p className='mt-9 w-[50%]'>Your ultimate pass to the hottest parties, buzzing nightclubs, and the trendiest crowd in town.</p>
                    </div>
                  </div>
                  <div className='flex md:mt-10 lg:mt-16 pl-2 sm:pl-5 md:pl-10'>
                    <div className='night-cont pl-0 ml-0 mb-0 pb-0'>
                        <p className='night capitalize text-[#f5f5f5] text-[10rem] leading-[10rem] sm:text-[13rem] sm:leading-[13rem] md:text-[16rem] md:leading-[16rem] lg:text-[18rem] lg:leading-[18rem] xl:leading-[22rem] xl:text-[22rem] 2xl:text-[33rem] 2xl:leading-none font-[600]'>NightLife</p>
                    </div>
                    <span className='text-2xl 2xl:text-[6rem] mt-9 lg:mt-7 text-[#f5f5f5]'>®</span>
                  </div>
                </div>

                {/* Mobile */}
                <div className='vertical-write absolute top-4 right-0 py-0.5 w-full bg-[#f599ef] md:hidden uppercase'>
                  <Marquee autoFill={true} pauseOnHover={true}>
                    <div className='px-4 text-zinc-900 text-xs font-[500] uppercase border-x-2 border-zinc-900 flex justify-center items-center w-full'>
                      <p className='whitespace-nowrap'>Dive into An Experience</p>
                    </div>

                    <div className='flex-1 w-full flex justify-center items-center'>
                      <div className="h-[1.3rem] w-[2.3rem] 2xl:h-[2.6rem] 2xl:w-[3.5rem]">
                        <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover grayscale"/>
                      </div>
                    </div>

                    <div className='px-4 text-zinc-900 text-xs font-[500] border-x-2 border-zinc-900 flex justify-center items-center w-full'>
                      <p className='whitespace-nowrap'>Find The Hottest Nightlife Events, Vibes And Meet New People. Cruise with Leisure.</p>
                    </div>


                    <div className='flex-1 w-full flex justify-center items-center'>
                      <div className="h-[1.3rem] w-[2.3rem] 2xl:h-[2.6rem] 2xl:w-[3.5rem]">
                        <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover grayscale"/>
                      </div>
                    </div>
                  </Marquee>
                </div>

                {/* Desktop */}
                <div className='vertical-write absolute top-0 right-0 h-full w-[6%] bg-[#f5f5f5] bg-[#f599ef hidden md:flex flex-col items-center justify-center'>
                    <div className='[writing-mode:vertical-rl] [text-orientation:mixed] text-zinc-900 h-[40%] text-base leading-4 2xl:text-2xl 2xl:leading-6 font-[600] uppercase border-y-2 border-zinc-900 py- flex justify-center items-center w-full'>
                      <p className='h-[80%] text-center'>Dive into An Experience</p>
                    </div>
                    <div className='[writing-mode:vertical-rl] [text-orientation:mixed] text-zinc-900 h-[40%] text-[0.7rem] leading-[0.7rem] 2xl:text-[1.1rem] 2xl:leading-[1.2rem] font-[500] border-b-2 border-zinc-900 flex justify-center items-center w-full'>
                      <p className='h-[80%] text-center'>Find The Hottest Nightlife Events, Vibes And Meet New People. Cruise with Leisure.</p>
                    </div>


                    <div className='flex-1 w-full flex justify-center items-center'>
                      <div className="h-[1.8rem] w-[2.8rem] 2xl:h-[2.6rem] 2xl:w-[3.5rem]">
                        <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover grayscale"/>
                      </div>
                    </div>
                </div>

                <div className='absolute bottom-10 right-40 rounded-full bg-[#f5f5f5 bg-[#f599ef] hidden lg:flex justify-center items-center h-[5.5rem] w-[5.5rem] xl:h-[7rem] xl:w-[7rem] animate-bounce cursor-pointer'>
                    <p className='text-xs xl:text-sm text-zinc-900 font-[600]'>Scroll</p>
                </div>
              </div>




              <div className='landing-desc bg-black px-10 py-16 sm:hidden border-y border-stone-500'>
                  <div className='exclusive w-[95%] text-stone-300 text-xs leading-[0.875rem] font-[300] uppercase space-y-4'>
                    <div>
                      <p>Stay in the loop with the latest vibes, epic events, and unforgettable nights.</p>
                      <p className='landing-no text-base mt-1 text-[#f599ef]'>1.0.1</p>
                    </div>
                    <div>
                      <p>Whether you’re chasing the beats, the vibes, or the people, this is your all-access guide to the coolest scene.</p>
                      <p className='landing-no text-base mt-1 text-[#f599ef]'>1.0.2</p>
                    </div>
                    <div>
                      <p>Stay in the loop with the latest vibes, epic events, and unforgettable nights.</p>
                      <p className='landing-no text-base mt-1 text-[#f599ef]'>1.0.3</p>
                    </div>
                    <div>
                      <p>All Exclusive - Updates on parties, night clubs, and the coolest crowd</p>
                      <p>Your ultimate pass to the hottest parties, buzzing nightclubs, and the trendiest crowd in town.</p>
                      <p className='landing-no text-base mt-1 text-[#f599ef]'>1.0.4</p>
                    </div>
                  </div>
              </div>




              <div className='sec2 w-full relative bg-[url("/assets/category-background.png")] pt-16 bg-cover bg-center'>
              {/* hidden elememt for container height */}
              <div className='pt-8 md:pt-12 pb-20 hide invisible'>
                  <div className='w-full my-16 px-8'>              
                    <SwiperSlider cardType={1} />
                  </div>


                  <div className='px-8 md:mt-[20px] xl:mt-[139px] 2xl:mt-[173px]'>
                    <div className='eventHeading lg:ml-16'>
                      <div className='flex justify-center sm:justify-start'>
                        <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit'>
                          <div className='h-[13px] w-[13px] lg:h-[15px] lg:w-[15px] mr-1 mt-[2.5px] lg:mb-[3.5px]'>
                            <Image src={graphUp} alt="right arrow" className="w-full h-full"/>
                          </div>
                          <p className='text-[12px] lg:text-[14px] font-[400] uppercase explore text-stone-100 mt-[8px]'>Discover What's Trending in Lagos</p>
                        </div>
                      </div>
                      

                      <div className='topdetails text-center sm:text-start text-[1.5rem] leading-[1.5rem] sm:text-[30px] sm:leading-[35px] xl:text-[48px] xl:leading-[53px] font-[500] mt-4  text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-pink-500 to-[#FF00EA] overflow-visible'>
                        <p>Top 10 Upcoming events in Lagos</p>
                      </div>
                    </div>
                


                    <div className='mt-7 lg:mt-[62px] w-full'>
                      <SwiperSlider cardType={2} />
                    </div>
                  </div>
                </div>




                  {/* black Shade */}
                <div className='absolute inset-0 bg-black/40 z-10'></div>

                  {/* Absolute container */}
                <div className='absolute inset-0 pt-8 md:pt-12 pb-20 z-20'>
                  <div className='w-full my-16 px-6 lg:px-8'>              
                    <SwiperSlider cardType={1} />
                  </div>


                  <div className='px-6 lg:px-8 md:mt-[20px] mt-[100px] xl:mt-[139px] 2xl:mt-[173px]'>
                    <div className='eventHeading lg:ml-16'>
                      <div className='flex justify-center sm:justify-start'>
                        <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit'>
                          <div className='h-[13px] w-[13px] lg:h-[15px] lg:w-[15px] mr-1 mt-[2.5px] lg:mb-[3.5px]'>
                            <Image src={graphUp} alt="right arrow" className="w-full h-full"/>
                          </div>
                          <p className='text-[12px] lg:text-[14px] font-[400] uppercase explore text-stone-100 mt-[8px]'>Discover What's Trending in Lagos</p>
                        </div>
                      </div>
                      

                      <div className='topdetails text-center sm:text-start text-[1.5rem] leading-[1.5rem] sm:text-[1.88rem] sm:leading-[2.5rem] xl:text-[48px] xl:leading-[53px] font-[500] mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#fbd0f7] via-[#FFFFFF] to-[#FF00EA] overflow-visible'>
                        <p>Top 10 Upcoming events in Lagos</p>
                      </div>
                    </div>
                


                    <div className='mt-7 lg:mt-[62px] w-full'>
                      <SwiperSlider cardType={2} />
                    </div>
                  </div>
                </div>
              </div>

              

              <div className='sec3 px-5 lg:px-8 xl:px-16 pt-[10px] bg-[#EDEDED] w-full text-[#212121] pb-10'>
                <div className='eventHeading'>
                  <div className='discover flex items-center py-1 lg:py-2.5 px-5 bg-[#242424]/40 rounded-full w-fit mt-[83px]'>
                    <div className='h-[13px] w-[13px] lg:h-[0.875rem] lg:w-[0.875rem] mr-1'>
                      <Image src={star} alt="right arrow" className="w-full h-full"/>
                    </div>
                    <p className='text-[12px] lg:text-[14px] 2xl:text-[16px] font-[400] uppercase explore mt-[8px] text-[#212121]'>Featured</p>
                  </div>

                  <div className='topdetails text-[1.5rem] leading-[1.7rem] sm:text-[30px] sm:leading-[35px] xl:text-[48px] xl:leading-[53px] font-[500] mt-4  text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-pink-500 to-[#FF00EA] overflow-visible'>
                    <p>Events Featured In Lagos</p>
                  </div>
                </div>


                <div className='flex flex-wrap gap-2 xl:gap-5 mt-6 catGroup text-[12px] xl:text-[16px] font-[500] uppercase text-[#212121] explore'>
                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>ALL</p>
                  </div>

                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>TODAY</p>
                  </div>

                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>TOMORROW</p>
                  </div>

                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>THIS WEEKEND</p>
                  </div>

                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>FREE</p>
                  </div>
                </div>



                <div className='mt-[32px] grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4'>
                  
                  {eventsData.map((_event, i) => (
                       <EventCard2 key={i} event={_event} cardTag='likes'/>
                  ) )}
                 
                </div>

                <div className='flex justify-end mt-14'>
                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>SEE MORE</p>
                  </div>
                </div>




                <div className='line pt-[72px] mt-[43px] border-t bg-[#EDEDED]'>
                  <div className='eventHeading'>
                    <div>
                      <div className='discover flex items-center py-1 lg:py-2.5 px-5 bg-[#242424]/40 rounded-[24px] w-fit'>
                        <Globe className='h-[13px] w-[13px] lg:h-[0.875rem] lg:w-[0.875rem] mr-1 text-stone-100' />
                        <p className='text-[12px] lg:text-[14px] 2xl:text-[16px] font-[400] uppercase explore text-stone-100 p-0 m-0'>Brands</p>
                      </div>
                    </div>
                    

                    <div className='topdetails text-[1.5rem] leading-[1.7rem] sm:text-[30px] sm:leading-[35px] xl:text-[48px] xl:leading-[53px] font-[500] mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-pink-500 to-[#FF00EA] overflow-visible'>
                      <p>Popular Brands to Follow</p>
                    </div>

                    <div className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 2xl:gap-y-0'>
                      {clubsData.map((club, index) => (
                        <ClubCard key={index} club={club} lastItem={lastClubItem} secondToLastItem={secondtoLastClubItem}/>
                      ))}
                    </div>
                  </div>
                </div>


                <div className='flex justify-end mt-14'>
                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>SEE MORE</p>
                  </div>
                </div>



                <div className='createBrand bg-[#000000] bg-[url("/assets/bg.png")] bg-cover bg-no-repeat bg-center rounded-[32px] mt-[72px] pt-[70px] xl:pt-[113px] pb-[69px] xl:pb-[112.14px] w-full px-8 sm:px-14'>
                  <div className='w-full sm:w-[70%] xl:w-[50%]'>
                    <p className='text-[30px] leading-[35px] xl:text-[48px] xl:leading-[47px] py-3 font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-pink-500 to-[#e28edb] overflow-visible'>Create Your brand Claim Your Spotlight!</p>
                    <p className='text-[16px] leading-[20px] sm:leading-[22px] xl:text-[24px] xl:leading-[34px] font-[400] my-8 text-[#ffffff] lg:w-[70%] xl:w-full'>
                      Build your presence, host unforgettable nights, and connect directly with your crowd, 
                      whether you're a buzzing lounge, a rooftop bar, or an underground party brand.
                    </p>                  
                    <button className='bg-[#FFFFFF] text-[#212121] text-[16px] font-[600] px-6 py-[12px] rounded-[12px] mt-4 hover:bg-stone-200 transition-colors'>
                      Create Your Brand
                    </button>
                  </div>
                </div>
              </div>

              <div className='pt-[99px] bg-[url("/assets/img/bg.png")] bg-cover bg-center bg-no-repeat bg-black px-5 lg:px-8 xl:px-20 pb-[36px]'>
                <div className='flex justify-center'>
                  <div className='w-full xl:w-[50%]'>
                    <p className='text-[30px] leading-[35px] xl:text-center xl:text-[48px] xl:leading-[47px] py-3 font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-pink-500 to-[#e28edb] overflow-visible'>Talk Before You Party!</p>
                    <p className='sm:w-[70%] lg:w-[50%] xl:w-full text-[16px] leading-[16px] md:text-[18px] md:leading-[20px] lg:leading-[22px] xl:text-center xl:text-[24px] xl:leading-[34px] font-[400] mt-8 text-[#ffffff]'>
                      start gisting with other guests, ask questions, or link up before the night begins.
                    </p>                  
                  </div>
                </div>
                
                <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-8 mt-[74px]'>
                  {cardContents.map((cardContent) => (
                    <EventCard3 key={cardContent.id} cardData={cardContent} />
                  ))}
                </div>
              </div>

              
              <div className=''>
                <div className='pt-[94px] bg-[url("/assets/img/bg1.png")] bg-cover bg-center bg-no-repeat bg-black px-5 lg:px-8 xl:px-0 pb-[36px]'>
                  <div className='flex justify-center'>
                    <div className='w-full xl:w-[75%]'>
                      <p className='text-[30px] leading-[35px] xl:text-center xl:text-[48px] xl:leading-[47px] py-3 font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-pink-500 to-[#e28edb] overflow-visible'>Popular Cities on XXible</p>
                      <p className='sm:w-[70%] lg:w-[50%] xl:w-full text-[16px] leading-[16px] md:text-[18px] md:leading-[20px] lg:leading-[22px] xl:text-center xl:text-[24px] xl:leading-[34px] font-[400] mt-8 text-[#ffffff]'>
                        Looking for fun things to do near you? See what XXible organizers are planning in cities around the country.
                      </p>                  
                    </div>
                  </div>


                  <div className='mt-[6rem] pb-[8rem] sm:mt-[139px] sm:pb-[180px]'>
                    <Marquee autoFill={true} pauseOnHover={true}>
                      <div className='flex items-center'>
                        {data.map((item, i) => (
                          <EventCard4 key={i} cardData={item} />
                        ))}
                      </div>
                    </Marquee>
                  </div>
                </div>
              </div>

            </div>
          </div> 
      </>
  );
}
