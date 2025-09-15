import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface NextPreviousBtnProps {
	btnName: string;
	handleStepDirection?: any;
}
	
const NextPreviousBtn = ({btnName, handleStepDirection}:NextPreviousBtnProps) => {

	return (
	<>
		<div onClick={handleStepDirection} className={`flex justify-between gap-5 rounded-[0.38rem] w-fit cursor-pointer hover:scale-105 transition 
						${btnName == "Previous"? "py-2 pl-2 pr-3 bg-[#29212B] border border-[#434343] text-[#898989]"
						:"py-2 pr-2 pl-3 bg-[#f5f5f5] border border-[#434343] text-[#212121]"}`}>
			<Icon icon="solar:alt-arrow-left-linear" width="24" height="24" className={`text-[#898989] ${btnName == "Previous"? "block" : "hidden"}`}/>
			<p className="font-[500] text-base">{btnName}</p>
			<Icon icon="iconamoon:arrow-right-2-light" width="24" height="24" className={`text-[#212121] ${btnName !== "Previous"? "block" : "hidden"}`} />
		</div>
	</>
	)
}

export default NextPreviousBtn
	