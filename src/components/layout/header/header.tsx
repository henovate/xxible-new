// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import brandLogo from "../../../../public/assets/icons/brandLogo.png";
// import searchIcon from "../../../../public/assets/icons/searchIcon.png";
// import signUpIcon from "../../../../public/assets/icons/signuplogo.png";
// import "../../../../public/styles/main.css";
// import { gsap } from "gsap";  
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
// 	Select,
// 	SelectContent,
// 	SelectGroup,
// 	SelectItem,
// 	SelectLabel,
// 	SelectTrigger,
// 	SelectValue,
//   } from "@/components/ui/select";
  



// const Header = () => {
// 	gsap.registerPlugin(ScrollTrigger);
// 	const showAnim = gsap.from('.main-tool-bar', { 
// 		yPercent: -100,
// 		paused: true,
// 		duration: 0.2
// 	  }).progress(1);
	  
// 	  ScrollTrigger.create({
// 		start: "top top",
// 		end: "max",
// 		onUpdate: (self) => {
// 		  self.direction === -1 ? showAnim.play() : showAnim.reverse()
// 		}
// 	  });

//   return (
// 	<div>
// 		<div className="nav-container [display:none] md:[display:flex] main-tool-bar z-40">
// 			<Link className="flex justify-start items-center gap-1" href="/">
// 				<div className="h-[30px] w-[80px]">
// 					<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
// 				</div>
// 			</Link>
	
		
// 			<div className="search-wrapper">
// 				<form className="search-container font-[400] text-[16px]">
// 					<div className="search-icon-cont ml-3 w-[17px] h-[17px] mr-[10px]">
// 						<Image src={searchIcon} alt="search icon" className="search-icon w-full h-full object-cover"/>
// 					</div>
// 					<input type="text" name="search" id="username" autoComplete="search" className="search-input" /> |

// 					<div className='search-option'>
// 						<Select> 
// 							<SelectTrigger className="w-[170px]">
// 								<SelectValue placeholder="Select Location" />
// 							</SelectTrigger>
// 							<SelectContent>
// 								<SelectGroup className='search-option-content text-[16px]'>
// 									<SelectLabel>Location</SelectLabel>

// 									<SelectItem value="apple">Lagos, NG</SelectItem>
// 									<SelectItem value="banana">Banana</SelectItem>
// 									<SelectItem value="blueberry">Blueberry</SelectItem>
// 									<SelectItem value="grapes">Grapes</SelectItem>
// 									<SelectItem value="pineapple">Pineapple</SelectItem>
// 								</SelectGroup>
// 							</SelectContent>
// 						</Select>
// 					</div>
					
// 					<button className="flex justify-between align-middle search-btn">
// 					<div className="search-icon-cont w-[17px] h-[17px] mr-[10px] mt-[3px]">
// 						<Image src={searchIcon} alt="search icon" className="search-icon"/>
// 					</div>
// 					<span>Search</span>
// 					</button>
// 				</form>
// 			</div>
		
		
// 			<div className="logIn-signUp-cont font-[500] text-[16px]">     
// 				<div>
// 					<span className="login">Log in</span>
// 				</div>

// 				<button className="signup-btn">
// 					<span>Sign Up</span>
// 					<div className="signup-icon-cont">
// 						<Image src={signUpIcon} alt="search icon" className="signup-icon"/>
// 					</div>
// 				</button>  
// 			</div>
//     	</div>
// 	</div>
//   )
// }

// export default Header








'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { gsap } from "gsap";  
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import brandLogo from "../../../../public/assets/icons/brandLogo.png";
import "../../../../public/styles/main.css";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const showAnim = gsap.from('.main-tool-bar', {         
            yPercent: -100,
            paused: true,
            duration: 0.2
        }).progress(1);      
        
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="w-full">
            {/* Desktop Header */}
            <div className="hidden lg:flex main-tool-bar fixed top-0 left-0 right-0 z-40 bg-transparent px-4 pt-5 pb-3 items-center justify-between">
                {/* Logo */}
                <Link className="flex items-center gap-1 flex-shrink-0" href="/">
                    <div className="h-[30px] w-[80px]">
                        <div className="w-full h-full flex items-center">
							<div className="h-[30px] w-[80px]">
			 					<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
			 				</div>
                        </div>
                    </div>
                </Link>

                {/* Search Bar */}
                <div className="search-wrapper flex-1 max-w-2xl mx-8 rounded-full">
                    <form className="search-container flex items-center bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
                        <Search className="w-4 h-4 text-gray-400 mr-3" />
                        <input 
                            type="text" 
                            name="search" 
                            placeholder="Beach Party"
                            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                        />
                        <div className="w-px h-4 bg-gray-600 mx-3"></div>
                        <div className="min-w-[140px]">
                            <Select>
                                <SelectTrigger className="border-none bg-transparent text-white text-sm h-auto p-0 focus:ring-0">
                                    <SelectValue placeholder="Lagos, NG" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Location</SelectLabel>
                                        <SelectItem value="lagos">Lagos, NG</SelectItem>
                                        <SelectItem value="abuja">Abuja, NG</SelectItem>
                                        <SelectItem value="kano">Kano, NG</SelectItem>
                                        <SelectItem value="ibadan">Ibadan, NG</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <button 
                            type="submit"
                            className="ml-3 bg-white text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </button>
                    </form>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link href="/login" className="text-white hover:text-gray-300 transition-colors text-sm font-medium">
                        Log in
                    </Link>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                        Sign Up
                        <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">+</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black pt-4">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link className="flex items-center" href="/">
						<div className="h-[30px] w-[80px]">
							<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
						</div>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white p-2"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="bg-gray-900 border-t border-gray-700 px-4 py-4">
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <form className="space-y-3">
                                <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 border border-gray-700">
                                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                                    <input 
                                        type="text" 
                                        name="search" 
                                        placeholder="Beach Party"
                                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select>
                                        <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Location</SelectLabel>
                                                <SelectItem value="lagos">Lagos, NG</SelectItem>
                                                <SelectItem value="abuja">Abuja, NG</SelectItem>
                                                <SelectItem value="kano">Kano, NG</SelectItem>
                                                <SelectItem value="ibadan">Ibadan, NG</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full bg-white text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Mobile Auth */}
                        <div className="space-y-3 pt-3 border-t border-gray-700">
                            <Link 
                                href="/login" 
                                className="block text-white hover:text-gray-300 transition-colors text-sm font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <button 
                                className="w-full bg-white text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign Up
                                <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">+</span>
                                </div>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Spacer to prevent content from going under fixed header */}
            <div className="h-16 lg:h-[60px]"></div>
        </div>
    );
};

export default Header;
