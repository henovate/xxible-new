import DatePicker from '@/app/(dashboard)/components/datePicker/datePicker';
import NextPreviousBtn from '../../components/nextPreviousBtn/nextPreviousBtn';
import { useRouter } from 'next/navigation';
import DashboardInputComp from '../../components/dasboardInputComp/dashboardInputComp';
import EventCallToAction from '../components/eventCallToAction/eventCallToAction';
import { EventContextProvider } from '../eventContext/eventContext';


interface DateAndTimeProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

const DateAndTime = ({setStep}: DateAndTimeProps) => {

	const router = useRouter();

	const handleDateAndTimeInput = (event:any) => {

	}

	const handleNextStep = (step:number) => {
		setStep(step);
		router.replace(`create-event?page=${step}`)
	}

  return (
	<>
	<EventContextProvider>
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
						<DashboardInputComp id="startTime" name="startTime" type='time' label='Start Time' eventHandler={handleDateAndTimeInput} placeholder='' />
						
						<div className='mt-8'>
							<DashboardInputComp id="endTime" name="endTime" type='time' label='End Time' eventHandler={handleDateAndTimeInput} placeholder='' />
						</div>
					</div>						
				</div>		
			</form>

			<EventCallToAction heading='Overnight Event' description='This event continues past midnight into the next day' />


			<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
				<NextPreviousBtn btnName="Previous" handleStepDirection={()=>router.push("create-event?page=1")} />
				<NextPreviousBtn btnName="Next"  handleStepDirection={() => handleNextStep(3)}/>
			</div>	
		</div>
	</EventContextProvider>
	</>
  )
}

export default DateAndTime
