import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import EventCallToAction from '../components/eventCallToAction/eventCallToAction';
import { EventContextProvider } from '@/app/(dashboard)/create-event/eventContext/eventContext';
import DashboardInputComp from '../../components/dasboardInputComp/dashboardInputComp';
import DashboardTextAreaComp from '../../components/dashboardTextAreaComp/dashboardTextAreaComp';
import { Badge } from '@/components/ui/badge';
import { perksAndBenefits, ticketBadges } from './ticketData/ticketData';
import { Icon } from '@iconify/react/dist/iconify.js';
import TicketCallToAction from './ticketCallToAction/ticketCallToAction';
import TicketTier from './ticketTier/ticketTier';
import { se } from 'date-fns/locale';


interface TicketsProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Tickets = ({setStep}:TicketsProps) => {

	const router = useRouter();
	const [moreTier, setMoreTier] = useState<string[]>([""]);

	const addTier = () => {
		setMoreTier(prev => [...prev, ""])
	}

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<EventContextProvider>
		<div>
			<div>
				<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Ticket Tiers</p>

				<div className='space-y-8'>
					<p className='text-base lg:text-xl leading-none font-[400] mt-3 text-[#A0A0A0]'>Create different ticket options for your event</p>

					<div className=''>
						<EventCallToAction heading='Free Option' description='Free access to event' bgColor='bg-gradient-to-r from-[#00d62715] to-[#f0f80015]' />
					</div>

					{moreTier.map((_, index) => (
						<TicketTier key={index} tierNo={Number(index + 1)} setTierContainer={setMoreTier}/>
					))}
					
 
					<div className='mt-12'>
						<TicketCallToAction />
					</div>

					<div onClick={addTier} className='mt-12 rounded-xl bg-[#f5f5f5] text-base sm:text-[1.15rem] xl:text-xl text-[#231F20] font-[600] flex items-center justify-center py-3 sm:py-4 lg:py-[1.15rem] gap-3 cursor-pointer'>
						<Icon icon="fluent:add-32-filled" width="24" height="24" className={`h-6 w-6`}/>
						<p>Add another Ticket Tier</p>
					</div>
				</div>
			</div>
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous" handleStepDirection={()=>router.push("create-event?page=3")} />
				<NextPreviousBtn btnName="Next"  handleStepDirection={() => handleNextStep(5)}/>
			</div>	
		</div>
	</EventContextProvider>
  )
}

export default Tickets