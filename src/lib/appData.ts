export type Profile = {
  photoUrl: string;
  age: number | null;
  interests: string[];
  bio: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  createdAt: string;
  profile: Profile;
};

export type Event = {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  price: number;
  currency: string;
  description: string;
  venue: string;
  categories: string[];
  imageUrl: string;
  imageAlt: string;
  hostName: string;
  hostDescription: string;
  brand: {
    name: string;
    description: string;
    logo?: string;
  };
};

export type RSVP = {
  eventId: string;
  userId: string;
};

export type Message = {
  id: string;
  eventId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
};

export type AppData = {
  users: User[];
  events: Event[];
  rsvps: RSVP[];
  messages: Message[];
  currentUserId: string | null;
};

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const defaultUsers: User[] = [
  {
    id: createId(),
    name: "Tracy Williams",
    email: "tracy@example.com",
    password: "password123",
    city: "Abuja",
    createdAt: "2020-10-01T10:00:00.000Z",
    profile: {
      photoUrl: "https://images.pexels.com/photos/2291450/pexels-photo-2291450.jpeg",
      age: 27,
      interests: ["Link Up", "Karaoke", "House Party", "Dancing"],
      bio: "Dolore sapiente eaque molestias at itaque error sit et. Aut neque amet est.",
    },
  },
  {
    id: createId(),
    name: "Sunny Days",
    email: "sunny@example.com",
    password: "password123",
    city: "Lagos",
    createdAt: "2021-03-14T09:00:00.000Z",
    profile: {
      photoUrl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      age: 25,
      interests: ["Beach Vibes", "Afrobeats", "Rooftop"],
      bio: "Chasing sunsets and rooftop beats around the city.",
    },
  },
  {
    id: createId(),
    name: "Night Owl",
    email: "nightowl@example.com",
    password: "password123",
    city: "Lagos",
    createdAt: "2022-05-22T19:30:00.000Z",
    profile: {
      photoUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      age: 30,
      interests: ["DJ Night", "Bonfire", "Live Music"],
      bio: "I live for late-night sets and after-hours vibes.",
    },
  },
];

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Unleashing XXible Nightlife",
    location: "Victoria Island, Lagos",
    date: "Saturday, June 28, 2025",
    time: "6:00 PM WAT",
    price: 0,
    currency: "₦",
    description:
      "XXible Nightlife isn’t just an event — it’s an experience made for the unstoppable. Expect live DJ sets, welcome cocktails, wild dance floor moments, and VIP guest appearances that take the night to a whole new level.",
    venue: "873 Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    categories: ["Girls Night", "Karaoke", "DJ Night", "Late Night", "Beach Vibes", "Bonfire"],
    imageUrl: "/assets/featured/featured1.png",
    imageAlt: "Person wearing glowing neon mask at nightclub with vibrant lighting",
    hostName: "Quilox",
    hostDescription: "Explore nightlife in Lagos",
    brand: {
      name: "Quilox",
      description: "Explore nightlife in Lagos",
    },
  },
  {
    id: "2",
    title: "Afrobeats Rooftop Experience",
    location: "Lekki Phase 1, Lagos",
    date: "Saturday, July 6, 2025",
    time: "8:00 PM WAT",
    price: 35000,
    currency: "₦",
    description:
      "Catch the sunset with Afrobeats energy on the skyline. Enjoy curated cocktails, skyline photo ops, and a lineup of the city’s best DJs.",
    venue: "SkyLounge Rooftop, Lekki Phase 1",
    categories: ["Rooftop", "Afrobeats", "DJ Night"],
    imageUrl: "/assets/featured/featured2.png",
    imageAlt: "Rooftop party with Afrobeats music and Lagos city skyline",
    hostName: "SkyLounge",
    hostDescription: "Premium rooftop experiences",
    brand: {
      name: "SkyLounge",
      description: "Premium rooftop experiences",
    },
  },
  {
    id: "3",
    title: "Neon Nights: Electronic Fusion",
    location: "Ikeja GRA, Lagos",
    date: "Friday, July 12, 2025",
    time: "9:00 PM WAT",
    price: 25000,
    currency: "₦",
    description:
      "Electronic music meets neon art installations for a night of immersive sound and light. Dress in your brightest fits and dance till dawn.",
    venue: "Pulse Club, Ikeja GRA",
    categories: ["Electronic", "Neon", "Late Night"],
    imageUrl: "/assets/featured/featured3.png",
    imageAlt: "Electronic music party with neon lights and laser show",
    hostName: "Pulse Club",
    hostDescription: "Electronic music destination",
    brand: {
      name: "Pulse Club",
      description: "Electronic music destination",
    },
  },
  {
    id: "4",
    title: "Jazz & Wine Soirée",
    location: "Ikoyi, Lagos",
    date: "Thursday, July 18, 2025",
    time: "7:00 PM WAT",
    price: 45000,
    currency: "₦",
    description:
      "An elegant night of live jazz, curated wine tasting, and conversation under warm lights. Perfect for relaxed networking.",
    venue: "The Jazz Spot, Ikoyi",
    categories: ["Jazz", "Wine", "Live Music"],
    imageUrl: "/assets/featured/featured4.png",
    imageAlt: "Elegant jazz club with live band and wine tasting",
    hostName: "The Jazz Spot",
    hostDescription: "Sophisticated live music venue",
    brand: {
      name: "The Jazz Spot",
      description: "Sophisticated live music venue",
    },
  },
  {
    id: "5",
    title: "Lagos Beach Party Extravaganza",
    location: "Tarkwa Bay, Lagos",
    date: "Saturday, July 20, 2025",
    time: "4:00 PM WAT",
    price: 20000,
    currency: "₦",
    description:
      "Beach bonfire, DJs, and sunset dance sessions all rolled into one. Bring your crew and your best beach fits.",
    venue: "Tarkwa Bay Beachfront",
    categories: ["Beach Vibes", "Bonfire", "Party"],
    imageUrl: "/assets/featured/featured5.png",
    imageAlt: "Beach party with bonfire and sunset dancing",
    hostName: "Waves Entertainment",
    hostDescription: "Beach party specialists",
    brand: {
      name: "Waves Entertainment",
      description: "Beach party specialists",
    },
  },
  {
    id: "6",
    title: "Hip-Hop Cypher Night",
    location: "Surulere, Lagos",
    date: "Saturday, July 27, 2025",
    time: "8:00 PM WAT",
    price: 15000,
    currency: "₦",
    description:
      "A raw hip-hop experience featuring cypher battles, open mic, and guest performers from the city’s underground scene.",
    venue: "Urban Vibes Arena, Surulere",
    categories: ["Hip-Hop", "Cypher", "Live Music"],
    imageUrl: "/assets/featured/featured6.png",
    imageAlt: "Hip hop cypher with rappers performing on stage",
    hostName: "Urban Vibes",
    hostDescription: "Street culture and music",
    brand: {
      name: "Urban Vibes",
      description: "Street culture and music",
    },
  },
];

export const createInitialAppData = (): AppData => {
  const [host, attendeeOne, attendeeTwo] = defaultUsers;
  return {
    users: defaultUsers,
    events: defaultEvents,
    rsvps: [
      { eventId: "1", userId: host.id },
      { eventId: "1", userId: attendeeOne.id },
      { eventId: "1", userId: attendeeTwo.id },
      { eventId: "2", userId: attendeeOne.id },
      { eventId: "3", userId: attendeeTwo.id },
    ],
    messages: [
      {
        id: createId(),
        eventId: "1",
        senderId: host.id,
        recipientId: attendeeOne.id,
        content: "Can’t wait to see you at XXible Nightlife!",
        timestamp: "2024-06-01T10:30:00.000Z",
      },
    ],
    currentUserId: host.id,
  };
};

export const createEmptyProfile = (): Profile => ({
  photoUrl: "",
  age: null,
  interests: [],
  bio: "",
});

export const createNewUser = (data: {
  name: string;
  email: string;
  password: string;
  city: string;
}): User => ({
  id: createId(),
  name: data.name,
  email: data.email,
  password: data.password,
  city: data.city,
  createdAt: new Date().toISOString(),
  profile: createEmptyProfile(),
});

export const appDataStorageKey = "xxible-app-data";
