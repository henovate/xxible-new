import { useRouter } from 'next/navigation';
import React from 'react';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import EventCallToAction from '../components/eventCallToAction/eventCallToAction';
import { EventContextProvider } from '@/app/(dashboard)/create-event/eventContext/eventContext';
import DashboardInputComp from '../../components/dasboardInputComp/dashboardInputComp';
import DashboardTextAreaComp from '../../components/dashboardTextAreaComp/dashboardTextAreaComp';
import { Badge } from '@/components/ui/badge';
import { perksAndBenefits, ticketBadges } from './ticketData/ticketData';
import { Icon } from '@iconify/react/dist/iconify.js';
import TicketCallToAction from './ticketCallToAction/ticketCallToAction';

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
	<EventContextProvider>
		<div>
			<div>
				<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Ticket Tiers</p>

				<div className='space-y-8'>
					<p className='text-base lg:text-xl leading-none font-[400] mt-3 text-[#A0A0A0]'>Create different ticket options for your event</p>

					<div className=''>
						<EventCallToAction heading='Free Option' description='Free access to event' bgColor='bg-gradient-to-r from-[#00d62715] to-[#f0f80015]' />
					</div>

					<div className='border border-[#343434] p-6 rounded-xl'>
						<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Tiers 1</p>

						<div className='mt-7 xl:mt-10 space-y-7 lg:space-y-8'>
							<form className='space-y-7 lg:space-y-8'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
									<DashboardInputComp htmlFor='ticketName' type='text' id='ticketName' name='ticketName' label='Ticket Name' placeholder='eg.General admission, VIP, All Access...' />
									<DashboardInputComp htmlFor='ticketPrice' type='number' id='ticketPrice' name='ticketPrice' label='Price (₦)' placeholder='₦ 0.00'/>
								</div>

								<DashboardTextAreaComp
									htmlFor="eventDescription" 
									label="Event Description" 
									// eventHandler={handleEventBasicInput} 
									name="eventDescription" 
									id="eventDescription" 
									// value={eventBasicsInput.eventDescription} 
									placeholder="Write a short description of the ticket"
									/>
							</form>


							<div>
								<p className="text-base xl:text-xl font-500 text-[#f5f5f5]">Ticket Badge</p>

								<div className='flex items-center gap-6 mt-6'>
									{ticketBadges.map((item, index) => (
										<Badge key={index} variant={'default'} className='rounded-3xl gap-2 px-2.5 py-1.5 text-sm bg-[#555555] text-[#f5f5f5] hover:text-stone-900 font-[500]'>
											<Icon icon={item.badgeIcon} width={20} height={20} className='h-4 w-4'/>
											{item.badgeName}
										</Badge>
									))}
								</div>
							</div>


							<div>
								<p className="text-base xl:text-xl font-500 text-[#f5f5f5]">Perks and Benefits</p>

								<div className='flex items-center flex-wrap gap-6 mt-6'>
									{perksAndBenefits.map((item, index) => (
										<Badge key={index} variant={'outline'} className='rounded-3xl gap-2 px-2.5 py-1.5 text-sm text-[#f5f5f5] font-[500] whitespace-nowrap border border-[#343434]'>
											{item}
										</Badge>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className='mt-12'>
						<TicketCallToAction />
					</div>

					<div className='mt-12 rounded-xl bg-[#f5f5f5] text-xl text-[#231F20] font-[600] flex items-center justify-center py-[1.15rem] gap-3 cursor-pointer'>
						<Icon icon="fluent:add-32-filled" width="24" height="24" className={`h-6 w-6`}/>
						<p>Add another Ticket Tier</p>
					</div>
				</div>
			</div>
			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous"/>
				<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(5)}/>
			</div>	
		</div>
	</EventContextProvider>
  )
}

export default Tickets