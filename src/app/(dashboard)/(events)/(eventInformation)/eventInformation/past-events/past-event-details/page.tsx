"use client";

import SwipeSlider from '@/components/utility/swipeSlider/swipeSlider';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { imgGallery } from './data';
import ImgCard from './component/imgCard/imgCard';
import ReviewCard from '@/components/utility/cards/reviewCard/reviewCard';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import DashboardTextAreaComp from '@/app/(dashboard)/components/dashboardTextAreaComp/dashboardTextAreaComp';

const Page = () => {

	const router = useRouter();

	const handleGoBack = () => {
		router.push("/events");
	}

  	return (
	<div className="bg-[#191A1A]">
		<div className='grid grid-cols-1 xl:grid-cols-[70%_1fr] text-[#f5f5f5]'>
			{/* 1st Partition */}
			<div className='border-r-2 border-[#343434]'> 
				<div className="bg-[#221922] text-xl lg:text-2xl py-7 px-5 flex items-center justify-between text-[#f5f5f5]">
					<div onClick={handleGoBack} className='flex items-center gap-3 cursor-pointer group'>
						<Icon icon="majesticons:arrow-left-line" width="24" height="24" className='h-6 w-6 group-hover:text-[#00baf8]' />
						<p className="font-[600] group-hover:text-[#a29f9f]">Event Recap</p>
					</div>
				</div>

				<div className='p-5 lg:p-[2.8rem] lg:gap-8 xl:gap-12'>
					<div className='relative w-full h-[33.65rem] bg-black/40 bg-blend-overlay'>
						<Image src="https://images.pexels.com/photos/3419687/pexels-photo-3419687.jpeg" width={572.42} height={649.59} alt="event" className='w-full h-full object-cover rounded-xl' />


						<div className='absolute w-full h-full top-0 left-0'>
							<div className='bg-black/20 backdrop-blur-md px-5 py-4 md:p-10'>
								<p className='font-[600] text-2xl leading-7'>Unleashing XXible Nightlife</p>   
								<p className='mt-3 font-[400] text-base'>Quilox - Explore nightlife in Lagos</p>     
							</div>
						</div>
					</div>



					<div className='gap-4 lg:gap-0 px-5 lg:px-[3.5rem] py-7 bg-[#232323] rounded-b-xl grid grid-cols-2 md:flex items-center justify-between'>
						<div className="gap-2 flex">
							<div className="p-2.5 rounded-xl bg-[#353535] w-fit h-fit">
								<Icon icon="mynaui:users-group" width="24" height="24" className='w-5 h-5 lg:w-6 lg:h-6 text-[#f5f5f5]'/>
							</div>
							<div>
								<p className="font-[700] text-2xl lg:text-3xl">500+</p>
								<p className="mt-1 lg:mt-1.5 font-[400] text-base">Attendess</p>
							</div>
						</div>

						<div className="gap-2 flex">
							<div className="p-2.5 rounded-xl bg-[#353535] w-fit h-fit">
								<Icon icon="solar:camera-linear" width="24" height="24" className='w-5 h-5 lg:w-6 lg:h-6 text-[#f5f5f5]'/>
							</div>
							<div>
								<p className="font-[700] text-2xl lg:text-3xl">124</p>
								<p className="mt-1 lg:mt-1.5 font-[400] text-base">Media</p>
							</div>
						</div>

						<div className="gap-2 flex">
							<div className="p-2.5 rounded-xl bg-[#353535] w-fit h-fit">
								<Icon icon="solar:star-linear" width="24" height="24" className='w-5 h-5 lg:w-6 lg:h-6 text-[#f5f5f5]'/>
							</div>
							<div>
								<p className="font-[700] text-2xl lg:text-3xl">4.8</p>
								<p className="mt-1 lg:mt-1.5 font-[400] text-base">Rating</p>
							</div>
						</div>

						<div className="gap-2 flex">
							<div className="p-2.5 rounded-xl bg-[#353535] w-fit h-fit">
								<Icon icon="solar:clock-circle-outline" width="24" height="24" className='w-5 h-5 lg:w-6 lg:h-6 text-[#f5f5f5]'/>
							</div>
							<div>
								<p className="font-[700] text-2xl lg:text-3xl">8hrs</p>
								<p className="mt-1 lg:mt-1.5 font-[400] text-base">Runtime</p>
							</div>
						</div>
					</div>


					<div className="border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl mt-5 py-6 lg:py-5 px-5 lg:px-6">
						<div>
							<p className="font-[600] text-2xl leading-none">About This Event</p>
							<p className="font-[400] text-base leading-6 text-[#A0A0A0] mt-4">
								An electrifying night of neon vibes, premium cocktails, and non-stop dancing under UV lights. 
								The event featured top DJs spinning the latest Afrobeats and house music, creating an unforgettable atmosphere 
								that had everyone dancing until dawn
							</p>

							<div className='mt-6 lg:mt-4'>
								<div className={`flex items-center gap-1.5 text-[#A0A0A0]`}>
									<MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
									<p className={`text-base leading-none`}>Victoria Island, Lagos</p>
								</div>
							</div>

							<div className='mt-3'>
								<div className={`flex items-center gap-1.5 text-[#A0A0A0]`}>
									<Icon icon="simple-line-icons:calender" width="1024" height="1024" className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" />
									<p className={`text-base leading-none`}>July 6, 2025 • 9:00 PM - 4:00 AM</p>
								</div>
							</div>
						</div>
					</div>




					<div className="bg-[#1F1F1F] rounded-xl border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] py-5 px-6 mt-6">
						<div className='flex items-center justify-between'>
							<p className='font-[600] text-xl leading-none text-[#f5f5f5]'>Event Media</p>					
							<div className='flex items-center gap-1 cursor-pointer group border border-[#525151] rounded-lg p-2.5 w-fit'>
								<Icon icon="solar:camera-linear" width="24" height="24" className='w-6 h-6 text-[#E9E9E9]'/>
								<p className='text-base font-[400] text-[#E9E9E9] group-hover:text-[#7c7e7e]'>View all 124</p>
							</div>
						</div>

						<div className="mt-6">
							<SwipeSlider Card={ImgCard} arrayData={imgGallery} cardHeightClass="h-[12.8rem]" />
						</div>						
					</div>





					<div className="mt-8 border border-[#343434] shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-xl px-4 py-5 lg:flex items-center justify-between">
						<div className='flex items-center gap-3'>
							<div style={{backgroundImage: `url("https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg")`}} className="rounded-full h-[4.4rem] w-[4.4rem] bg-cover bg-center bg-no-repeat bg-black flex-shrink-0"></div>
							<div>
								<p className='font-[600] text-xl leading-none'>Quilox - Explore nightlife in Lagos</p>
								<p className='text-[#a0a0a0] text-base font-[500] leading-none mt-2.5'>25 events hosted • 4.9★ rating</p>
							</div>
						</div>

						<button className='text-base font-[500] py-3 px-[3.85rem] rounded-xl text-[#898989] flex items-center justify-center lg:justify-start gap-2 bg-[#f5f5f5] shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-[#F800E8] hover:text-[#f5f5f5] hover:font-[600] transition-colors mt-5 lg:mt-0 w-full lg:w-fit'>
							<Icon icon="heroicons:user-plus" width="24" height="24" className='h-5 w-5' />
							<span>Follow</span>
						</button>
					</div>
				</div>
			</div> 
		

			{/* 2nd Partition */}  
			<div className='hidden xl:block'>
				<div className='px-6 py-7 flex items-center justify-between border border-b-[#212121]'>
					<span className="font-[600] text-2xl leading-none text-[#f5f5f5]">Reviews</span>
					<div className="flex items-center gap-3.5">
						<div className="flex items-center gap-1">
							<Icon icon="ic:round-star-rate" width="24" height="24" className='text-[#FFAD43] h-6 w-6' />
							<p className="font-[500] text-xl leading-none">4.8</p>
						</div>
						
						<Dialog>
							<DialogTrigger>
								<div className='cursor-pointer'>
									<span className="text-[#A0A0A0] font-[400] text-base leading-none">(124 Reviews)</span>
								</div>
							</DialogTrigger>
							<DialogContent className='max-w-[45.5rem] px-0 sm:rounded-3xl bg-[#191A1A] border-none'>
								<DialogHeader>
								<DialogTitle className='border-b border-[#343434]'>
									<div className='p-7 flex items-center justify-between'>
										<span className="font-[600] text-xl leading-none text-[#f5f5f5]">Reviews</span>										
										<div>
											<span className="text-[#A0A0A0] font-[400] text-base leading-none">(124 Reviews)</span>
										</div>
									</div>
								</DialogTitle>
								<DialogDescription className='px-7 overflow-y-auto min-w-0'>
									<div className='h-[60vh] w-full'>
										{Array.from({length: 6}, (_, i) => (
											<ReviewCard key={i}/>
										))}
									</div>
								</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>


				<div className="py-3.5 px-[2.83rem]">
					<div className="border border-gradient-to-r from-[#353535] to-[#9B9B9B] bg-[#232323] shadow-[0_0_20px_rgba(0,0,0,0.5)] p-4 rounded-3xl">
						<p className="text-xl font-[600] text-[#F5F5F5]">Leave a Review</p>
						<p className="text-sm font-[400] text-[#C8C8C8] mt-1.5">Had an unforgettable night? Let others in on the vibe! Share your experience</p>

						<Dialog>
							<DialogTrigger>
								<div className="rounded-full px-7 py-2 bg-[#F800E8] text-[#f5f5f5] mt-8 w-fit shadow-[0_0_15px_rgba(255,0,212,0.6)] hover:scale-105 transition-transform cursor-pointer">
									<p className="text-base font-[600]">Review</p>
								</div>
							</DialogTrigger>
							<DialogContent className='max-w-[45.5rem] px-0 sm:rounded-3xl bg-[#191a1a] border-none bg-cover bg-center bg-no-repeat border border-[#343434]' style={{backgroundImage: "url('/assets/img/review.png')"}}>
								<DialogHeader>
								<DialogTitle className='border-b border-[#343434] bg-[#191a1a]'>
									<div className='p-7'>
										<span className="font-[600] text-xl leading-none text-[#E9E9E9]">Leave a Review</span>										
									</div>
								</DialogTitle>
								<DialogDescription className='px-7 py-16'>
									<div>
										<div className='flex flex-col justify-center items-center'>
											<p className='text-2xl font-[500] text-center'>How was the vibe?</p>
											<div className="flex items-center mt-5">
												{Array.from({length:4}, (_, i) => (
													<Icon key={i} icon="solar:star-bold" width="24" height="24" className='text-[#FFAD43] h-20 w-20' />
												))}
												<Icon icon="solar:star-linear" width="24" height="24" className='text-[#9F9F9F] h-20 w-20' />
											</div>
										</div>
										

										<div className='mt-16 px-10'>
											<form className='w-full'>
												<DashboardTextAreaComp 
														label='Share your experience' 
														placeholder='What did you love? What could be better?' 
														labelClass='text-base xl:text-base' 
														textAreaPlaceholderAndTextFontClass='text-base xl:text-base placeholder:text-base xl:placeholder:text-base h-[7rem]'
														/>

												<div className='flex justify-end mt-2.5 text-[#A0A0A0] text-base'>
													<p>0/500</p>
												</div>
											</form>
										</div>

										<div className='flex justify-center'>
											<button className='py-3 px-16 text-[#898989] bg-[#f5f5f5] mt-10 rounded-xl text-base font-[500]'>Post Review</button>
										</div>										
									</div>
								</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<div className='p-5'>
					{/* Reviews List */}
					{Array.from({length: 6}, (_, i) => (
						<ReviewCard key={i}/>
					))}
				</div>
			</div>
		</div>
	</div>
	)
}

export default Page;
