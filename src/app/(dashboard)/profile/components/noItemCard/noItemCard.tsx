import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

const NoItemCard = () => {
  return (
	<div className='border border-[#E9E9E9] bg-[url("/assets/img/bg8.png")] bg-center bg-no-repeat bg-cover pb-9 px-8 lg:px-28 w-fit min-w-0 rounded-3xl mt-5'>
		<div className='mt-16 flex flex-col items-center justify-center text-center'>
			<p className='font-[600] text-2xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#FF00EA]'>Nothing Here Yet</p>
			<p className='font-[400] text-xs md:text-sm leading-none mt-3 text-[#A0A0A0] flex items-center gap-1 whitespace-nowrap'>Tap the <Icon icon="bxs:heart" width="24" height="24" className='w-3 h-3 text-[#FF00EA]' /> button on events to keep track of them here.</p>
		</div>

		<div className="flex justify-center items-center mt-8">
			<Icon icon="si:heart-fill" width="24" height="24" className='text-transparent text-[#da60cf] h-32 w-32 sm:h-48 sm:w-48' />
		</div>

		<div className="flex justify-center mt-12">
			<button className="py-2 px-6 text-sm font-[500] text-[#231F20] hover:text-[#6f326b] bg-[#f5f5f5] transition rounded-full w-fit h-fit whitespace-nowrap">Browse Events</button>
		</div>
	</div>
  )
}

export default NoItemCard;