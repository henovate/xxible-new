import React from 'react';
import { tickets } from '../../../data';
import ProfileTicketCard from '@/components/utility/cards/profileTicketCard/profileTicketCard';
import CategoryFilter from '@/app/(dashboard)/components/categoryFilter/categoryFilter';
import NoItemCard from '../../noItemCard/noItemCard';

const MyTickets = () => {

	const categoryList = [
		"All",
		"Active",
		"Past",
		"Cancelled",
	]

  return (
	<>
		<div className="pb-8 pt-7 px-4">
			<CategoryFilter listItems={categoryList} />
		</div>	

		{!tickets || tickets.length == 0 ?
		(<div className='flex items-center justify-center mt-16 lg:mt-36'>
			<NoItemCard iconName="lets-icons:ticket-duotone" cardDescription="Looks like you haven’t booked your next night out." iconClasses='text-[#4E009C]' /> 
		</div>) : (
	  	<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
		  {tickets.map((item, i)=> (
			  <ProfileTicketCard key={i} ticketData={item} cardBgColor='bg-[#232323]' curveDesignColor='bg-[#191A1A]' cardBtnColor='bg-[#4E009C]' />
		  ))}
	  </div>
		)}
	</>
  )
}

export default MyTickets
