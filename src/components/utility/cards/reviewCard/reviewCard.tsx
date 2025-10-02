"use client";

import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';

const ReviewCard = () => {

	const [isFavorited, setIsFavorited] = useState<boolean>(false);

	const handleFavoriteToggle = () => {
		setIsFavorited(prev => !prev);
	}

  return (
	<div className='border-b border-[#343434] px-4 py-3.5'>
	 	<div className='flex gap-3'>
			<div style={{backgroundImage: `url("https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg")`}} className="rounded-full h-[3.75rem] w-[3.75rem] bg-cover bg-center bg-no-repeat bg-black"></div>
			<div>
				<div className="flex items-center justify-between">
					<div className='flex items-center gap-3'>
						<div>
							<p className='font-[500] text-xl leading-none'>Sarah K</p>
						</div>

						<div className="flex items-center">
							{Array.from({length:4}, (_, i) => (
								<Icon key={i} icon="ic:round-star-rate" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
							))}
							<Icon icon="ic:round-star-half" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
						</div>
					</div>

					<div>
						<p>2 days ago</p>
					</div>
				</div>


				<p className='text-[#a0a0a0] text-base font-[500] leading-none mt-2.5'>
					Amazing vibes! The DJ was incredible and the crowd was so energetic. Can't wait for the next one
				</p>

				<div className="mt-5 flex items-center gap-3">
					<div onClick={handleFavoriteToggle} className='cursor-pointer'>
						{!isFavorited ? (
						<Icon 
							icon="solar:heart-angle-linear" 
							width="24" 
							height="24"
							className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors text-[#A0A0A0]`}
						/>
						):(
							<Icon 
								icon="solar:heart-angle-bold" 
								width="24" 
								height="24" 
								className={`w-4 h-4 sm:w-5 sm:h-5 fill-[#F800E9] text-[#F800E9]`}
							/>
						)}
					</div>
				
					<p className="font-[400] text-base text-[#A0A0A0]">24</p>
				</div>
			</div>
		</div>
	</div>
  )
}

export default ReviewCard
