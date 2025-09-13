import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import LocationDetails from '../components/eventCallToAction/locationDetails/locationDetails';
import DashboardInputComp from '../../components/dasboardInput Comp/dashboardInputComp';

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
	<>
		<div>
			<div>
				<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Location</p>
				<form className='mt-7 xl:mt-10 space-y-10'>
					<DashboardInputComp htmlFor='venueName' type='text' id='venueName' name='venueName' label='Venue Name' placeholder='eg. Skyfall hotel, Club Nion, Private Villa'/>
					<DashboardInputComp htmlFor='venueAddress' type='text' id='venueAddress' name='venueAddress' label='Address' placeholder='Enter full address or land mark'/>
				</form>
			</div>
			<div className='mt-12'>
				<LocationDetails />
			</div>
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous"/>
				<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(4)}/>
			</div>	
		</div>
	</>
  )
}

export default Location