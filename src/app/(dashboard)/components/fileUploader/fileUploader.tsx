"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

interface FileUploaderProps {
	eventHandler: any;
}

const FileUploader = ({eventHandler}:FileUploaderProps) => {
  return (
	<>
		<div className="relative h-36 w-[14.2rem] border-2 border-dashed border-[#434343] rounded-xl">
			<div className="absolute top-0 left-0 z-20 h-full w-full flex flex-col justify-center items-center">
				<Icon icon="meteor-icons:image" width="24" height="24" className="h-9 w-9" />
				<p className="mt-4 text-[0.95rem] text-[#f5f5f5] font-[500] leading-none">Add photo</p>									
			</div>
			
			<div className={`z-10 relative w-full h-full`}>
				<div className="absolute top-0 left-0 h-full w-full rounded-xl" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}></div>
			</div>
			<input 
				onChange={eventHandler}
				type="file" 
				multiple className="absolute top-0 left-0 w-full h-full opacity-0 z-30 cursor-pointer" />
		</div>
	</>
  )
}

export default FileUploader