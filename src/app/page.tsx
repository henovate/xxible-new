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

              <div className='sec1 h-full px-8 mt-4 sm:mt-16 lg:mt-10'>
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
              


              <div className='sec2 w-full relative bg-[url("/assets/category-background.png")] mt-16 aspect-[1/1] bg-cover bg-center'>
                
                <div className='absolute inset-0 bg-black/40 z-10'></div>

                <div className='absolute inset-0 pt-8 md:pt-12 pb-8 z-20'>
                  <div className='w-full my-16 px-8'>              
                    <SwiperSlider cardType={1} />
                  </div>


                  <div className='px-8'>
                    <div className='eventHeading lg:ml-16'>
                      <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit md:mt-[50px] xl:mt-[139px]'>
                        <div className='h-[15px] w-[15px] mr-1 mb-[3.5px]'>
                          <Image src={graphUp} alt="right arrow" className="w-full h-full"/>
                        </div>
                        <p className='text-[14px] font-[400] uppercase explore text-stone-100'>Discover What's Trending in Lagos</p>
                      </div>

                      <div className='topdetails text-[48px] font-[500] mt-2'>
                        <p>Top 10 Upcoming events in Lagos</p>
                      </div>
                    </div>
                


                    <div className='mt-7 w-full'>
                      <SwiperSlider cardType={2} />
                    </div>
                  </div>
                </div>
              </div>

              

              <div className='sec3 px-16 pt-[10px] bg-[#EDEDED] w-full text-[#212121] pb-10'>
                <div className='eventHeading'>
                  <div className='discover flex items-center py-3 px-5 bg-[#242424]/40 rounded-xl w-fit mt-[83px]'>
                    <div className='h-[15px] w-[15px] mr-1 mb-[3.5px]'>
                      <Image src={star} alt="right arrow" className="w-full h-full"/>
                    </div>
                    <p className='text-[14px] font-[600] uppercase explore text-[#212121]'>Featured</p>
                  </div>

                  <div className='topdetail text-[48px] font-[600] mt-2'>
                    <p>Events Featured In Lagos</p>
                  </div>
                </div>


                <div className='flex gap-5 mt-6 catGroup text-[16px] font-[500] uppercase text-[#212121] explore'>
                  {/* <div className='flex items-center py-[8px] px-6 rounded-[40px] w-fit border-2'>
                    <p>ALL</p>
                  </div>

                  <div className='flex items-center py-[8px] px-6 rounded-[40px] w-fit border-2'>
                    <p>TODAY</p>
                  </div>

                  <div className='flex items-center py-[8px] px-6 rounded-[40px] w-fit border-2'>
                    <p>TOMORROW</p>
                  </div>

                  <div className='flex items-center py-[8px] px-6 rounded-[40px] w-fit border-2'>
                    <p>THIS WEEKEND</p>
                  </div>

                  <div className='flex items-center py-[8px] px-6 rounded-[40px] w-fit border-2'>
                    <p>FREE</p>
                  </div> */}
                </div>



                <div className='mt-[32px] grid sm:grid-cols-3 gap-4'>
                  <div>
                    <div className='card3 h-[605px] rounded-2xl bg-white p-4'>
                      <div className='card'>
                        <div className='relative h-[340px] w-full bg-[url("/assets/events/event3.png")] bg-cover bg-center rounded-2xl'>
                          <div className='absolute right-0 top-0 mt-3 m-3'>
                            <div className='cardNum h-[35px] w-[35px] rounded-full flex justify-center items-center bg-[#FFFFFF]'>
                              <div className='h-[17.67px] w-[20.53px] mt-4'>
                                  <Image src={blackLike} alt="like" className="w-full h-full"/>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      
                        <div className='h-[33%] w-full'>                         
                          <div className="card-info  text-[#696B6F] pt-5">
                            <div className='details2'>
                              <p className='type text-[22px] leading-[22px] mt-2 text-[#212121]'>Unleashing XXible Nightlife</p>
                              <p className='cat text-[14px] leading-[14px] mt-3'>Victoria Island Lagos</p>
                            </div>


                            <div className='mt-4 font-[600] text-[12px] w-[85%]'>                         
                              <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-[#696B6F] mb-1" />
                                  <span>Jun 13, 6PM</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Ticket className="w-3 h-3 text-[#696B6F] mb-1" />
                                  <span>₦50,000</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <div className='h-[11px] w-[11px] mb-1'>
                                    <Image src={likegray} alt="right arrow" className="w-full h-full"/>
                                  </div>
                                  <span>50 Interested</span>
                                </div>
                              </div>
                            </div>


                            <div className='flex items-center text-[11px] font-[500] gap-2 mt-3'>
                              <div className='flex items-center py-1 px-3 rounded-[20px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Girls Night</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Karaoke</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Dj Night</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>+ 3 More</p>
                              </div>
                            </div>


                            <div className='relative mt-6 flex items-center'>
                              <div className='absolute left-0 top-0 rounded-full h-8 w-8 bg-[#EDEDED] ml-[-30px]'></div>
                              <div className='px-3 absolute top-0 left-0'>
                                <div className='h-[2px] w-full mt-4'>
                                  <Image src={dash} alt="right arrow" className="w-full h-full"/>
                                </div>
                              </div>
                              <div className='absolute right-0 top-0 rounded-full h-8 w-8 bg-[#EDEDED] mr-[-30px]'></div>
                            </div>

                            <div className='mt-8'>
                              <div className='discover flex items-center'>
                                <div className='h-[30px] w-[30px] rounded-full mr-1'>
                                  <Image src={avatar1} alt="right arrow" className="w-full h-full"/>
                                </div>

                                <div className='capitalize'>
                                  <p className='text-[11px] font-[600] explore text-[#696B6F]'>Brand</p>
                                  <p className='text-[16px] font-[600] explore text-[#212121]'>Quilox - Explore nightlife in Lagos</p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>




                  <div>
                    <div className='card3 h-[605px] rounded-2xl bg-white p-4'>
                      <div className='card'>
                        <div className='relative h-[340px] w-full bg-[url("/assets/events/event3.png")] bg-cover bg-center rounded-2xl'>
                          {/* <div className='absolute right-0 top-0'>
                            <div className='cardNum h-[69.74px] w-[80.74px] border-[#0E101A] border-4 rounded-[11.6px] flex justify-center items-center text-[36px] font-[900] bg-zinc-900'>
                              <p>03</p>
                            </div>
                          </div> */}
                        </div>
                        
                      
                        <div className='h-[33%] w-full'>                         
                          <div className="card-info  text-[#696B6F] pt-5">
                            <div className='details2'>
                              <p className='type text-[22px] leading-[22px] mt-2 text-[#212121]'>Unleashing XXible Nightlife</p>
                              <p className='cat text-[14px] leading-[14px] mt-3'>Victoria Island Lagos</p>
                            </div>


                            <div className='mt-4 font-[600] text-[12px] w-[85%]'>                         
                              <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-[#696B6F] mb-1" />
                                  <span>Jun 13, 6PM</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Ticket className="w-3 h-3 text-[#696B6F] mb-1" />
                                  <span>₦50,000</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <div className='h-[11px] w-[11px] mb-1'>
                                    <Image src={likegray} alt="right arrow" className="w-full h-full"/>
                                  </div>
                                  <span>50 Interested</span>
                                </div>
                              </div>
                            </div>


                            <div className='flex items-center text-[11px] font-[500] gap-2 mt-3'>
                              <div className='flex items-center py-1 px-3 rounded-[20px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Girls Night</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Karaoke</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Dj Night</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>+ 3 More</p>
                              </div>
                            </div>


                            <div className='relative mt-6 flex items-center'>
                              <div className='absolute left-0 top-0 rounded-full h-8 w-8 bg-[#EDEDED] ml-[-30px]'></div>
                              <div className='px-3 absolute top-0 left-0'>
                                <div className='h-[2px] w-full mt-4'>
                                  <Image src={dash} alt="right arrow" className="w-full h-full"/>
                                </div>
                              </div>
                              <div className='absolute right-0 top-0 rounded-full h-8 w-8 bg-[#EDEDED] mr-[-30px]'></div>
                            </div>

                            <div className='mt-8'>
                              <div className='discover flex items-center'>
                                <div className='h-[30px] w-[30px] rounded-full mr-1'>
                                  <Image src={avatar1} alt="right arrow" className="w-full h-full"/>
                                </div>

                                <div className='capitalize'>
                                  <p className='text-[11px] font-[600] explore text-[#696B6F]'>Brand</p>
                                  <p className='text-[16px] font-[600] explore text-[#212121]'>Quilox - Explore nightlife in Lagos</p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div>
                    <div className='card3 h-[605px] rounded-2xl bg-white p-4'>
                      <div className='card'>
                        <div className='relative h-[340px] w-full bg-[url("/assets/events/event3.png")] bg-cover bg-center rounded-2xl'>
                          {/* <div className='absolute right-0 top-0'>
                            <div className='cardNum h-[69.74px] w-[80.74px] border-[#0E101A] border-4 rounded-[11.6px] flex justify-center items-center text-[36px] font-[900] bg-zinc-900'>
                              <p>03</p>
                            </div>
                          </div> */}
                        </div>
                        
                      
                        <div className='h-[33%] w-full'>                         
                          <div className="card-info  text-[#696B6F] pt-5">
                            <div className='details2'>
                              <p className='type text-[22px] leading-[22px] mt-2 text-[#212121]'>Unleashing XXible Nightlife</p>
                              <p className='cat text-[14px] leading-[14px] mt-3'>Victoria Island Lagos</p>
                            </div>


                            <div className='mt-4 font-[600] text-[12px] w-[85%]'>                         
                              <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-[#696B6F] mb-1" />
                                  <span>Jun 13, 6PM</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Ticket className="w-3 h-3 text-[#696B6F] mb-1" />
                                  <span>₦50,000</span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <div className='h-[11px] w-[11px] mb-1'>
                                    <Image src={likegray} alt="right arrow" className="w-full h-full"/>
                                  </div>
                                  <span>50 Interested</span>
                                </div>
                              </div>
                            </div>


                            <div className='flex items-center text-[11px] font-[500] gap-2 mt-3'>
                              <div className='flex items-center py-1 px-3 rounded-[20px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Girls Night</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Karaoke</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>Dj Night</p>
                              </div>

                              <div className='flex items-center py-1 px-3 rounded-[40px] w-fit bg-[#EDEDED]'>
                                <p className='explore text-[#898989]'>+ 3 More</p>
                              </div>
                            </div>


                            <div className='relative mt-6 flex items-center'>
                              <div className='absolute left-0 top-0 rounded-full h-8 w-8 bg-[#EDEDED] ml-[-30px]'></div>
                              <div className='px-3 absolute top-0 left-0'>
                                <div className='h-[2px] w-full mt-4'>
                                  <Image src={dash} alt="right arrow" className="w-full h-full"/>
                                </div>
                              </div>
                              <div className='absolute right-0 top-0 rounded-full h-8 w-8 bg-[#EDEDED] mr-[-30px]'></div>
                            </div>

                            <div className='mt-8'>
                              <div className='discover flex items-center'>
                                <div className='h-[30px] w-[30px] rounded-full mr-1'>
                                  <Image src={avatar1} alt="right arrow" className="w-full h-full"/>
                                </div>

                                <div className='capitalize'>
                                  <p className='text-[11px] font-[600] explore text-[#696B6F]'>Brand</p>
                                  <p className='text-[16px] font-[600] explore text-[#212121]'>Quilox - Explore nightlife in Lagos</p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              
            </div>
          </div> 
      </Layout>
  );
}
