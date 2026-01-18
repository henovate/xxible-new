'use client'

import { useState } from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "../../../../public/styles/main.css"
import brandLogo from "../../../../public/assets/icons/logo2.png";
import apple from "../../../../public/assets/icons/apple.png";
import Image from 'next/image';
import FormInput from '../component/input-comp/formInput';
import PasswordComp from '../component/password-comp/passwordComp';
import { useAppData } from '@/context/AppDataContext';

const Page = () => {
  const router = useRouter();
  const { login } = useAppData();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepSignedIn: false,
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
    const result = login({ email: formData.email, password: formData.password });
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    router.push('/home');
  }

  return (
    <div className='container sign-up-cont min-h-screen bg-[url("/assets/img/bg6.svg")] bg-cover bg-center bg-no-repeat bg-gray-100 flex flex-col pt-7 pb-16'>
      <div className="w-full max-w-6xl flex justify-start pl-8">
        <Link className="flex items-center" href="/">
          <div className="h-[30px] w-[66.2px]">
            <Image src={brandLogo} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
          </div>
        </Link>
		  </div>
    <div className="flex-1 flex items-center justify-center w-full h-full p-4 sm:px-0">
      <div className="w-full max-w-[600px] 2xl:max-w-[650px] bg-white rounded-2xl shadow-xl p-8 lg:py-[60.23px] lg:px-[45px]">
        {/* Header */}

          <div className="text-center mb-[32px] 2xl:mb-[52px]">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <div className='flex justify-center items-center w-full'>
              <p className="text-[#A0A0A0] text-[13px] 2xl:text-[14px] font-[500] w-[70%] sm:w-full">
                Reconnect with the city’s energy. Sign in and let’s go.
              </p>
          </div>
        </div>


        {/* Form */}
        <div className='sm:px-4'>
          <form onSubmit={handleSubmit}>
            <div className="space-y-[15px]">
              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600">
                  {error}
                </div>
              ) : null}
              {/* Enter Email */}
                <FormInput icon={Mail} type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Enter your email address' required/>

              {/* Password Input */}
              <PasswordComp placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} />

              {/* Remain Signed in */}
              <div className='flex justify-between'>
                <FormInput type='checkbox' name='keepSignedIn' checked={formData.keepSignedIn} onChange={handleInputChange} label='Keep me Signed in' />

                <Link href="/auth/reset-password">
                  <p className='text-[#007AFF] text-[14px] items-center'>Forgot Password</p>
                </Link>
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-[13px] 2xl:text-[15px] bg-gray-900 text-white mt-[28px] py-2 2xl:py-3.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none"
            >
              Log in
            </button>
          </form>


      {/* OR Divider */}
          <div className="relative mb-5 mt-[25px]">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>
        </div>

		{/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="flex items-center justify-center px-[9.8px] py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[10px] 2xl:text-[11px] font-medium text-gray-700 hidden sm:inline">Continue with Google</span>
              <span className="text-[10px] 2xl:text-[11px] font-medium text-gray-700 sm:hidden">Google</span>
            </button>

            <button className="flex items-center justify-center px-[9.8px] py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-4 h-4 mr-1">
                <Image src={apple} alt="brand Logo" className="brand-logo w-full h-full bg-cover"/>
              </div>
              <span className="text-[10px] 2xl:text-[11px] font-medium text-gray-700 hidden sm:inline">Continue with Apple</span>
              <span className="text-[10px] 2xl:text-[11px] font-medium text-gray-700 sm:hidden">Apple</span>
            </button>

            <button className="flex items-center justify-center px-[9.8px] py-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-[10px] 2xl:text-[11px] font-medium text-gray-700 hidden sm:inline">Continue with Google</span>
              <span className="text-[10px] 2xl:text-[11px] font-medium text-gray-700 sm:hidden">Facebook</span>
            </button>
          </div>
        </div>


		<div className="mt-[52px] text-center">
          <p className="text-[12px] 2xl:text-[13px] text-gray-600">
            Dont have an account?{' '}
            <Link href="/sign-up" className="text-[#231F20] hover:text-[#595757] font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}


export default Page;
