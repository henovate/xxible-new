import React from 'react';

interface DashboardInputCompProps {
	eventHandler?: (event:React.ChangeEvent<HTMLInputElement>) => void;
	type: string;
	label: string;
	value?: any;
	placeholder?: string;
	name?: string;
	id?: string;
	htmlFor?: string;
}

const DashboardInputComp = ({eventHandler, label, value, placeholder, type, name, id, htmlFor}:DashboardInputCompProps) => {
  return (
	<>
	  	<div>
			<label htmlFor={htmlFor} className="text-base xl:text-xl font-500 text-[#f5f5f5]">{label}</label>
			<div className="mt-3 xl:mt-5">
				<input 
					onChange={eventHandler} 
					type={type} 
					name={name} 
					id={id} 
					value={value} 
					className="px-3 xl:px-6 py-4 xl:py-7 placeholder:text-base xl:placeholder:text-xl placeholder:text-[#A0A0A0] text-[#f5f5f5] text-base xl:text-xl bg-[#232323] border border-[#434343] w-full rounded-[0.75rem] focus:outline-[#F800E9] focus:outline-none" placeholder={placeholder} />
			</div>
		</div>
	</>
  )
}

export default DashboardInputComp
