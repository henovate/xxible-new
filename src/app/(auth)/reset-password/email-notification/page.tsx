'use client'

import Link from 'next/link';
import "../../../../../public/styles/main.css";
import brandLogo from "../../../../../public/assets/icons/logo2.png";
import emailLogo from "../../../../../public/assets/icons/el.png";
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
				<div className="w-full max-w-[593px] bg-white rounded-2xl shadow-xl p-8 lg:py-[70.23px] lg:px-[59px]">
					{/* Header */}
					<div className="text-center mb-[52px]">
					<h1 className="text-2xl font-semibold text-gray-900 mb-2">
						Check Your Email
					</h1>
					<p className="text-[#A0A0A0] text-sm font-[500] lg:w-[80%">
						We have sent a password recover instruction to <span className='text-[#007AFF]'>preston_parsons@yahoo.com</span>
					</p>
					</div>


					{/* Form */}
					<div>
						<div className='flex justify-center items-center'>
							<div className="h-[200px] w-[200px]">
								<Image src={emailLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
							</div>
						</div>
						

						<Link href="/">
							<div className='border-2 border-[#696B6F] text-[#696B6F] rounded-[12px] flex items-center justify-center mt-[32px] py-[10px]'>
								<svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
									<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
									<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
									<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
									<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
								</svg>
								<p className='ml-1 text-[16px]'>Open Gmail</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
  )
}


export default Page;