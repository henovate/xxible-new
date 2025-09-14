import React, { useContext } from 'react';
import EventCallToAction from '../../components/eventCallToAction/eventCallToAction';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ListContext } from '@/app/(dashboard)/create-event/eventContext/eventContext';

const LocationDetails = () => {
	const ctx = useContext(ListContext);
	if (!ctx) throw new Error("EventCallToAction must be used inside <EventContext>");

	const { callToActionSwitch, setCallToActionSwitch } = ctx;
	console.log("switch:", callToActionSwitch);
  return (
	<>
		<EventCallToAction heading='Private Location' description='Share exact address only with ticket holders' setSwitch={setCallToActionSwitch} switchState={callToActionSwitch}>
			<div className={`items-center gap-[0.6rem] transition-all mt-6 p-3 sm:p-4 lg:p-6 border border-[#701379] bg-gradient-to-r from-[#4C254F] to-[#AE54B5] rounded-xl ${callToActionSwitch? "flex" : "hidden"}`}>
				<Icon icon="solar:moon-linear" width="24" height="24" className='w-10 h-10 sm:w-6 sm:h-6 text-[#f5f5f5]' />
				<span className='text-xs leading-3 sm:text-sm sm:leading-[0.9rem] xl:text-xl xl:leading-none font-[400] text-[#f5f5f5]'>Perfect for those late-night vibes! Your event will be marked as an overnight experience.</span>
			</div>
		</EventCallToAction>
	</>
  )
}

export default LocationDetails