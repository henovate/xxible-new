"use client";

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Layout from '@/components/layout/layout';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return ( 
      <Layout>
          <div className='w-full h-screen relative bg-black'> 
            <div className='absolute top-0 left-0 h-full w-full flex'>
              <div className='h-full w-[85% pl-8'>
                <div className='flex align-middle mt-20'>
                  <div className='w-20 mr-10'>
                    <p>Dive into an Experience</p>
                  </div>
                  <div className='w-20'>
                    <p>Cruise with Leisure</p>
                  </div>
                </div>

                <div className='mt-20 w-60'>
                  <p>Find The Hottest Night Life Events, Vibes And Meet New People</p>
                </div>

                <div className='mt-11'>
                  <p className='night'>NIGHT LIFE</p>
                </div>
              </div>
              {/* <div className='h-full w-[15% bg-stone-100'></div> */}
            </div> 
          </div>  
      </Layout>
  );
}
