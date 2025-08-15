'use client'

import { useState } from 'react';
import { User, Heart, Users, UserX  } from 'lucide-react';
import Link from 'next/link';
import "../../../../../public/styles/main.css"
import brandLogo from "../../../../../public/assets/icons/logo2.png";
import manLogo from "../../../../../public/assets/icons/Men.png";
import womanLogo from "../../../../../public/assets/icons/Women.png";
import forbiddenLogo from "../../../../../public/assets/icons/Forbidden.png";
import binaryLogo from "../../../../../public/assets/icons/Union.png";
import Image from 'next/image';


const Page = () => {
    const [selectedGender, setSelectedGender] = useState("Male")

	const genderOptions = [
		{
		  value: "Male",
		  label: "Male",
		  iconColor: "bg-[#EAF4FF]",
		  borderColor: "border-[#7FBCFF]",
		  icon: manLogo,
		},
		{
		  value: "Female",
		  label: "Female",
		  iconColor: "bg-[#FEECFF]",
		  borderColor: "border-[#FDC4FF]",
		  icon: womanLogo,
		},
		{
		  value: "Non Binary",
		  label: "Non Binary",
		  iconColor: "bg-[#FFF7E3]",
		  borderColor: "border-[#FFE9B6]",
		  icon: binaryLogo,
		},
		{
		  value: "Rather Not say",
		  label: "Rather Not say",
		  iconColor: "bg-[#FFE4E4]",
		  borderColor: "border-[#FFE7E5]",
		  icon: forbiddenLogo,
		},
	  ]

  return (
    <div className='container sign-up-cont min-h-screen bg-gray-100 flex flex-col pt-7 pb-16'>
      {/* Header Logo */}
	  <div className="w-full max-w-6xl flex justify-start pl-8">
		  <Link className="flex items-center" href="/">
			<div className="h-[30px] w-[66.2px]">
				<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
			</div>
		  </Link>
		</div>

	<div className="flex-1 flex items-center justify-center w-full mt-[10px] px-4 sm:px-[120px] 2xl:px-[220px]">
        <div className="bg-white bg-[url('/assets/img/bg2.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-lg p-6 sm:p-8 xl:px-[300px] md:pb-16 md:pt-12 w-full mx-auto text-center">
        {/* Header */}
        <div className="text-center mb-[52px]">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Whats Your Gender
          </h1>
          <p className="text-[#A0A0A0] text-sm font-[500]">
		  	Your gender helps us suggest events and Vibess that are right for you. It won't be shared with anyone.
          </p>
        </div>


       	{/* Gender Options */}
		   <div className="space-y-3 mb-16">
            {genderOptions.map((option) => {
              const icon = option.icon
              const isSelected = selectedGender === option.value

              return (
                <label
                  key={option.value}
                  className={`flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? `${option.borderColor} bg-gray-50`
                      : `border-gray-200 hover:${option.borderColor} hover:bg-gray-50`
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-8 h-8 rounded-[5px] flex items-center justify-center ${option.iconColor}`}>
					 	<div className="h-4 w-4">
							<Image src={icon} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
						</div>
                    </div>
                    <span className="ml-3 text-gray-900 font-medium">{option.label}</span>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              )
            })}
          </div>
          {/* Continue Button */}
          <button className="bg-gray-300 text-gray-600 py-2 px-[35px] rounded-lg text-base font-medium cursor-not-allowed">
            Continue
          </button>
      </div>
    </div>
    </div>
  )
}


export default Page;