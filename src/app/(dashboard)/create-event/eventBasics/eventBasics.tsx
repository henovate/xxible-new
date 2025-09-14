"use client";

// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import NextPreviousBtn from "../../components/nextPreviousBtn/nextPreviousBtn";
import FileUploader from "../../components/fileUploader/fileUploader";
import { useRouter } from "next/navigation";
import DashboardInputComp from "../../components/dasboardInputComp/dashboardInputComp";
import DashboardTextAreaComp from "../../components/dashboardTextAreaComp/dashboardTextAreaComp";


interface EventBasicsProps {
	setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface EventBasicsInputType {
	eventName: string;
	eventDescription: string;
	eventCategory: string;
	selectedInterest: string[];
	bannerImage: string;
	eventGalleryImages: string[];
}


const eventInterests = [
	"Amapiano",
	"Afrobeat",
	"21+",
	"Outdoors",
	"Music",
	"Clubbing",
	"Game Night",
	"Hype Man",
	"Mainland Cruise",
	"Ready to Mingle",
	"Lounge Vibes",
	"Girls Night",
	"Karaoke",
	"DJ Nights",
	"Rich Energy",
	"Make New Friends",
	"More"
  ];



const EventBasics = ({setStep}:EventBasicsProps) => {

	const router = useRouter();
	const [files, setFiles] = useState<File[]>([]);
	const [selectedInterested, setSelectedInterest] = useState<string[]>([]);
	const [uploading, setUploading] = useState<Boolean>(false);
	const [eventBasicsInput, setEventBasicsInput] = useState<EventBasicsInputType>({
		eventName: "",
		eventDescription: "",
		eventCategory: "",
		selectedInterest: [],
		bannerImage: "",
		eventGalleryImages: []
	})


const uploadImage = async(image:any) => {

	const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME ?? "";
	const preset = process.env.NEXT_PUBLIC_PRESET ?? "";
	const fileData = new FormData();
	fileData.append("file", image);
	fileData.append("upload_preset", preset);
	fileData.append("cloud_name", cloudName);

	try {
		const imgResp = await fetch(
		`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
		{
			method: "POST",
			body: fileData,
		}
		);

		const result = await imgResp.json();
		console.log(result)

		if (result?.secure_url) {
		return result?.secure_url;

		} else {
		console.error("Upload failed:", result);
		// showToast.error("Image upload failed. Please try again.");
		}
	} catch (error) {
	//   showToast.error("Image upload failed. Please try again.");
		console.error("Image upload error:", error);
	} finally {
		setUploading(false);
	}
}


const handleBannerUpload = (files: File[]) => {
	setFiles(files);
	console.log(files);
};

const handleEventBasicInput = (event:any) => {

}

const handleSelectedFilesForEventBasics = async(event:React.ChangeEvent<HTMLInputElement>, fileType:string) => {
	const { files } = event.currentTarget;

	if (fileType == "single") {
		let file = files?.[0];
		if (!file) return;
	
		try{
			const uploadedUrl = await uploadImage(file);

			if (uploadedUrl) {
				setEventBasicsInput((prev) => ({
					...prev,
					eventGalleryImages: uploadedUrl
				}))
			}
		}catch(error:any){
			// showToast.error(error)
			console.log("Upload failed:", error)
		}finally{
			setUploading(false);
		}
	} else {
		if (!files) return;

		try{
			let imageFiles = Array.from(files);

			const uploadedUrl = await Promise.all(
				imageFiles.map((image) => uploadImage(image))
			);

			const validUrls = uploadedUrl.filter((url):url is string => Boolean(url));

			setEventBasicsInput(prev => ({
				...prev,
				eventGalleryImages: [...prev.eventGalleryImages, ...validUrls]
			}))

		}catch(error:any){
			// showToast.error(error)
			console.log(error);
		}finally{
			setUploading(false);
		}
	}	
}



const handleNextStep = (step:number) => {
	setStep(step);
	router.replace(`create-event?page=${step}`)
}


const toggleSelect = (category:string) => {
	setSelectedInterest((prev) => prev.includes(category)? prev.filter(item => item !== category) : [...prev, category])
}


  return (
	<>
		<div>
			<p className="text-xl xl:text-[2rem] leading-none font-[600] text-[#f5f5f5]">Event Basics</p>
			<form className="mt-7 xl:mt-10 space-y-10">
				<DashboardInputComp 
					htmlFor="eventName" 
					id="eventName" 
					name="eventName" 
					type="text" 
					eventHandler={handleEventBasicInput} 
					label="Event Name" 
					value={eventBasicsInput.eventName} 
					placeholder="Enter your event name"
					/>

				<DashboardTextAreaComp
					htmlFor="eventDescription" 
					label="Event Description" 
					eventHandler={handleEventBasicInput} 
					name="eventDescription" 
					id="eventDescription" 
					value={eventBasicsInput.eventDescription} 
					placeholder="Enter your event description"
					/>



				{/* <div>
					<label htmlFor="eventName" className="text-base xl:text-xl font-500 text-[#f5f5f5]">Event Category</label>
					<div className="event-cat mt-5">
						<Select>
							<SelectTrigger className="w-full border-none bg-transparent text-white p-0 focus:ring-0">
								<SelectValue placeholder="Select event category" />
							</SelectTrigger>
							<SelectContent className="max-h-fit overflow-y-auto bg-[#232323] border border-[#434343] z-50" 
										   position="popper"
										   sideOffset={8}      
    									   avoidCollisions={true}
										   >
								<SelectGroup>
									<SelectLabel className="text-base font-[500]">Select event category</SelectLabel>
									<SelectItem className="text-base font-[500]" value="lagos">Lagos, NG</SelectItem>
									<SelectItem className="text-base font-[500]" value="abuja">Abuja, NG</SelectItem>
									<SelectItem className="text-base font-[500]" value="kano">Kano, NG</SelectItem>
									<SelectItem className="text-base font-[500]" value="ibadan">Ibadan, NG</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div> */}



				<div>
					<label htmlFor="eventCategory" className="text-base xl:text-xl font-500 text-[#f5f5f5]">Event Category</label>
					<div className="mt-3 xl:mt-5">
						<div className="relative w-full">
							<select
								onChange={handleEventBasicInput}
								value={eventBasicsInput.eventCategory}
								id="eventCategory"
								name="eventCategory"
								className="w-full bg-[#232323] text-white text-base xl:text-xl px-3 xl:px-6 py-4 xl:py-7 rounded-[0.75rem] border border-[#434343] appearance-none focus:outline-none"
								defaultValue=""
							>
								<option value="" disabled className="text-[#A0A0A0]">Select event category</option>
								<option value="lagos">Lagos, NG</option>
								<option value="abuja">Abuja, NG</option>
								<option value="kano">Kano, NG</option>
								<option value="ibadan">Ibadan, NG</option>
							</select>
							<div className="h-full flex items-center absolute right-4 top-0">
								<Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" className="h-8 w-8 text-[#A0A0A0]" />
							</div>
						</div>
					</div>
				</div>




				<div>
					<p className="text-xl leading-none font-500 text-[#f5f5f5]">Event Interest</p>
					<div className="flex flex-wrap gap-5 items-center mt-3 xl:mt-5">
						{eventInterests.map((item, index)=> {
							const selectedInterest = selectedInterested.includes(item)

							return (
							<div 
								key={index} 
								onClick={() => toggleSelect(item)} 
								className={`px-3 py-1 lg:py-2 rounded-full text-[0.7rem] lg:text-[0.94rem] font-[500] whitespace-nowrap w-fit cursor-pointer 
											${selectedInterest? 
												"bg-[#F800E9] text-[#f5f5f5] border-none" 
												: 
												"border border-[#787878] text-[#C2C2C2]"}
												`}>
								{item}
							</div>
						)})}
					</div>
				</div>


				<div>
					<p className="text-xl leading-none font-500 text-[#f5f5f5]">Banner Image</p>					
					<div className="mt-5 w-full mx-auto min-h-64 border border-dashed bg-white dark:bg-[#1F1F1F] border-neutral-200 dark:border-[#343434] rounded-lg">
						<FileUpload onChange={handleBannerUpload} />
					</div>			
				</div>

				<div>
					<p className="text-xl leading-none font-500 text-[#f5f5f5]">Event Gallery</p>
					
					<div className="mt-5"> 					
						<FileUploader eventHandler={handleSelectedFilesForEventBasics} />
					</div>
							
				</div>

				<div className="mt-12 flex justify-between w-full pb-28 lg:pb-0">
					<NextPreviousBtn btnName="Previous"/>
					<NextPreviousBtn btnName="Next"  handleNextStep={() => handleNextStep(2)}/>
				</div>
			</form>
		</div>
	</>
  )
}

export default EventBasics