"use client";

import { LucideIcon } from "lucide-react";

interface FormInputProps{
	icon?: LucideIcon
	type: string;
	placeholder?: string;
	value?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	classes?: string;
	name: string;
	required?: boolean
	checked?: boolean
	label?: string
}

const FormInput = ({ icon:Icon, type, value, name, onChange, checked, label, required=false, classes = "", placeholder="" }: FormInputProps) => {
	  return (
	<>
		{type === "checkbox"? (
			<div className="flex items-center">
				<input
					type={type}
					name={name}
					checked={checked}
					onChange={onChange}
					className={`h-4 w-4 accent-[#F800E9] focus:ring-[#F800E9] border-gray-300 rounded ${classes}`}
					required={required}
				/>
				<label htmlFor={name} className="ml-2 text-[13px] text-gray-700">
					{label}
				</label>
			</div>

		) : (
		<div className='relative'>
			<div className={`${classes} absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
				{Icon && <Icon className="h-[17.45px] w-[17.45px] text-gray-400" />}
			</div>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
				required={required}
				className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder:text-[14px] text-[13px] text-[#898989]"
			/>
		</div>
		)}
	</>
  );
}

export default FormInput;