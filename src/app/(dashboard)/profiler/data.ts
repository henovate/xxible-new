  
export interface TicketType {
	id: number;
	image: string;
	title: string;
	date: string;
	price: number;
	ticketType: string;
};  


export const tickets:TicketType[] = [
	{
		id: 1,
		image: "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg",
		title: "Afrobeats Rooftop Rave",
		date: "Saturday, June 28, 2025",
		price: 18000,
		ticketType: "Popular",
	},
	{
		id: 2,
		image: "https://images.pexels.com/photos/332688/pexels-photo-332688.jpeg",
		title: "Rizzler Vibes",
		date: "Saturday, June 28, 2025",
		price: 30000,
		ticketType: "Vip",
	},
	{
		id: 3,
		image: "https://images.pexels.com/photos/1230397/pexels-photo-1230397.jpeg",
		title: "Shayo Settings",
		date: "Saturday, June 28, 2025",
		price: 18000,
		ticketType: "regular",
	},
	{
		id: 4,
		image: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
		title: "Margarita & Shades",
		date: "Saturday, June 28, 2025",
		price: 18000,
		ticketType: "Popular",
	  },
  ];
  


  