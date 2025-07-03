"use client";

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#000000]'}`}>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="max-w-8xl mx-auto px-8 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/images/vectors/logo.svg" alt="Logo" className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="flex items-center">
              <img src="/images/vectors/theme_toggle.svg" alt="Theme Toggle" className="w-20 h-20" />
            </button>
            <button className={`${theme === 'dark' ? 'text-[#FFFFFF] hover:text-[#773AD8]' : 'text-[#000000] hover:text-[#773AD8]'} transition-colors`}>
              Log In
            </button>
            <button className={`${theme === 'dark' ? 'bg-[#FFFFFF] text-[#000000]' : 'bg-[#000000] text-[#FFFFFF]'} px-4 py-2 rounded-full hover:opacity-90 transition-opacity`}>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="w-full bg-cover bg-center bg-no-repeat pt-24"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-20 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find The Hottest Nightlife<br />
              Events, Vibes, And Meet<br />
              <span className="text-[#773AD8]">New People</span>
            </h1>
            <p className={`${theme === 'dark' ? 'text-[#C5C4C4]' : 'text-[#696B6F]'} text-lg mb-8 max-w-md`}>
              Updates on exclusive parties, night clubs, and the coolest crowd — all in one place.
            </p>
            
            {/* Search Bar with Location */}
            <div className="relative w-lg">
              <div className="flex items-center bg-[#FFFFFF] rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 px-6 py-4 text-[#000000] placeholder-[#696B6F] bg-transparent border-none outline-none"
                />
                <div className="flex items-center px-4 py-4 border-l border-[#EDEDED]">
                  <MapPin size={16} className="text-[#696B6F] mr-2" />
                  <span className="text-[#000000] text-sm">Lagos, NG</span>
                </div>
                <button className="bg-[#773AD8] text-[#FFFFFF] p-3 m-1 w-md rounded-full hover:bg-[#8050D1] transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Events Near You */}
      <section 
        className="w-full relative"
        style={{
          backgroundImage: 'url(/images/category-background.png)',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-20 py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative">
              {/* Backdrop blur effect */}
              <div className="absolute -inset-4 bg-[#773AD8]/20 rounded-full blur-xl"></div>
              <img src="/images/vectors/vibe.svg" alt="Vibe Icon" className="w-6 h-6 relative z-10" />
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-[#773AD8]/10 rounded-lg blur-xl"></div>
              <span className={`${theme === 'dark' ? 'text-[#C5C4C4]' : 'text-[#696B6F]'} relative z-10`}>VIBES</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-12">
            Discover Events Near <span className="text-[#773AD8]">You</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Night Clubs */}
            <div className="relative h-74 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent z-10"></div>
              <img 
                src="/images/categories/nightclubs.png" 
                alt="Night Clubs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-sm text-[#C5C4C4] mb-1">Easy Search</p>
                <h3 className="text-xl font-bold text-[#FFFFFF]">Night Clubs</h3>
              </div>
            </div>

            {/* House Parties */}
            <div className="relative h-74 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent z-10"></div>
              <img 
                src="/images/categories/house-parties.png" 
                alt="House Parties"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-sm text-[#C5C4C4] mb-1">Easy Search</p>
                <h3 className="text-xl font-bold text-[#FFFFFF]">House Parties</h3>
              </div>
            </div>

            {/* Pool Parties */}
            <div className="relative h-74 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent z-10"></div>
              <img 
                src="/images/categories/pool-parties.png" 
                alt="Pool Parties"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-sm text-[#C5C4C4] mb-1">Easy Search</p>
                <h3 className="text-xl font-bold text-[#FFFFFF]">Pool Parties</h3>
              </div>
            </div>

            {/* Lounge & Bars */}
            <div className="relative h-74 rounded-xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent z-10"></div>
              <img 
                src="/images/categories/lounges.png" 
                alt="Lounge & Bars"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-sm text-[#C5C4C4] mb-1">Easy Search</p>
                <h3 className="text-xl font-bold text-[#FFFFFF]">Lounge & Bars</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Curved decorations using image tags */}
        <div className="relative bottom-20 left-0 right-0 h-36 overflow-visible">
          {/* Left curved decoration - starts from left edge */}
          <img 
            src="/images/vectors/curved1.png" 
            alt="Left Curved Decoration"
            className="absolute bottom-0 left-0 w-3/8 h-full object-cover"
          />
          {/* Right curved decoration - starts and ends at right edge */}
          <img 
            src="/images/vectors/curved2.png" 
            alt="Right Curved Decoration"
            className="absolute bottom-0 right-0 w-3/8 h-full object-cover"
          />
        </div>
      </section>

      {/* Top 10 Upcoming Events */}
      <section 
        className="w-full relative"
        style={{
          background: `radial-gradient(circle at center, rgba(119, 58, 216, 0.15) 0%, rgba(35, 31, 32, 0.8) 50%, ${theme === 'dark' ? '#000000' : '#FFFFFF'} 100%)`
        }}
      >
        <div className="max-w-8xl mx-auto px-8 lg:px-20 py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#F800E9]/20 rounded-full blur-xl"></div>
              <span className="text-[#F800E9] text-2xl relative z-10">
                <img src="/images/vectors/vibe.svg" alt="Vibe Icon" className="w-6 h-6 relative z-10" />
              </span>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-[#F800E9]/10 rounded-lg blur-md"></div>
              <span className={`${theme === 'dark' ? 'text-[#C5C4C4]' : 'text-[#696B6F]'} relative z-10`}>DISCOVER WHAT'S TRENDING IN LAGOS</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-12">
            Top 10 Upcoming Events In <span className="text-[#773AD8]">Lagos</span>
          </h2>
        </div>
        
        {/* Horizontal scrolling container */}
        <div className="max-w-8xl mx-auto">
          <div className="pl-8 lg:pl-20">
            <div className="flex gap-6 overflow-x-auto pb-4 pr-8 scrollbar-hide">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-72 rounded-xl overflow-hidden relative">
                  <div className="relative">
                    <img 
                      src={`/images/events/event${index + 1}.png`}
                      alt={`Event ${index + 1}`}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#773AD8] text-[#FFFFFF] px-2 py-1 rounded-full text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Content overlay with backdrop */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 h-29 bg-black/60 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-[#C5C4C4]">Top Ten</span>
                      </div>
                      <h3 className="font-bold mb-2 text-[#FFFFFF]">Unleashing XXible Nightlife</h3>
                      <div className="flex items-center gap-4 text-sm text-[#C5C4C4] mb-2">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-[#773AD8] rounded-full"></span>
                          <span>VGC, Ajah</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-[#F800E9] rounded-full"></span>
                          <span>₦50,000</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#C5C4C4] mb-2">
                        <span>📅 Jun 13, 6PM</span>
                        <span>👥 50 Interested</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Featured In Lagos */}
      <section className={`w-full ${theme === 'dark' ? 'bg-[#000000]' : 'bg-[#F7F7F8]'}`}>
        <div className="max-w-8xl mx-auto px-8 lg:px-20 py-16">
          <div className="flex items-center gap-2 mb-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#7C4CD8]/20 rounded-full blur-xl"></div>
              <span className="text-[#7C4CD8] text-2xl relative z-10">⭐</span>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 bg-[#7C4CD8]/10 rounded-lg blur-md"></div>
              <span className={`${theme === 'dark' ? 'text-[#C5C4C4]' : 'text-[#696B6F]'} relative z-10`}>FEATURED</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-8">
            Events Featured In <span className="text-[#773AD8]">Lagos</span>
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex gap-4 mb-8 flex-wrap">
            <button className="px-4 py-2 bg-[#773AD8] text-[#FFFFFF] rounded-full">ALL</button>
            <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-[#231F20] text-[#C5C4C4]' : 'bg-[#EDEDED] text-[#696B6F]'} rounded-full hover:opacity-80 transition-opacity`}>TODAY</button>
            <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-[#231F20] text-[#C5C4C4]' : 'bg-[#EDEDED] text-[#696B6F]'} rounded-full hover:opacity-80 transition-opacity`}>TOMORROW</button>
            <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-[#231F20] text-[#C5C4C4]' : 'bg-[#EDEDED] text-[#696B6F]'} rounded-full hover:opacity-80 transition-opacity`}>THIS WEEKEND</button>
            <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-[#231F20] text-[#C5C4C4]' : 'bg-[#EDEDED] text-[#696B6F]'} rounded-full hover:opacity-80 transition-opacity`}>FREE</button>
          </div>
          
          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={`${theme === 'dark' ? 'bg-[#231F20]' : 'bg-[#FFFFFF]'} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
                <div className="relative">
                  <img 
                    src={`/images/featured/featured${index + 1}.png`}
                    alt={`Featured Event ${index + 1}`}
                    className="w-full h-58 object-cover"
                  />
                  <button className="absolute top-3 right-3 bg-[#FFFFFF]/90 p-1 rounded-full">
                    <span className="text-[#F800E9]">⭐</span>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-[#FFFFFF]' : 'text-[#000000]'}`}>Unleashing XXible Nightlife</h3>
                  <div className="flex items-center gap-2 text-sm text-[#696B6F] mb-2">
                    <span>📅 Dec 15</span>
                    <span>📍 Victoria Island</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#696B6F] mb-4">
                    <span>💰 ₦5,000</span>
                    <span>👥 250 going</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img 
                      src={`/images/avatars/avatar${index + 1}.png`}
                      alt="Organizer"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-[#696B6F]">Oxlade - Explore nightlife in Lagos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-8">
            <button className="bg-[#773AD8] text-[#FFFFFF] px-6 py-3 rounded-full hover:bg-[#8050D1] transition-colors">
              SEE MORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
