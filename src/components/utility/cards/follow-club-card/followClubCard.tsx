"use client";

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import { clubDataType } from '@/app/(dashboard)/home/data/clubData';

interface FollowCardProp {
	clubData: clubDataType;
}

const FollowClubCard = ({ clubData }:FollowCardProp) => {

	const formatPrice = (price: number, currency: string) => {
		return `${currency}${price?.toLocaleString()}`
	  }

  return (
	<>
		<div className="border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl p-2 mb-4">
			<div className="flex justify-between">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">				
						<Image
						src={clubData.image}
						alt={`${clubData.name} logo`}
						width={32}
						height={32}
						className="rounded-full h-full w-full object-cover object-center"
						/>				
					</div>
					<div>
						<p className="text-base leading-4 font-[600] text-[#898989]">{clubData.name.substring(0, 9)}...</p>
						<p className="text-sm font-[400] leading-3 text-[#f5f5f5] mt-[0.4rem]">{clubData.followers} Followers</p>
					</div>
				</div>
				<div className="flex items-center gap-1 bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-full px-1.5 py-1 w-fit h-fit">
					<Icon icon="solar:verified-check-bold" width="24" height="24" className="w-2 h-2 text-[#007AFF]" />
                    <span className="text-[0.5rem] font-medium text-[#999c9f]">Verified Club</span>
                </div>
			</div>

			<div className='flex justify-center items-center bg-[#f5f5f5] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-sm text-[#231F20] font-[600] mt-5 py-0.5'>
				<p>Follow Brand</p>
			</div>
		</div>	
	</>
  )
}

export default FollowClubCard