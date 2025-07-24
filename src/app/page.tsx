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
                
                <div className='flex align-middle mt-28 p-4 statement'>
                  <div className='w-25 mr-10'>
                    <p>Dive into an Experience</p>
                  </div>
                  <div className='w-25'>
                    <p>Cruise with Leisure</p>
                  </div>
                </div>

                <div className='mt-12 w-[50vw] p-4 flex justify-between'>
                  <p className='hero-summary w-[70%]'>Find The Hottest Night Life Events, Vibes And Meet New People.</p>
                  <p className='num'>(01)</p>
                </div>

                <div className='mt-5 flex align-middle gap-3'>
                  <p className='night'>NIGHT</p>
                  <div className='life px-5 h-full text-zinc-900 mt-[3.3vw]'>
                    <p className='m-0 p-0'>L</p>
                    <p className='m-0 p-0'>I</p>
                    <p className='m-0 p-0'>F</p>
                    <p className='m-0 p-0'>E</p>
                  </div>
                </div>

                {/* <div className='flex align-middle justify-center'>
                  <div className='w-25 mr-10'>
                    <p>Dive into an Experience</p>
                  </div>
                  <div className='w-25'>
                    <p>Cruise with Leisure</p>
                  </div>
                </div> */}
              </div>
              {/* <div className='h-full w-[15% bg-stone-100'></div> */}
            </div> 
          </div>  
      </Layout>
  );
}
