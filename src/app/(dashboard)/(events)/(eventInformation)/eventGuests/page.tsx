"use client";

import AttendantCard from '@/components/utility/cards/attendantCard/attendantCard'
import { users } from '@/components/utility/cards/attendantCard/data'
import React from 'react'
import EventInformation from '../eventInformationLayout'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useRouter } from 'next/navigation';

const Page = () => {
	const router =  useRouter();
	const handleGoBack = () => router.back()
  return (
	<EventInformation>
		<div className='border border-[rgb(52,52,52)] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl p-8'>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7'>
				{users.map((user, i) => (
					<AttendantCard key={i} profile={user} />
				))}
			</div>

			<div onClick={handleGoBack} className='flex items-center gap-2 mt-10 group w-fit cursor-pointer'>
				<div className='rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] w-fit p-4 group-hover:scale-110 transition'>
					<Icon icon="akar-icons:arrow-back" width="24" height="24" className='h-5 w-5 text-[#F800E9] group-hover:text-[#00baf8] transition' />
				</div>
				<p className='text-base leading-none text-[#f5f5f5] group-hover:text-[#a29f9f]'>Back</p>
			</div>
		</div>
	</EventInformation>
  )
}

export default Page;