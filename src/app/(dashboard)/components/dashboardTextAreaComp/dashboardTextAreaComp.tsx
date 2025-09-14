import React from 'react';

interface DashboardTextAreaCompProps {
	eventHandler?: (event:React.ChangeEvent<HTMLTextAreaElement>) => void;
	label: string;
	value?: any;
	placeholder?: string;
	name?: string;
	id?: string;
	htmlFor?: string;
}

const DashboardTextAreaComp = ({eventHandler, value, label, placeholder, name, id, htmlFor}:DashboardTextAreaCompProps) => {
  return (
	<>
	  	<div>
			<label htmlFor={htmlFor} className="text-base xl:text-xl font-500 text-[#f5f5f5]">{label}</label>
			<div className="mt-3 xl:mt-5">
				<textarea 
					onChange={eventHandler} 
					name={name} 
					id={id} 
					value={value} 
					className="px-3 xl:px-6 py-4 xl:pt-6 placeholder:text-base xl:placeholder:text-xl placeholder:text-[#A0A0A0] text-[#f5f5f5] text-base xl:text-xl bg-[#232323] border border-[#434343] h-60 w-full rounded-[0.75rem] focus:outline-[#F800E9] focus:outline-none" placeholder={placeholder} />
			</div>
		</div>
	</>
  )
}

export default DashboardTextAreaComp
