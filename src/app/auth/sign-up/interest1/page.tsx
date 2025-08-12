"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../../../../../public/styles/main.css";
import brandLogo from "../../../../../public/assets/icons/logo2.png";

const interestsRows = [
  ["Music", "Dancing", "Clubbing", "Make New Friends"],
  ["Mainland Cruise", "Ready to mingle", "Lounge Vibes"],
  ["Girls Night", "Night Out", "Link Up", "Rich Energy"],
  ["Karaoke", "Game Night", "Hype Man", "DJ Nights"],
  ["After Party", "Here for Vibes", "Baddie"],
  ["Music", "Island Flex"],
]

const InterestsPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest],
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:px-8 lg:pb-8 md:pt-6">
      {/* Header with Logo and Skip */}
      <div className="w-full max-w-6xl flex justify-start  pb-6 px-4 sm:px-6 lg:px-8 lg:pb-0">
        <Link className="flex items-center" href="/">
			<div className="h-[30px] w-[66.2px]">
				<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
			</div>
        </Link>
      </div>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="bg-white bg-[url('/assets/img/bg4.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-lg p-6 sm:p-8 md:px-10 md:pb-6 md:pt-6 w-full max-w-4xl mx-auto text-center">
		<div className="flex justify-end mb-2">
			<Link href="#" className="text-gray-600 hover:text-gray-800 text-sm">
			Skip
			</Link>
		</div>
          {/* Text Content */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Get started by picking a few interests</h2>
          <p className="text-sm text-gray-600 mb-1">These help with future event and Vibes recommendations.</p>
          <p className="text-sm text-[#007AFF] mb-12">Select at least 3 interests.</p>

          <div className="space-y-4 mb-8">
            {interestsRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
                {row.map((interest) => {
                  const isSelected = selectedInterests.includes(interest)
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                        ${
                          isSelected
                            ? "bg-[#F800E9] text-white"
                            : "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100"
                        }
                      `}
                    >
                      {interest}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterestsPage
