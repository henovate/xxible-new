"use client"

import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import Image from 'next/image';
import brandLogo from "../../../../../public/assets/icons/brandLogo.png";

const Footer = () => {
  return (
	<div>    
      {/* Footer */}
      <footer className="bg-[#131313] text-white">
        {/* Newsletter Section */}
        <div>
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-[60px]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-[24px] leading-[26px] font-medium lg:w-[60%] 2xl:w-[50%]">
                  Join Our Newsletter to Keep Up to Date With Us
                </h3>
              </div>
              <div className="flex-shrink-0">
                <div className="flex rounded-full p-[3px] bg-white overflow-hidden xl:w-[560px] max-w-[560px]">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="flex-1 px-4 py-2 text-gray-900 placeholder-gray-500 placeholder:text-[16px] focus:outline-none min-w-0"
                  />
                  <button className="bg-[#212121] text-white px-6 py-2 text-[16px] font-medium hover:bg-[#353434] transition-colors rounded-[30px]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[50%_1fr_1fr_1fr] gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <div className="flex items-center">
					<div className="h-[30px] w-[80px]">
						<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
					</div>
                </div>
              </div>
              <p className="text-gray-300 text-[16px] mb-6 leading-[21px] lg:w-[50%]">
                Discover the pulse of the city after dark — real events, real vibes, and real people all in one place.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#" className="inline-block">
                  <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 border border-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="inline-block">
                  <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 border border-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Your Account Column */}
            <div>
              <h4 className="text-white font-medium mb-4">Your Account</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-[16px]">Sign up</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-[16px]">Log in</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-[16px]">Help</a></li>
              </ul>
            </div>

            {/* Discover Column */}
            <div>
              <h4 className="text-white font-medium mb-4">Discover</h4>
              <ul className="space-y-3 font-[400]">
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Vibes</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Calendar</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Topics</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Cities</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Online Events</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Local Guides</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Make Friends</a></li>
              </ul>
            </div>

            {/* Xxible Column */}
            <div>
              <h4 className="text-white font-medium mb-4">Xxible</h4>
              <ul className="space-y-3 font-[400]">
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">About</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Blog</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">XXible Pro</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Careers</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Apps</a></li>
                <li><a href="#" className="text-[#C5C4C4] hover:text-white transition-colors text-[16px]">Podcast</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-400">
                © 2025, XXible
              </div>
              <div className="flex flex-wrap gap-4 text-sm font-[400]">
                <a href="#" className="text-[#C5C4C4] hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-[#C5C4C4] hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-[#C5C4C4] hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="text-[#C5C4C4] hover:text-white transition-colors">License Attribution</a>
                <a href="#" className="text-[#C5C4C4] hover:text-white transition-colors">Help</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer