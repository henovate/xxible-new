import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';

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
			OrganizerInfo
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous"/>
				<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(6)}/>
			</div>	
		</div>
	</>
  )
}

export default OrganizerInfo