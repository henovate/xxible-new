"use client";

import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
import { SocialDataType } from '../attendantCard/data';

interface SocialMediaCardProps {
	data: SocialDataType;
}

const SocialMediaCard = ({data}:SocialMediaCardProps) => {
  return (
	<div className='rounded-xl bg-[#232323] flex pl-6 py-5 gap-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]'> 
	  <Icon icon={data.icon} width="256" height="193" className={`h-6 w-6 ${data.color}`} />
	  <div>
		<p className='text-base font-[500] leading-none text-[#f5f5f5]'>{data.name}</p>
		<p className='text-sm font-[400] text-[#A0A0A0] leading-none mt-1'>{data.description}</p>
	  </div>
	</div>
  )
}

export default SocialMediaCard
