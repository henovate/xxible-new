"use client";

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Layout from '@/components/layout/layout';
import CircularText from '../../src/components/circularText/circularText';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return ( 
      <Layout>
          <div className='w-full h-screen relative bg-black'> 
            <div className='absolute top-0 left-0 h-full w-full flex'>
              <div className='h-full pl-8'>
                
                {/* <div className='flex align-middle mt-28 p-4 statement'>
                  <div className='w-25 mr-10'>
                    <p>Dive into an Experience</p>
                  </div>
                  <div className='w-25'>
                    <p>Cruise with Leisure</p>
                  </div>
                </div> */}

                <div className='pt-20 flex align-middle gap-3 bg-black'>
                  <p className='night'>NIGHT LIFE</p>
                </div>

                <div className='mt-12 flex gap-3'>
                  <div className='w-[45.5vw] h-[500px] pl-3'>
                    {/* Video Section */}
                    <div className='video-container w-full h-full'>
                    <video className='w-full h-auto' muted autoPlay loop>
                      <source src='/assets/vid/concert1.mp4' type='video/mp4' />
                    </video>
                    </div>
                  </div>

                  <div>
                    <div className='w-[24vw]'>
                      <p className='hero-summary'>Find The Hottest Night Life Events, Vibes And Meet New People. Dive into an Experience.</p>
                    </div>

                    <div className='ml-[-270px] mt-3'>
                      <CircularText
                        text="DIVE*INTO*AN*EXPERIENCE*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="custom-class"
                      />
                    </div>

                    {/* <div className='life'>
                      <p>Life</p>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className='h-full w-[15% bg-stone-100'></div> */}
            </div> 
          </div>  
      </Layout>
  );
}
