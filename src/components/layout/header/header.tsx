import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import brandLogo from "../../../../public/assets/icons/brandLogo.png";
import searchIcon from "../../../../public/assets/icons/searchIcon.png";
import signUpIcon from "../../../../public/assets/icons/signuplogo.png";
import "../../../../public/styles/main.css";
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
  



const Header = () => {
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

  return (
	<div>
		<div className="nav-container [display:none] md:[display:flex] main-tool-bar z-40">
			<Link className="flex justify-start items-center gap-1" href="/">
				<div className="brand-logo-cont">
					<Image src={brandLogo} alt="brand Logo" className="brand-logo"/>
				</div>
			</Link>
	
		
			<div className="search-wrapper">
				<form className="search-container font-[400] text-[16px]">
					<div className="search-icon-cont ml-3 w-[17px] h-[17px] mr-[10px]">
						<Image src={searchIcon} alt="search icon" className="search-icon w-full h-full object-cover"/>
					</div>
					<input type="text" name="search" id="username" autoComplete="search" className="search-input" /> |

					<div className='search-option'>
						<Select> 
							<SelectTrigger className="w-[170px]">
								<SelectValue placeholder="Select Location" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup className='search-option-content text-[16px]'>
									<SelectLabel>Location</SelectLabel>

									<SelectItem value="apple">Lagos, NG</SelectItem>
									<SelectItem value="banana">Banana</SelectItem>
									<SelectItem value="blueberry">Blueberry</SelectItem>
									<SelectItem value="grapes">Grapes</SelectItem>
									<SelectItem value="pineapple">Pineapple</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					
					<button className="flex justify-between align-middle search-btn">
					<div className="search-icon-cont w-[17px] h-[17px] mr-[10px] mt-[3px]">
						<Image src={searchIcon} alt="search icon" className="search-icon"/>
					</div>
					<span>Search</span>
					</button>
				</form>
			</div>
		
		
			<div className="logIn-signUp-cont font-[500] text-[16px]">     
				<div>
					<span className="login">Log in</span>
				</div>

				<button className="signup-btn">
					<span>Sign Up</span>
					<div className="signup-icon-cont">
						<Image src={signUpIcon} alt="search icon" className="signup-icon"/>
					</div>
				</button>  
			</div>
    	</div>
	</div>
  )
}

export default Header