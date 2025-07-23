import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import brandLogo from "../../../../public/assets/icons/brandLogo.png";
import searchIcon from "../../../../public/assets/icons/searchIcon.png";
import signUpIcon from "../../../../public/assets/icons/signuplogo.png";
import "../../../../public/styles/main.css";
import { gsap } from "gsap";  
import { ScrollTrigger } from "gsap/ScrollTrigger";



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
				<div className="search-container">
					<input type="text" name="search" id="username" autoComplete="search" className="search-input" />
					<button className="flex justify-between align-middle search-btn">
					<div className="search-icon-cont">
						<Image src={searchIcon} alt="search icon" className="search-icon"/>
					</div>
					<span>Search</span>
					</button>
				</div>
			</div>
		
		
			<div className="logIn-signUp-cont">     
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