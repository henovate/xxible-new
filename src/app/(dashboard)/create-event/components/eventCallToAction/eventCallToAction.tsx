import React from 'react';

interface EventCallToActionProps {
	children?: React.ReactNode;
	heading: string;
	description: string;
}

const EventCallToAction = ({children, heading, description}:EventCallToActionProps) => {

	const handleToggleSwitch = () => {

	}
	
  return (
	<div className='border border-[#343434] p-3 xl:p-6 bg-gradient-to-r from-[#5500cd38] to-[#f800e81e] rounded-[0.75rem]'>
		<div className='text-[#f5f5f5] flex justify-between items-center'>
			<div className='w-[80%] md:w-full'>
				<p className='font-[500] text-base xl:text-[1.5rem] leading-none'>{heading}</p>
				<p className='font-[400] text-xs leading-3 sm:text-sm xl:text-xl sm:leading-[0.9rem] xl:leading-none mt-2 xl:mt-3'>{description}</p>
			</div>

			<div onClick={handleToggleSwitch}>
				<label className="switch">
					<input type="checkbox" />
					<span className="slider">
						<svg className="slider-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
					</span>
				</label>
			</div>
		</div>

		<div>
			{children}
		</div>
	</div>
  )
}

export default EventCallToAction
