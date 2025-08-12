'use client'

import { useState } from 'react';
import "../../../../../public/styles/main.css"
import brandLogo from "../../../../../public/assets/icons/logo2.png";
import Image from 'next/image';
import ShortBtn from '@/components/short-btn/shortBtn';
import PasswordComp from '../../component/password-comp/passwordComp';
import Link from 'next/link';

const Page = () => {
  const [formData, setFormData] = useState({
    password: '',
	confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className='sign-up-cont min-h-screen bg-[url("/assets/img/bg5.png")] bg-cover bg-center bg-no-repeat bg-gray-100 flex flex-col pt-7 pb-16'>
      	<div className="w-full max-w-6xl flex justify-start pl-8">
			<Link className="flex items-center" href="/">
				<div className="h-[30px] w-[66.2px]">
					<Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
				</div>
			</Link>
		</div>
		<div className="flex-1 flex items-center justify-center w-full h-full p-4 sm:px-0">
			<div className="w-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 lg:py-[70.23px] lg:px-[59px]">
				{/* Header */}
				<div className="text-center mb-[52px]">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Reset Your Password
				</h1>
				</div>


				{/* Form */}
				<form onSubmit={handleSubmit}>
					<div className="space-y-[20px]">
						<PasswordComp placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} />
						<PasswordComp placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
					

						<div className='grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-5'>
							{/* Cancel Button */}
							<ShortBtn btnName='Cancel' classes='border-2 border-[#898989] text-[#696B6F] hover:bg-[#a069d6] hover:border-none hover:text-[#FFFFFF]' />

							{/* Submit Button */}
							<ShortBtn btnName='Send' classes='bg-[#4E009C] text-white hover:bg-[#b48fd9]' />
						</div>
					</div>
				</form>
			</div>
		</div>
    </div>
  )
}


export default Page;