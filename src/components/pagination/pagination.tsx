import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';

interface PaginationProps {
	totalPage: number;
	currentPage: number;
	onPageChange: (page:number) => void;
	delta: number;
}

const getPage = (currentPage:number, totalPage:number, delta:number=2):(number | string)[] => {
	if(totalPage <= 1) return [1];

	const pages:(number | string)[] = [];  
	const left = Math.max(2, currentPage - 1);
	const right = Math.min(totalPage - 1, currentPage + delta);

	pages.push(1);

	if (left > 2){
		pages.push("...");
	}

	for (let index = left; index <= right; index++) {
		pages.push(index);	
	}

	if (right < totalPage - 1){
		pages.push("...")
	}

	if (totalPage > 1) pages.push(totalPage);

	return pages;
}


const Pagination = ({totalPage, currentPage, onPageChange, delta=2}:PaginationProps) => {
	const pages = useMemo(() => {
		return getPage(currentPage, totalPage, delta)
	}, [currentPage, totalPage, delta]); 

	if (totalPage <= 1) return null;

	const navigateTo = (page:number) => {
		if((page < 1) || (page === currentPage) || (page > totalPage)) return;
		onPageChange(page);
	}

  return (
	<div aria-label="Pagination" className="flex items-center">

		<div className='flex items-center gap-3 bg-[#1D1D1D] p-4 rounded-full'>
			{/* Previous Btn */}
			<button 
				aria-label="Previous page"
				onClick={() => navigateTo(currentPage - 1)}
				disabled={currentPage === 1}
				className={`w-11 h-11 flex items-center justify-center rounded-full border border-[#BCBCBC] group 
				${currentPage === 1? "opacity-40 cursor-not-allowed" : "hover:bg-zinc-800"}
				bg-[#111111`}
				>
					
						<ChevronLeft size={14} className='text-[#BCBCBC] group-hover:text-[#F800E9]'/>
				
			</button>



			{/* Page numbers */}
			<div className="flex items-center gap-2">
				{pages.map((pageNumber:(number | string), idx:number) =>
				typeof pageNumber === "number" ? (
					<button
					key={idx}
					onClick={() => navigateTo(pageNumber)}
					aria-current={pageNumber === currentPage ? "page" : undefined}
					className={`w-8 h-8 flex items-center justify-center text-sm sm:text-base rounded 
						${pageNumber === currentPage
						? "text-[#F800E9] font-semibold"            
						: "text-[#f5f5f5] hover:text-[#E0A7FF]"}`
					}
					>
					{pageNumber}
					</button>
				) : (
					<span key={idx} className="px-2 text-[#f5f5f5] select-none">
					{pageNumber}
					</span>
				)
				)}
			</div>


			{/* Next Btn */}
			<button 
				aria-label="Next page"
				onClick={() => navigateTo(currentPage + 1)}
				disabled={currentPage === totalPage}
				className={`w-11 h-11 flex items-center justify-center rounded-full border border-[#BCBCBC] group
				${currentPage === totalPage? "opacity-40 cursor-not-allowed" : "hover:bg-zinc-800"}
				bg-[#111111`}
				>

						<ChevronRight size={14} className='text-[#BCBCBC] group-hover:text-[#F800E9]'/>
			</button>
		</div>
	</div>
  )
}

export default Pagination