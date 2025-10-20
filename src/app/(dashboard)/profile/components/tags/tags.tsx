import { Badge } from '@/components/ui/badge'
import { Icon } from '@iconify/react/dist/iconify.js'


interface TagType {
	iconClasses?: string;
	labelClasses?: string; 
}

export const VipTag = ({iconClasses, labelClasses}:TagType) => {
	return (
		<>
			<Badge className='rounded-3xl gap-1 flex items-center px-3 py-2 w-fit bg-gradient-to-r from-[#F99D32] to-[#FF6607]'>
				<Icon icon="solar:crown-bold" width="24" height="24" className={`text-[#f5f5f5] h-4 w-4 ${iconClasses}`} />
				<div>
					<p className={`text-sm leading-[0.9rem] font-[500] text-[#f5f5f5] ${labelClasses}`}>Vip Only</p>
				</div>
			</Badge>
		</>
	)
}


export const PopularTag = ({iconClasses, labelClasses}:TagType) => {
	return (
		<>
			<Badge className='rounded-3xl gap-1 flex items-center px-3 py-2 w-fit bg-gradient-to-r from-[#F800E9] to-[#5500CD]'>
				<Icon icon="mingcute:star-fill" width="24" height="24" className={`text-[#f5f5f5] h-4 w-4 ${iconClasses}`} />
				<div>
					<p className={`text-sm leading-[0.9rem] font-[500] text-[#f5f5f5] ${labelClasses}`}>Popular</p>
				</div>
			</Badge>
		</>
	)
  }



export const LimitedTimeTag = ({iconClasses, labelClasses}:TagType) => {
	return (
		<>
			<Badge className='rounded-3xl gap-1 flex items-center px-3 py-2 w-fit bg-gradient-to-r from-[#007AFF] to-[#08509E]'>
				<Icon icon="solar:bolt-linear" width="24" height="24" className={`text-[#f5f5f5] h-4 w-4 ${iconClasses}`} />
				<div>
					<p className={`text-sm leading-[0.9rem] font-[500] text-[#f5f5f5] ${labelClasses}`}>Limited Time</p>
				</div>
			</Badge>
		</>
	)
}


