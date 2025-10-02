"use client";

import React from 'react';
import { UserProfile } from './data';

interface AttendantCardProps {
	profile: UserProfile;
}

const AttendantCard = ({profile}:AttendantCardProps) => {
  return (
	<>
	  <div className='bg-[#232323] border border-[#343434] rounded-lg py-10 flex flex-col items-center justify-center'>
		<div style={{backgroundImage: `url(${profile.image})`}} className='rounded-full h-[5.5rem] w-[5.5rem] bg-black bg-cover bg-no-repeat bg-center'></div>
		<p className='text-base font-[600] text-[#f5f5f5] mt-3'>{profile.username}</p>
	  </div>
	</>
  )
}

export default AttendantCard;
