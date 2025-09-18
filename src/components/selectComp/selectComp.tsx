import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select";


interface SelectCompProps{
	className: string;
	placeholder: string;
	selectItems: string[];
	label: string;
	selectItemClassName?: string;
}

const SelectComponent = ({className, placeholder, selectItems, label, selectItemClassName}:SelectCompProps) => {
  return (
	<>
		<Select>
			<SelectTrigger className={`focus:ring-0 focus-visible:ring-offset-0 outline-none ${className}`}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-[#191A1A] px-4">
				<SelectGroup>
					<SelectLabel>{label}</SelectLabel>
					{selectItems.map((item) => (
						<SelectItem 
							value={item} 
							className={` focus-visible:outline-none focus:outline-none ${selectItemClassName}`}>
								{item}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
        </Select>
	</>
  )
}

export default SelectComponent