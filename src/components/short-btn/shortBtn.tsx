"use client";

interface ShortBtnProps {
	classes: string;
	btnName: string;

}

const ShortBtn = ({btnName, classes=""}:ShortBtnProps) => {
  return (
	<>
		<button
			type="submit"
			className={`w-full text-[14px] mt-2 md:mt-0 py-2 px-4 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none ${classes}`}
		>
			{btnName}
		</button>
	</>
  )
}

export default ShortBtn;