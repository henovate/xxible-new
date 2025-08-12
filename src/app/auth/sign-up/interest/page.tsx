"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import "../../../../../public/styles/main.css";
import brandLogo from "../../../../../public/assets/icons/logo2.png";

const interestsData = [
  "Music",
  "Dancing",
  "Clubbing",
  "Make New Friends",
  "Karaoke",
  "Game Night",
  "Hype Man",
  "Here for Vibes",
  "Baddies",
  "Island Flex",
  "Mainland Cruise",
  "Ready to mingle",
  "Lounge Vibes",
  "Girls Night",
  "Night Out",
  "Link Up",
  "Rich Energy",
  "After Party",
  "DJ Night",
]

const Page = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    // "Make New Friends",
    // "Music",
    // "Rich Energy",
    // "After Party",
  ])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
    )
  }

  const isContinueEnabled = selectedInterests.length >= 3

  return (
    <div className="sign-up-cont min-h-screen bg-gray-100 flex flex-col pt-8 pb-16">
      {/* Header Logo */}
      	<div className="w-full max-w-6xl flex justify-start pl-8">
		  <Link className="flex items-center" href="/">
			<div className="h-[30px] w-[66.2px]">
				<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
			</div>
		  </Link>
		</div>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center w-full mt-[10px] px-4 sm:px-[200px]">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:px-10 md:pb-6 md:pt-0 w-full mx-auto text-center">

          {/* Text Content */}
		  <div className="flex justify-center items-center">
				<div className="max-w-[1000px] bg-[url('/assets/img/interest.svg')] bg-cover bg-center bg-no-repeat">
					<h2 className="text-xl leading-[23px] sm:text-2xl sm:leading-[24px] font-[600] text-[#212121] mb-2 mt-[230px]">Get started by picking a few interests</h2>
					<p className="text-sm leading-[17px] text-[#A0A0A0] mb-1">These help with future event and Vibes recommendations.</p>
					<p className="text-sm leading-[17px] text-[#007AFF] mb-16">Select at least 3 interests.</p>
				</div>
		  </div>
          {/* Interests Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {interestsData.map((interest) => {
              const isSelected = selectedInterests.includes(interest)
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`
                    flex items-center gap-1 px-3 py-[3px] rounded-full text-[12px] font-medium transition-colors duration-200
                    ${
                      isSelected
                        ? "bg-[#F800E9] text-white"
                        : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  {interest}
                  {isSelected && <Check className="w-4 h-4 ml-1" />}
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <button
            className={`
              w-full max-w-xs py-3 rounded-lg text-base font-medium transition-colors duration-200
              ${
                isContinueEnabled
                  ? "bg-purple-700 text-white hover:bg-purple-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
            disabled={!isContinueEnabled}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
