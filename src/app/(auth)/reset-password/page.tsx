'use client'

import { useState } from 'react';
import { Mail} from 'lucide-react';
import Link from 'next/link';
import "../../../../public/styles/main.css"
import brandLogo from "../../../../public/assets/icons/logo2.png";
import Image from 'next/image';
import ShortBtn from '@/components/short-btn/ShortBtn';
import FormInput from '../component/input-comp/formInput';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    ageConfirmed: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
			<div className="w-full h-full max-w-[500px] bg-white rounded-2xl shadow-xl p-8 lg:py-[70.23px] lg:px-[49px]">
				{/* Header */}
				<div className="text-center mb-[52px]">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Forgot Password
				</h1>
				<p className="text-[#A0A0A0] text-sm font-[500]">
					No worries, we'll send your reset instruction 
				</p>
				</div>


				{/* Form */}
				<form onSubmit={handleSubmit}>
					<div className="space-y-[24px]">
						<FormInput icon={Mail} type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Enter your email address' />
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-5 mt-[32px]'>
						{/* Cancel Button */}
						<ShortBtn btnName='Cancel' classes='border-2 border-[#898989] text-[#696B6F] hover:bg-[#a069d6] hover:border-none hover:text-[#FFFFFF]' />

						{/* Submit Button */}
						<ShortBtn btnName='Send' classes='bg-[#4E009C] text-white hover:bg-[#b48fd9]' />
					</div>
				</form>
			</div>
		</div>
    </div>
  )
}


export default Page;