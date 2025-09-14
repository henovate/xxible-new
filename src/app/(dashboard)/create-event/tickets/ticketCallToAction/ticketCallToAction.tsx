import React, { useContext } from 'react';
import EventCallToAction from '../../components/eventCallToAction/eventCallToAction';
import DashboardInputComp from '@/app/(dashboard)/components/dasboardInputComp/dashboardInputComp';
import DatePicker from '@/app/(dashboard)/components/datePicker/datePicker';
import { ListContext } from '../../eventContext/eventContext';

const TicketCallToAction = () => {
	const ctx = useContext(ListContext);
	if (!ctx) throw new Error("EventCallToAction must be used inside <EventContext>");

	const { ticketCallToActionSwitch, setTicketCallToActionSwitch } = ctx;
  return (
	<EventCallToAction heading='Early Bird Pricing' description='Offer discounted price for early buyers' setSwitch={setTicketCallToActionSwitch} switchState={ticketCallToActionSwitch}>
		<div className={`grid-cols-1 md:grid-cols-2 gap-10 mt-6 transition-all ${ticketCallToActionSwitch? "grid opacity-100" : "hidden opacity-0"}`}>
			<DashboardInputComp htmlFor='earlyBirdPrice' type='number' id='earlyBirdPrice' name='earlyBirdPrice' label='Early Bird Price (₦)' placeholder='₦ 0.00'/>
			<DatePicker label="Early Bird End Date" />
		</div>
	</EventCallToAction>
  )
}

export default TicketCallToAction;