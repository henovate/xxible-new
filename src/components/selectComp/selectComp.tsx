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
import { eventItemType } from "@/app/(dashboard)/(events)/selectData/selectData";
import { useRouter } from "next/navigation";


interface SelectCompProps{
	className: string;
	placeholder: string;
	selectArrayItems?: string[];  
	selectArrayOfObjectItems?: eventItemType[] ;
	label?: string;
	selectItemClassName?: string;
	arrayItemType: string;
}

const SelectComponent = ({className, placeholder, selectArrayItems, selectArrayOfObjectItems, label, selectItemClassName, arrayItemType}:SelectCompProps) => {
	const router = useRouter()
  return (
	<>
		<Select onValueChange={(val:string) => {
			if (val.startsWith("/") || val.startsWith("http")){
				router.push(val)
			}
		}}>
			<SelectTrigger className={`focus:ring-0 focus-visible:ring-offset-0 outline-none ${className}`}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-[#191A1A] px-4">
				<SelectGroup>
					<SelectLabel>{label}</SelectLabel>
					{arrayItemType == "object"? 
					(selectArrayOfObjectItems && selectArrayOfObjectItems.map((item) => (
							<SelectItem 
								value={item.link} 
								className={` focus-visible:outline-none focus:outline-none ${selectItemClassName}`}>
									{item.name}
							</SelectItem>
					))) : (
					selectArrayItems && selectArrayItems.map((item, index) => (
						<SelectItem 
							key={index} 
							value={item} 
							className={` focus-visible:outline-none focus:outline-none ${selectItemClassName}`}>
								{item}
						</SelectItem>
					)))
				}
				</SelectGroup>
			</SelectContent>
        </Select>
	</>
  )
}

export default SelectComponent