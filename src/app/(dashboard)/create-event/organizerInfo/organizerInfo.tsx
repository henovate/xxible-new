import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import DashboardInputComp from '../../components/dasboardInputComp/dashboardInputComp';

interface OrganizerInfoProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const OrganizerInfo = ({setStep}:OrganizerInfoProps) => {

	const router = useRouter();

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<>
		<div>
			<div>
				<div>
					<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Contact & Support</p>
					<p className='text-base lg:text-xl leading-none font-[400] mt-3 text-[#A0A0A0]'>Help people Reach</p>
				</div>
				

				<div className='border border-[#343434] p-6 rounded-xl space-y-10 mt-8'>
					<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Contact & Support</p>

					<DashboardInputComp
						htmlFor='contactEmail' 
						label='Email'
						placeholder='eveny@nightlife.com'
						type='email'
						name='contactEmail'
						id='contactEmail'
						/>

					<DashboardInputComp
						htmlFor='contactIg' 
						label='WhatsApp Link'
						placeholder='eveny@nightlife.com'
						type='text'
						name='contactIg'
						id='contactIg'
						/>
					
					<div>
						<DashboardInputComp
							htmlFor='contactIg' 
							label='Event Instagram'
							placeholder='https://lemuel.net'
							type='text'
							name='contactIg'
							id='contactIg'
							/>
						<p className='mt-[0.65rem] text-base xl:text-xl font-[400] text-[#A0A0A0]'>Direct WhatsApp link for quick guest support</p>
					</div>
					
					
				</div>
			</div>
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous"/>
				<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(6)}/>
			</div>	
		</div>
	</>
  )
}

export default OrganizerInfo