export interface EventDataType {
	id: string
	title: string
	location: string
	date: string
	time: string
	price: number
	currency: string
	interestedCount: number
	imageUrl: string
	imageAlt: string
	categories?: string[]
	brand: {
	  name: string
	  description: string
	  logo?: string
	}
  }
  