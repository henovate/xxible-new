import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import PublishItem from './components/publishItem/publishItem';

interface PublishProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const eventDetails = [
	{ label: "Event Name", value: "Unleasing XXbile Nightlife" },
	{ label: "Category", value: "House Party" },
	{ label: "Date & Time", value: "Sunday, Jun 13, 2025, 6PM" },
	{ label: "Venue", value: "Quilox - Explore nightlife in Lagos" },
	{ label: "Ticket Tiers", value: "2 Tiers" }
  ];

const Publish = ({setStep}:PublishProps) => {

	const router = useRouter();

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<>
		<div>
			<div>
				<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Ready to Launch?</p>
				<p className='text-base lg:text-xl leading-none font-[400] mt-3 text-[#A0A0A0]'>Configure your event's visibility and publishing settings</p>
			</div>

			<div className='bg-[#232323] border border-[#343434] px-8 pt-4 pb-8 rounded-xl mt-8 font-[500] text-2xl'>
				{eventDetails.map((item, i) => (
					<PublishItem key={i} eventItem={item.label} eventName={item.value} />
				))}
			</div>

			<div className={`mt-8 border border-[#343434] p-3 xl:p-6 bg-gradient-to-r from-[#5500cd38] to-[#f800e81e] rounded-[0.75rem]`}>
				<div className='text-[#f5f5f5] flex justify-center items-center'>
					<div>
						<p className='font-[500] text-base xl:text-[1.5rem] leading-none text-center'>Ready to go live?</p>
						<p className='font-[400] text-xs leading-3 sm:text-sm sm:leading-[0.9rem] lg:text-base lg:leading-none mt-2 xl:mt-3 text-center'>Your event is configured and ready to be published. Once published, guests can discover and purchase tickets.</p>

						<div className='mt-6 text-base font-[500] leading-none text-[#f5f5f5] flex items-center justify-center gap-8'>
							<div className='border border-[#F800E9] py-3 px-16 rounded-xl'>
								<p>Save as Draft</p>
							</div>

							<div className='bg-[#F800E9] py-3 px-16 rounded-xl'>
								<p>Publish Event Now</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		

			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous"/>
				<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(1)}/>
			</div>	
		</div>
	</>
  )
}

export default Publish