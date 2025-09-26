export interface UserProfile {
	id: number;
	username: string;
	image: string;
  };

export interface PreviewImagesType {
	id: number;
	url: string;
  }


  export interface SocialDataType {
	id: number;
	name: string;
	icon: string;
	description: string;
	color: string;
  }

  
  export const users: UserProfile[] = [
	{
	  id: 1,
	  username: "nightowl",
	  image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
	},
	{
	  id: 2,
	  username: "sunnydays",
	  image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
	},
	{
	  id: 3,
	  username: "techguru",
	  image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg"
	},
	{
	  id: 4,
	  username: "wanderlust",
	  image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
	},
	{
	  id: 5,
	  username: "dreamcatcher",
	  image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
	},
	{
	  id: 6,
	  username: "cityvibes",
	  image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
	},
	{
	  id: 7,
	  username: "bookworm",
	  image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
	},
	{
	  id: 8,
	  username: "foodiequeen",
	  image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
	},
	{
	  id: 9,
	  username: "musiclover",
	  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
	},
	{
	  id: 10,
	  username: "naturekid",
	  image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
	}
  ];
  



  export const previewImages:PreviewImagesType[] = [
	{
	  id: 1,
	  url: "https://images.pexels.com/photos/219101/pexels-photo-219101.jpeg",
	},
	{
	  id: 2,
	  url: "https://images.pexels.com/photos/2291450/pexels-photo-2291450.jpeg", 
	},
	{
	  id: 3,
	  url: "https://images.pexels.com/photos/2240771/pexels-photo-2240771.jpeg", 
	},
	{
	  id: 4,
	  url: "https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg", 
	},
  ];



  export const socialData:SocialDataType[] = [
	{
		id: 1,
		name: "Instagram DM",
		icon: "uil:instagram",
		description: "Quick response",
		color: "text-[#f5f5f5]"
	},
	{
		id: 2,
		name: "Whatsapp",
		icon: "ic:outline-whatsapp",
		description: "@xxxiblevibes",
		color: "text-[#25D366]"
	},
	{
		id: 3,
		name: "Email",
		icon: "logos:google-gmail",
		description: "help.xxxible@gmail.com",
		color:""
	},
  ]
  
  