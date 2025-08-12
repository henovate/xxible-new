import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react';

interface PasswordCompProps{
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	classes?: string;
	name: string;
}

const PasswordComp = ({  placeholder, value, name, onChange, classes = "" }: PasswordCompProps) => {

	const [showPassword, setShowPassword] = useState(false)

  return (
	<div>
		{/* Password Input */}
		<div className="relative">
			<div className={`${classes} absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
				<Lock className="h-[17.45px] w-[17.45px] text-gray-400" />
			</div>
			<input
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				name={name}
				className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors placeholder:text-[14px] text-[13px] text-[#898989]"
				required
				/>
				<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="absolute inset-y-0 right-0 pr-3 flex items-center"
			>
			{showPassword ? (
				<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
			) : (
				<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
			)}
			</button>
		</div>
	</div>
  )
}

export default PasswordComp