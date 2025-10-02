"use client";

import React from 'react';

interface ImgCardProps {
	data: string;
}

const ImgCard = ({data}:ImgCardProps) => {
  return (
	<>
	  <div style={{backgroundImage: `url(${data})`}} className='h-full w-full bg-cover bg-center bg-no-repeat bg-black shadow-[0_0_20px_rgba(0,0,0,0.5)]'></div>
	</>
  )
}

export default ImgCard;
