import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import LocationDetails from './locationCallToAction/locationCallToAction';
import DashboardInputComp from '../../components/dasboardInputComp/dashboardInputComp';
import { EventContextProvider } from '@/app/(dashboard)/create-event/eventContext/eventContext';


interface LocationProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Location = ({setStep}:LocationProps) => {

	const router = useRouter();

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<EventContextProvider>
		<div>
			<div>
				<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Location</p>
				<form className='mt-7 xl:mt-10 space-y-7 lg:space-y-10'>
					<DashboardInputComp htmlFor='venueName' type='text' id='venueName' name='venueName' label='Venue Name' placeholder='eg. Skyfall hotel, Club Nion, Private Villa'/>
					<DashboardInputComp htmlFor='venueAddress' type='text' id='venueAddress' name='venueAddress' label='Address' placeholder='Enter full address or land mark'/>
				</form>
			</div>
			<div className='mt-12'>
				<LocationDetails />
			</div>
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous" handleStepDirection={()=>router.push("create-event?page=2")}/>
				<NextPreviousBtn btnName="Next"  handleStepDirection={() => handleNextStep(4)}/>
			</div>	
		</div>
	</EventContextProvider>
  )
}

export default Location