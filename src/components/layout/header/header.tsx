'use client';

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
import SearchBar from '@/components/utility/searchBar/searchBar';

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
            <div className="hidden lg:flex main-tool-bar fixed top-0 left-0 right-0 z-40 bg-transparent px-4 pt-5 items-center justify-between">
                {/* Logo */}
                <Link className="flex items-center gap-1 flex-shrink-0" href="/">
                    <div>
                        <div className="w-full h-full flex items-center">
							<div className="h-[30px] w-[80px] 2xl:h-[43px] 2xl:w-[111px]">
			 					<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
			 				</div>
                        </div>
                    </div>
                </Link>

                {/* Search Bar */}
                <SearchBar />

                {/* Auth Buttons */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Link href="/login" className="text-white hover:text-gray-300 transition-colors text-sm 2xl:text-base font-medium">
                        Log in
                    </Link>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm 2xl:text-base font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
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
                    <div className="bg-black border-t border-zinc-700 px-4 py-4">
                        {/* Mobile Search */}
                        <div className="mb-4">
                            <form className="space-y-3">
                                <div className="flex items-center bg-zinc-800 rounded-lg px-3 py-2 border border-zinc-700">
                                    <Search className="w-4 h-4 text-zinc-400 mr-2" />
                                    <input 
                                        type="text" 
                                        name="search" 
                                        placeholder="Beach Party"
                                        className="flex-1 bg-transparent text-white placeholder-zinc-400 outline-none text-sm 2xl:text-base"
                                    />
                                </div>
                                <div className="w-full">
                                    <Select>
                                        <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
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
                                    className="w-full bg-white text-zinc-900 py-2 rounded-lg text-sm font-medium hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Search className="w-4 h-4" />
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Mobile Auth */}
                        <div className="space-y-3 pt-3 border-t border-zinc-700">
                            <Link 
                                href="/login" 
                                className="block text-white hover:text-zinc-300 transition-colors text-sm 2xl:text-base font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <button 
                                className="w-full bg-white text-zinc-900 py-2 rounded-lg text-sm font-medium hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign Up
                                <div className="w-4 h-4 bg-zinc-900 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs 2xl:text-base">+</span>
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
