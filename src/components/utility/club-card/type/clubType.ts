export interface ClubDataType {
	id: string
	name: string
	isVerified: boolean
	eventCount: number
	followerCount: number
	description: string
	imageUrl: string
	imageAlt: string
	primaryTags: string[]
	secondaryTags: string[]
	location?: string
  }
  