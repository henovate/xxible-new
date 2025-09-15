import React from 'react';

interface PublishItemProps {
	eventItem: string;
	eventName: string;
}

const PublishItem = ({eventItem, eventName}:PublishItemProps) => {
  return (
		<div className='grid grid-cols-1 sm:grid-cols-2 border-b border-[#343434] py-5'>
			<p className='text-[#A0A0A0]'>{eventItem}</p>
			<p className='text-[#f5f5f5] text-right'>{eventName}</p>
		</div>
  )
}

export default PublishItem
