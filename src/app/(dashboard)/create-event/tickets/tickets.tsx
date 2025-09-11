import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';

interface TicketsProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Tickets = ({setStep}:TicketsProps) => {

	const router = useRouter();

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<>
		<div>
			Tickets
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous"/>
				<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(5)}/>
			</div>	
		</div>
	</>
  )
}

export default Tickets