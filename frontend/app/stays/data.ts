export interface Stay {
  id: number;
  name: string;
  location: string;
  country: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  riderFriendly: boolean;
  instantBook: boolean;
  amenities: string[];
  gradient: string;
  accentColor: string;
  tag?: string;
}

const AMENITIES_POOL = [
  "Bike Parking", "Secure Parking", "WiFi", "Workshop Nearby",
  "EV Charging", "Pet Friendly", "Pool", "Restaurant", "Bar",
  "Laundry", "Air Con", "Fireplace", "Hot Tub", "Gym",
];

function pick<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
}

export const ALL_STAYS: Stay[] = [
  { id: 1, name: "Thunder Ridge Lodge", location: "Drakensberg", country: "South Africa", price: 180, rating: 4.9, reviews: 312, distance: "2km from N3 Route", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Secure Parking", "WiFi", "Workshop Nearby", "Fireplace"], gradient: "from-orange-950 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Trending" },
  { id: 2, name: "Iron Horse Inn", location: "Cape Town", country: "South Africa", price: 220, rating: 4.8, reviews: 198, distance: "5km from Chapman's Peak", riderFriendly: true, instantBook: false, amenities: ["Bike Parking", "WiFi", "Bar", "Restaurant", "Laundry"], gradient: "from-zinc-800 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Popular" },
  { id: 3, name: "Desert Hawk Camp", location: "Namib Desert", country: "Namibia", price: 95, rating: 4.7, reviews: 88, distance: "On B1 Highway", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Fireplace", "Pet Friendly"], gradient: "from-amber-900 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Adventure" },
  { id: 4, name: "Summit Rider Cabin", location: "Swiss Alps", country: "Switzerland", price: 340, rating: 5.0, reviews: 67, distance: "On Grimsel Pass", riderFriendly: true, instantBook: false, amenities: ["Secure Parking", "Hot Tub", "Fireplace", "WiFi"], gradient: "from-blue-950 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Luxury" },
  { id: 5, name: "Pit Stop Hostel", location: "Bangkok", country: "Thailand", price: 35, rating: 4.5, reviews: 422, distance: "3km from Highway 1", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "WiFi", "Laundry", "Bar"], gradient: "from-red-950 via-zinc-900 to-black", accentColor: "#f0810f" },
  { id: 6, name: "Moto Beach Villa", location: "Bali", country: "Indonesia", price: 165, rating: 4.8, reviews: 256, distance: "Coastal Route 18", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Pool", "Bar", "WiFi", "EV Charging"], gradient: "from-teal-900 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Beach" },
  { id: 7, name: "Black Rock Resort", location: "Nevada", country: "USA", price: 275, rating: 4.7, reviews: 183, distance: "Route 66 Access", riderFriendly: true, instantBook: false, amenities: ["Secure Parking", "Pool", "Bar", "Restaurant", "Gym"], gradient: "from-stone-800 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Premium" },
  { id: 8, name: "Smoky Mountain Lodge", location: "Tennessee", country: "USA", price: 145, rating: 4.6, reviews: 341, distance: "Tail of the Dragon", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Fireplace", "Hot Tub", "WiFi", "Pet Friendly"], gradient: "from-green-950 via-zinc-900 to-black", accentColor: "#f0810f" },
  { id: 9, name: "Touge Rider Inn", location: "Hakone", country: "Japan", price: 210, rating: 4.9, reviews: 127, distance: "Mt Fuji Circuit Road", riderFriendly: true, instantBook: false, amenities: ["Secure Parking", "Hot Tub", "WiFi", "Restaurant"], gradient: "from-rose-950 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Editor's Pick" },
  { id: 10, name: "Atlas Mountain Camp", location: "Marrakech", country: "Morocco", price: 80, rating: 4.6, reviews: 99, distance: "Tizi n'Tichka Pass", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Fireplace", "Pet Friendly", "WiFi"], gradient: "from-yellow-900 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Adventure" },
  { id: 11, name: "Harbor Moto Hotel", location: "Dubrovnik", country: "Croatia", price: 195, rating: 4.7, reviews: 211, distance: "Adriatic Coast Route", riderFriendly: true, instantBook: true, amenities: ["Secure Parking", "Pool", "Restaurant", "WiFi", "EV Charging"], gradient: "from-cyan-950 via-zinc-900 to-black", accentColor: "#f0810f" },
  { id: 12, name: "Outback Rider Station", location: "Alice Springs", country: "Australia", price: 120, rating: 4.5, reviews: 76, distance: "Stuart Highway", riderFriendly: true, instantBook: false, amenities: ["Bike Parking", "Workshop Nearby", "Bar", "WiFi"], gradient: "from-orange-900 via-red-950 to-black", accentColor: "#f0810f", tag: "Hidden Gem" },
  { id: 13, name: "Fjord Edge Cabin", location: "Bergen", country: "Norway", price: 290, rating: 4.9, reviews: 54, distance: "Hardanger Fjord Road", riderFriendly: true, instantBook: false, amenities: ["Secure Parking", "Fireplace", "Hot Tub", "WiFi"], gradient: "from-indigo-950 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Luxury" },
  { id: 14, name: "Moto Finca Rosa", location: "Ronda", country: "Spain", price: 155, rating: 4.8, reviews: 168, distance: "Sierra Nevada Route", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Pool", "Restaurant", "WiFi", "Pet Friendly"], gradient: "from-pink-950 via-zinc-900 to-black", accentColor: "#f0810f" },
  { id: 15, name: "Highland Biker Bothy", location: "Scottish Highlands", country: "UK", price: 70, rating: 4.4, reviews: 133, distance: "North Coast 500", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "Fireplace", "Pet Friendly"], gradient: "from-emerald-950 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Budget" },
  { id: 16, name: "Volcano View Resort", location: "Tenerife", country: "Spain", price: 230, rating: 4.7, reviews: 289, distance: "Teide National Park", riderFriendly: true, instantBook: false, amenities: ["Secure Parking", "Pool", "Bar", "Restaurant", "Gym", "EV Charging"], gradient: "from-red-900 via-orange-950 to-black", accentColor: "#f0810f", tag: "Luxury" },
  { id: 17, name: "Karoo Stopover", location: "Beaufort West", country: "South Africa", price: 60, rating: 4.3, reviews: 87, distance: "N1 National Road", riderFriendly: true, instantBook: true, amenities: ["Bike Parking", "WiFi", "Laundry"], gradient: "from-amber-950 via-zinc-900 to-black", accentColor: "#f0810f", tag: "Budget" },
  { id: 18, name: "Canyon Rim Lodge", location: "Moab", country: "USA", price: 315, rating: 4.9, reviews: 201, distance: "Colorado River Route", riderFriendly: true, instantBook: false, amenities: ["Secure Parking", "Hot Tub", "Pool", "WiFi", "Bar"], gradient: "from-orange-800 via-red-900 to-black", accentColor: "#f0810f", tag: "Premium" },
];

export const ROWS: { title: string; ids: number[] }[] = [
  { title: "Trending Stays", ids: [1, 2, 6, 7, 16, 18] },
  { title: "Recommended For You", ids: [9, 13, 4, 14, 11, 6] },
  { title: "Near Popular Riding Routes", ids: [8, 3, 10, 15, 12, 17] },
  { title: "Luxury Escapes", ids: [4, 13, 16, 18, 7, 11] },
  { title: "Adventure Lodges", ids: [3, 10, 12, 15, 8, 5] },
  { title: "Rider Favorites", ids: [1, 9, 6, 14, 2, 8] },
  { title: "New This Month", ids: [17, 12, 15, 10, 5, 3] },
  { title: "Best Weekend Destinations", ids: [6, 14, 11, 8, 1, 9] },
  { title: "Affordable Stays", ids: [5, 15, 17, 3, 10, 8] },
  { title: "Editor's Picks", ids: [9, 4, 13, 1, 18, 16] },
];

export const CATEGORIES = [
  { label: "Biker Friendly", icon: "🏍️" },
  { label: "Hotels", icon: "🏨" },
  { label: "Cabins", icon: "🏚️" },
  { label: "Lodges", icon: "🏔️" },
  { label: "Campsites", icon: "⛺" },
  { label: "Luxury Resorts", icon: "✨" },
  { label: "Budget Stays", icon: "💰" },
  { label: "Beach Escapes", icon: "🏖️" },
  { label: "Mountain Retreats", icon: "🗻" },
  { label: "City Hotels", icon: "🌆" },
  { label: "Farm Stays", icon: "🌾" },
  { label: "Weekend Getaways", icon: "🛣️" },
  { label: "Long Ride Stops", icon: "⛽" },
  { label: "Adventure Camps", icon: "🔥" },
  { label: "Group Stays", icon: "👥" },
  { label: "Premium Picks", icon: "🏆" },
];

export function getStayById(id: number): Stay | undefined {
  return ALL_STAYS.find((s) => s.id === id);
}
