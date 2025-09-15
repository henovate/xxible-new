import DashboardInputComp from '@/app/(dashboard)/components/dasboardInputComp/dashboardInputComp';
import DashboardTextAreaComp from '@/app/(dashboard)/components/dashboardTextAreaComp/dashboardTextAreaComp';
import React from 'react';
import { perksAndBenefits, ticketBadges } from '../ticketData/ticketData';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react/dist/iconify.js';


interface TicketTierProps {
	tierNo: number;
	setTierContainer: React.Dispatch<React.SetStateAction<string[]>>;
}

const TicketTier = ({tierNo, setTierContainer}:TicketTierProps) => {

	const removeTier = (index:number) => {
		setTierContainer(prev => [...prev.filter((_, i) => i !== index)])
	}

  return (
	<>
	  	<div className='border border-[#343434] p-6 rounded-xl'>
			<div className='flex items-center justify-between'>
				<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Tiers {tierNo}</p>

				{tierNo > 1 &&
				<div onClick={() => removeTier(tierNo - 1)} className='p-3 bg-[#FF000036] rounded-[0.4rem] cursor-pointer'>
					<Icon icon="solar:trash-bin-minimalistic-linear" width="24" height="24" className='h-6 w-6' />
				</div>
				}
			</div>

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

					<div className='flex items-center gap-6 mt-6 flex-wrap'>
						{ticketBadges.map((item, index) => (
							<Badge key={index} variant={'default'} className='rounded-3xl gap-2 px-2.5 py-1.5 text-sm bg-[#555555] text-[#f5f5f5] hover:text-stone-900 font-[500] whitespace-nowrap cursor-pointer'>
								<Icon icon={item.badgeIcon} width={20} height={20} className='h-3 w-3 md:h-4 md:w-4'/>
								{item.badgeName}
							</Badge>
						))}
					</div>
				</div>


				<div>
					<p className="text-base xl:text-xl font-500 text-[#f5f5f5]">Perks and Benefits</p>

					<div className='flex items-center flex-wrap gap-6 mt-6'>
						{perksAndBenefits.map((item, index) => (
							<Badge key={index} variant={'outline'} className='rounded-3xl gap-2 px-2.5 py-1.5 text-sm text-[#f5f5f5] font-[500] whitespace-nowrap border border-[#343434] cursor-pointer'>
								{item}
							</Badge>
						))}
					</div>
				</div>
			</div>
		</div>
	</>
  )
}

export default TicketTier;
