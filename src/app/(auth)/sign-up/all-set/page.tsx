'use client'

import Link from 'next/link';
import "../../../../../public/styles/main.css";
import brandLogo from "../../../../../public/assets/icons/logo2.png";
import checkLogo from "../../../../../public/assets/icons/Checkmark.png";
import Image from 'next/image';


const Page = () => {

  return (

		<div className="sign-up-cont min-h-screen bg-gray-100 flex flex-col pt-7 pb-16">
			<div className="w-full max-w-6xl flex justify-start pl-8">
				<Link className="flex items-center" href="/">
					<div className="h-[30px] w-[66.2px]">
						<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
					</div>
				</Link>
			</div>

			<div className='flex-1 flex items-center justify-center w-full px-4 sm:px-0'>
				<div className="w-full max-w-[593px] bg-[url('/assets/img/bg3.png')] bg-cover bg-center bg-no-repeat bg-white rounded-2xl shadow-xl p-8 lg:py-[70.23px] lg:px-[59px]">
					{/* Header */}
					<div className="text-center mb-[52px]">
						<h1 className="text-2xl font-semibold text-gray-900 mb-2">
							You are all set!
						</h1>
						<div className='flex justify-center'>
							<p className="text-[#A0A0A0] text-sm font-[500] lg:w-[75%]">
								You’re locked in. Now bring the energy and let the good times roll.
							</p>
						</div>			
					</div>


					{/* Form */}
					<div>
						<div className='flex justify-center items-center'>
							<div className="h-[200px] w-[200px]">
								<Image src={checkLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
							</div>
						</div>
						
						<div className='flex justify-center w-full'>
							<Link href="/">
								<button className="w-full max-w-xs py-3 px-20 rounded-lg text-base font-medium transition-colors duration-200 bg-purple-700 text-white hover:bg-purple-800">Continue</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>

  )
}


export default Page;