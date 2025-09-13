import React from 'react';
import EventCallToAction from '../eventCallToAction';
import { Icon } from '@iconify/react/dist/iconify.js';

const LocationDetails = () => {
  return (
	<>
		<EventCallToAction heading='Private Location' description='Share exact address only with ticket holders'>
			<div className='flex items-center gap-[0.6rem] mt-6 p-6 border border-[#701379] bg-gradient-to-r from-[#4C254F] to-[#AE54B5] rounded-xl'>
				<Icon icon="solar:moon-linear" width="24" height="24" className='w-6 h-6 text-[#f5f5f5]' />
				<span className='text-xl font-[400] text-[#f5f5f5]'>Perfect for those late-night vibes! Your event will be marked as an overnight experience.</span>
			</div>
		</EventCallToAction>
	</>
  )
}

export default LocationDetails