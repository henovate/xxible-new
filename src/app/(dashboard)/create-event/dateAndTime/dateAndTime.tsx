import DatePicker from '@/app/(dashboard)/components/datePicker/datePicker';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import { useRouter } from 'next/navigation';


interface DateAndTimeProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const DateAndTime = ({setStep}: DateAndTimeProps) => {

	const router = useRouter();

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<>
	  <div className='space-y-7 xl:space-y-12'>
	  		<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Date & Time</p>
				<form>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
						<div>
							<div>
								<DatePicker label="Start Date" />
							</div>
							
							<div className='mt-8'>
								<DatePicker label="End Date" />
							</div>
						</div>	


						<div>
							<div>
								<label htmlFor="eventName" className="text-base xl:text-xl font-500 text-[#f5f5f5]">Start Time</label>
								<div className="mt-3 xl:mt-5">
									<input 
										// onChange={handleEventBasicInput} 
										type="time" 
										name="eventName" 
										id="eventName" 
										// value={eventBasicsInput.eventName} 
										className="px-3 xl:px-6 py-4 xl:py-7 placeholder:text-base xl:placeholder:text-xl placeholder:text-[#A0A0A0] text-[#f5f5f5] text-base xl:text-xl bg-[#232323] border border-[#434343] w-full rounded-[0.75rem] focus:outline-[#F800E9] focus:outline-none" placeholder="Enter your event name"/>
								</div>
							</div>

							<div className='mt-8'>
								<label htmlFor="eventName" className="text-base xl:text-xl font-500 text-[#f5f5f5]">End Time</label>
								<div className="mt-3 xl:mt-5">
									<input 
										// onChange={handleEventBasicInput} 
										type="time" 
										name="eventName" 
										id="eventName" 
										// value={eventBasicsInput.eventName} 
										className="px-3 xl:px-6 py-4 xl:py-7 placeholder:text-base xl:placeholder:text-xl placeholder:text-[#A0A0A0] text-[#f5f5f5] text-base xl:text-xl bg-[#232323] border border-[#434343] w-full rounded-[0.75rem] focus:outline-[#F800E9] focus:outline-none" placeholder="Enter your event name"/>
								</div>
							</div>
						</div>						
					</div>		
				</form>

				<div className='text-[#f5f5f5] border border-[#343434] p-3 xl:p-6 bg-gradient-to-r from-[#5500cd38] to-[#f800e81e] rounded-[0.75rem] flex justify-between items-center'>
					<div className='w-[80%] md:w-full'>
						<p className='font-[500] text-base xl:text-[1.5rem] leading-none'>Overnight Event</p>
						<p className='font-[400] text-xs leading-3 sm:text-sm xl:text-xl sm:leading-[0.9rem] xl:leading-none mt-2 xl:mt-3'>This event continues past midnight into the next day</p>
					</div>

					<label className="switch">
						<input type="checkbox" />
						<span className="slider">
							<svg className="slider-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
						</span>
					</label>
				</div>


				<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
					<NextPreviousBtn btnName="Previous"/>
					<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(3)}/>
				</div>	
	  </div>
	</>
  )
}

export default DateAndTime
