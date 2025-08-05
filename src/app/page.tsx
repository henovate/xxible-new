"use client";

import React from 'react';
import { Ticket, Calendar, Search, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Layout from '@/components/layout/layout';
import CircularText from '../../src/components/circularText/circularText';
import arrow from "../../public/assets/img/rightarrow.png";
import arrow2 from "../../public/assets/img/rightarrow2.png";
import like from "../../public/assets/img/like.png";
import blackLike from "../../public/assets/img/like1.png";
import likegray from "../../public/assets/img/likeg.png";
import graphUp from "../../public/assets/img/graphUp.png";
import star from "../../public/assets/img/star.png";
import dash from "../../public/assets/img/line.png";
import avatar1 from "../../public/assets/avatars/avatar1.png";
import Image from 'next/image';
import SwiperSlider from '@/components/swiper/swiper';
import EventCard from '@/components/utility/event-card2/eventCard';
import { eventsData } from '@/components/utility/event-card2/events';



export default function Home() {
  const { theme, toggleTheme } = useTheme();



const handleLoad = () => {
  console.log("loaded")
}


  return ( 
      <Layout>
          <div className='h-full w-full bg-black layout-cont'>
            <div className='h-full w-full'>
              <div className='relative w-full'>
                {/* Video Section */}
                <div className='video-container h-[390px] w-full overflow-hidden bg-black bg-blend-overlay rounded-br-[400px] rounded-bl-[100px]'>
                  <video className='w-full h-full min-w-full scale-150 rounded-br-[400px] rounded-bl-[100px]' muted autoPlay loop>
                    <source onLoad={()=> handleLoad()} src='https://videos.pexels.com/video-files/6225458/6225458-hd_1920_1080_30fps.mp4' type='video/mp4' />
                  </video>
                </div>

                <div className='absolute top-32 left-0 ml-8'>
                  <div className=''>
                    <CircularText
                      text="DIVE*INTO*AN*EXPERIENCE*"
                      onHover="speedUp"
                      spinDuration={20}
                      className="custom-class text-white"
                    />
                  </div>

                  <div className='absolute left-24 top-24 h-[50px] w-[50px] ml-1'>
                    <Image src={arrow} alt="right arrow" className="right-logo w-full h-full"/>
                  </div>
                </div>
              </div>

              <div className='sec1 h-full px-6 lg:px-8 mt-4 sm:mt-16 lg:mt-10'>
                <div className='pl-0 ml-0 flex justify-center sm:justify-start items-center bg-black w-full'>
                  <p className='night text-[13vw] leading-[12vw] sm:text-[14.5vw] sm:leading-[13vw] lg:leading-[14.5vw] xl:text-[14.7vw] xl:leading-[14.7vw] font-[600]'>NIGHT LIFE</p>
                </div>

                <div className='w-full sm:flex lg:items-center justify-between lg:justify-around mt-14 lg:mt-6 text-center sm:text-start'>             
                    <div className='w-[70% sm:w-[45%] md:w-[44vw] lg:w-[32vw]'>
                      <p className='hero-summary text-[25px] leading-[23px] font-[500]'>Find The Hottest Nightlife Events, Vibes And Meet New People. Cruise with Leisure.</p>
                      <p className='diveInto uppercase mt-2 text-[25px] leading-[25px]'>Dive into An Experience</p>
                      {/* <p className='partyHard mt-2 text-[17px] leading-[17px] font-[400] text- uppercase'>Party Hard</p> */}
                    </div>               

                  <div className='sum w-[70% sm:w-[45%] md:w-[44vw] lg:w-[34vw] mt-16 sm:mt-0 text-center sm:text-start'>
                    <p className='exclusive text-stone-50 text-[25px] leading-[25px]'>All Exclusive</p>
                    <p className='updates  mt-1 text-stone-100 text-[25px] leading-[24px]'>Updates on exclusive parties, night clubs, and the coolest crowd</p>
                    <p className='allInOne mt-2 text-stone-100 text-[23px] leading-[23px]'>All in one place!</p>
                  </div>
                </div>
              </div>
              


              <div className='sec2 w-full relative bg-[url("/assets/category-background.png")] mt-16 bg-cover bg-center'>
              {/* hidden elememt for container height */}
              <div className='pt-8 md:pt-12 pb-20 hide invisible'>
                  <div className='w-full my-16 px-8'>              
                    <SwiperSlider cardType={1} />
                  </div>


                  <div className='px-8 md:mt-[20px] xl:mt-[139px]'>
                    <div className='eventHeading lg:ml-16'>
                      <div className='flex justify-center sm:justify-start'>
                        <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit'>
                          <div className='h-[13px] w-[13px] lg:h-[15px] lg:w-[15px] mr-1 mt-[2.5px] lg:mb-[3.5px]'>
                            <Image src={graphUp} alt="right arrow" className="w-full h-full"/>
                          </div>
                          <p className='text-[12px] lg:text-[14px] font-[400] uppercase explore text-stone-100 mt-[8px]'>Discover What's Trending in Lagos</p>
                        </div>
                      </div>
                      

                      <div className='topdetails text-center sm:text-start text-[1.5rem] leading-[1.5rem] sm:text-[30px] sm:leading-[30px] xl:text-[48px] font-[500] mt-4'>
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


                  <div className='px-6 lg:px-8 md:mt-[20px] mt-[100px] xl:mt-[139px]'>
                    <div className='eventHeading lg:ml-16'>
                      <div className='flex justify-center sm:justify-start'>
                        <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit'>
                          <div className='h-[13px] w-[13px] lg:h-[15px] lg:w-[15px] mr-1 mt-[2.5px] lg:mb-[3.5px]'>
                            <Image src={graphUp} alt="right arrow" className="w-full h-full"/>
                          </div>
                          <p className='text-[12px] lg:text-[14px] font-[400] uppercase explore text-stone-100 mt-[8px]'>Discover What's Trending in Lagos</p>
                        </div>
                      </div>
                      

                      <div className='topdetails text-center sm:text-start text-[1.5rem] leading-[1.5rem] sm:text-[30px] sm:leading-[30px] xl:text-[48px] font-[500] mt-4'>
                        <p>Top 10 Upcoming events in Lagos</p>
                      </div>
                    </div>
                


                    <div className='mt-7 lg:mt-[62px] w-full'>
                      <SwiperSlider cardType={2} />
                    </div>
                  </div>
                </div>
              </div>

              

              <div className='sec3 px-5 xl:px-16 pt-[10px] bg-[#EDEDED] w-full text-[#212121] pb-10'>
                <div className='eventHeading'>
                  <div className='discover flex items-center py-2 lg:py-3 px-5 bg-[#242424]/40 rounded-xl w-fit mt-[83px]'>
                    <div className='h-[13px] w-[13px] lg:h-[15px] lg:w-[15px] mr-1 mt-[2.5px] lg:mb-[3.5px]'>
                      <Image src={star} alt="right arrow" className="w-full h-full"/>
                    </div>
                    <p className='text-[12px] lg:text-[14px] font-[400] uppercase explore mt-[8px] text-[#212121]'>Featured</p>
                  </div>

                  <div className='topdetails text-[1.5rem] leading-[1.5rem] sm:text-[30px] sm:leading-[30px] xl:text-[48px] font-[500] mt-4'>
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



                <div className='mt-[32px] grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-4'>
                  
                  {eventsData.map((_event) => (
                       <EventCard event={_event}/>
                  ) )}
                 
                </div>

                <div className='flex justify-end mt-14'>
                  <div className='flex items-center py-[1px] xl:py-[8px] px-3 xl:px-6 rounded-[15px] xl:rounded-[40px] w-fit border-2'>
                    <p>SEE MORE</p>
                  </div>
                </div>
              </div>
              

              <div>
                  <div className='eventHeading lg:ml-16'>
                    <div className='flex justify-center sm:justify-start'>
                      <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit'>
                        <div className='h-[13px] w-[13px] lg:h-[15px] lg:w-[15px] mr-1 mt-[2.5px] lg:mb-[3.5px]'>
                          <Image src={graphUp} alt="right arrow" className="w-full h-full"/>
                        </div>
                        <p className='text-[12px] lg:text-[14px] font-[400] uppercase explore text-stone-100 mt-[8px]'>Discover What's Trending in Lagos</p>
                      </div>
                    </div>
                    

                    <div className='topdetails text-center sm:text-start text-[1.5rem] leading-[1.5rem] sm:text-[30px] sm:leading-[30px] xl:text-[48px] font-[500] mt-4'>
                      <p>Top 10 Upcoming events in Lagos</p>
                    </div>
                  </div>
              </div>
            </div>
          </div> 
      </Layout>
  );
}
