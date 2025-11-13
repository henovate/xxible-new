import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CategoryFilterProps {
	listItems: string[];
}

const CategoryFilter = ({listItems}:CategoryFilterProps) => {
  return (
	<>
	  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full snap-x snap-mandatory">
			{listItems && listItems.map((category, index) => (
				<Badge key={index} 
						variant={"default"} 
						className="bg-[#393939] text-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#231F20] py-2 px-2 text-sm lg:text-xs 2xl:text-sm font-[500] cursor-pointer whitespace-nowrap rounded-lg lg:rounded-md 2xl:rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)]">
						{category}
				</Badge>
			))}
		</div>
	</>
  )
}

export default CategoryFilter
