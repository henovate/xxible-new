"use client"


import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image";
import Link from "next/link";
import brandLogo from "../../../../../public/assets/icons/logo2.png";
import "../../../../../public/styles/main.css";
import InputSelect from "../../component/select-comp/select";


const Page = () => {
	const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
	const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"))
	const currentYear = new Date().getFullYear()
	const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())
  
	return (
	  <div className="container sign-up-cont min-h-screen flex flex-col bg-gray-100 pt-8 pb-16">
		{/* Header Logo */}
		<div className="w-full max-w-6xl flex justify-start pl-8">
		  <Link className="flex items-center" href="/">
			<div className="h-[30px] w-[66.2px]">
				<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
			</div>
		  </Link>
		</div>
  
		{/* Main Card */}
		<div className="flex-1 flex items-center justify-center h-full w-full mt-[10px] px-4 sm:px-[120px] 2xl:px-[200px] ">
		  <div className="relative bg-white rounded-xl p-1 w-full mx-auto h-full">
			<div className="max-h-full h-full px-6 pb-6 sm:px-8 sm:pb-8 md:px-20 md:pb-[20px] text-center">


			<div className="flex justify-center items-center">
				<div className="max-w-[768px] bg-[url('/assets/img/dob.svg')] bg-cover bg-center bg-no-repeat">
					{/* Text Content */}
					<h2 className="text-xl sm:text-2xl sm:leading-[24px] font-[600] text-[#212121] mt-[200px] mb-0">Let's get to know you!</h2>
					<p className="text-lg leading-[21px] lg:text-2xl lg:leading-[24px] font-[600] text-[#212121]">Enter your date of birth</p>
					<p className="text-[14px] leading-[17px] 2xl:text-[16px] 2xl:leading-[19px] font-[500] text-gray-500 mb-[43px] max-w-[427.8px] mx-auto mt-[24px]">
						We use your age to personalize event recommendations. Your information stays confidential.
					</p>	
				</div>
			</div>
			
			 
  
			  {/* Date Selectors */}
			  <div className="dob text-[#212121] flex flex-col sm:flex-row gap-3 justify-center mb-[80px] lg:mb-[120px]">			 
				<InputSelect data={months} placeholder="MM" />
				<InputSelect data={days} placeholder="DD" />
				<InputSelect data={years} placeholder="YYYY" />
			  </div>
  
			  {/* Continue Button */}
			  <button className="bg-[#E9E9E9] text-[#A0A0A0] px-12 py-2.5 rounded-lg text-base font-medium hover:bg-gray-300 transition-colors">
				Continue
			  </button>
			</div>
		  </div>
		</div>
	  </div>
	)
  }
  
  export default Page;