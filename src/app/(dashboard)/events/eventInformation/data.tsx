interface TicketTagType {
	label: string;
	icon: string;
};
  
export interface TicketType {
	id: number;
	title: string;
	description: string;
	price: number;
	tag: TicketTagType;
	perks: string[];
	ticketType: string;
};  


export const tickets:TicketType[] = [
	{
	  id: 1,
	  title: "General Admission",
	  description: "Standard entry with core perks",
	  price: 18000,
	  ticketType: "general",
	  tag: {
		label: "Popular",
		icon: "mingcute:star-fill",
	  },
	  perks: [
		"Fast Entry",
		"General bar access",
		"Dance Floor access"
	  ],
	},
	{
	  id: 2,
	  title: "VIP Experience",
	  description: "Premium experience with exclusive perks",
	  price: 30000,
	  ticketType: "vip",
	  tag: {
		label: "VIP Only",
		icon: "solar:crown-bold",
	  },
	  perks: [
		"Fast Entry",
		"General bar access",
		"Dance Floor access"
	  ],
	},
	{
	  id: 3,
	  title: "Regular",
	  description: "Standard entry to the event",
	  price: 18000,
	  ticketType: "regular",
	  tag: {
		label: "Limited Time",
		icon: "solar:bolt-linear",
	  },
	  perks: [
		"Fast Entry",
		"General bar access",
		"Dance Floor access"
	  ],
	},
  ];
  


  