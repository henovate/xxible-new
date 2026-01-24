interface reviewType {
	reviewersName: string;
	review: string;
	reviewTotal: number;
}



export interface EventDataType {
	id: string;
	title: string;
	location: string;
	date: string;
	time?: string;
	price?: number;
	currency?: string;
	attendingCount?: number;
	imageUrl: string;
	imageAlt: string;
	categories?: string[];
	brand: {
	  name: string;
	  description: string;
	  logo?: string;
	}
	category?: string;
	reviewTotal?: number;
	ratings?: number;
	review?: reviewType;
  }
  