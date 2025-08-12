"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InputSelectProp{
	data: string[];
	placeholder: string;
}

const InputSelect = ({data, placeholder}:InputSelectProp ) => {
  return (
	<div>
		 <Select>
                <SelectTrigger className="w-full sm:w-[100px] border-gray-300 text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  position="popper"
                  align="center"
                  sideOffset={5}
                  className="bg-white max-h-56 z-50 text-[#212121] font-[500]"
                >
                  <SelectGroup>
                    {data.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="data-[highlighted]:bg-pink-100 data-[highlighted]:text-[#F800E9] focus-visible:outline-none focus:outline-none"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
            </Select>
	</div>
  )
}

export default InputSelect