export interface Product {
  id: number;
  name: string;
  brand: string;
  sku: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: "New" | "Sale" | "Hot" | "Limited" | "Editor's Pick";
  compatibleWith: string[]; // bike model keys
  gradient: string;
  description: string;
  specs: Record<string, string>;
  amenities: string[];
  delivery: string;
  instantBook: boolean;
}

export interface BikeModel {
  make: string;
  year: number;
  model: string;
  engine: string;
  variant: string;
  key: string;
}

export const BIKE_MAKES = ["Ducati", "BMW", "KTM", "Honda", "Yamaha", "Kawasaki", "Suzuki", "Triumph", "Harley-Davidson", "Aprilia"];

export const BIKE_MODELS: BikeModel[] = [
  { make: "Ducati", year: 2024, model: "Panigale V4", engine: "1103cc", variant: "Standard", key: "ducati-panigale-v4-2024" },
  { make: "Ducati", year: 2023, model: "Monster", engine: "937cc", variant: "Standard", key: "ducati-monster-2023" },
  { make: "BMW", year: 2024, model: "S1000RR", engine: "999cc", variant: "M Package", key: "bmw-s1000rr-2024" },
  { make: "BMW", year: 2023, model: "R1250GS", engine: "1254cc", variant: "Adventure", key: "bmw-r1250gs-2023" },
  { make: "KTM", year: 2024, model: "1290 Super Duke R", engine: "1301cc", variant: "EVO", key: "ktm-1290-superduke-2024" },
  { make: "KTM", year: 2024, model: "390 Duke", engine: "399cc", variant: "Standard", key: "ktm-390-duke-2024" },
  { make: "Honda", year: 2024, model: "CBR1000RR-R", engine: "1000cc", variant: "Fireblade SP", key: "honda-cbr1000-2024" },
  { make: "Honda", year: 2023, model: "Africa Twin", engine: "1084cc", variant: "Adventure Sports", key: "honda-africatwin-2023" },
  { make: "Yamaha", year: 2024, model: "R1", engine: "998cc", variant: "M", key: "yamaha-r1-2024" },
  { make: "Yamaha", year: 2023, model: "MT-09", engine: "890cc", variant: "SP", key: "yamaha-mt09-2023" },
  { make: "Kawasaki", year: 2024, model: "Ninja ZX-10R", engine: "998cc", variant: "SE", key: "kawasaki-zx10r-2024" },
  { make: "Triumph", year: 2024, model: "Street Triple RS", engine: "765cc", variant: "RS", key: "triumph-streettriple-2024" },
];

export const CATEGORIES = [
  { id: "performance", label: "Performance Parts", icon: "⚡", gradient: "from-orange-950 via-red-950 to-black", count: 342 },
  { id: "engine", label: "Engine Components", icon: "🔩", gradient: "from-zinc-800 via-zinc-900 to-black", count: 218 },
  { id: "exhaust", label: "Exhaust Systems", icon: "💨", gradient: "from-amber-950 via-zinc-900 to-black", count: 156 },
  { id: "brakes", label: "Brakes", icon: "🛑", gradient: "from-red-950 via-zinc-900 to-black", count: 189 },
  { id: "suspension", label: "Suspension", icon: "🔧", gradient: "from-stone-800 via-zinc-900 to-black", count: 127 },
  { id: "wheels", label: "Wheels & Tires", icon: "⭕", gradient: "from-zinc-700 via-zinc-900 to-black", count: 203 },
  { id: "electronics", label: "Electronics", icon: "📡", gradient: "from-blue-950 via-zinc-900 to-black", count: 294 },
  { id: "lighting", label: "Lighting", icon: "💡", gradient: "from-yellow-900 via-zinc-900 to-black", count: 165 },
  { id: "helmets", label: "Helmets", icon: "⛑️", gradient: "from-orange-900 via-zinc-900 to-black", count: 87 },
  { id: "jackets", label: "Riding Jackets", icon: "🧥", gradient: "from-slate-800 via-zinc-900 to-black", count: 112 },
  { id: "gloves", label: "Gloves", icon: "🧤", gradient: "from-zinc-700 via-stone-900 to-black", count: 76 },
  { id: "boots", label: "Boots", icon: "👢", gradient: "from-stone-700 via-zinc-900 to-black", count: 64 },
  { id: "luggage", label: "Luggage", icon: "🎒", gradient: "from-teal-950 via-zinc-900 to-black", count: 93 },
  { id: "gps", label: "GPS & Mounts", icon: "🗺️", gradient: "from-indigo-950 via-zinc-900 to-black", count: 58 },
  { id: "maintenance", label: "Maintenance", icon: "🛠️", gradient: "from-green-950 via-zinc-900 to-black", count: 241 },
  { id: "accessories", label: "Accessories", icon: "🔑", gradient: "from-violet-950 via-zinc-900 to-black", count: 318 },
];

export const PRODUCTS: Product[] = [
  {
    id: 1, name: "Akrapovič Slip-On Exhaust", brand: "Akrapovič", sku: "AKR-SO-D4", category: "exhaust", subcategory: "Slip-On",
    price: 899, originalPrice: 1199, rating: 4.9, reviews: 312, stock: 8,
    badge: "Hot", compatibleWith: ["ducati-panigale-v4-2024", "ducati-monster-2023"],
    gradient: "from-orange-900 via-zinc-900 to-black", description: "Titanium slip-on exhaust delivering +7hp and -4kg weight reduction.",
    specs: { Material: "Titanium", Weight: "2.1kg", Power: "+7hp", Sound: "95dB" }, amenities: [], delivery: "3–5 days", instantBook: true,
  },
  {
    id: 2, name: "Brembo GP4-RX Calipers", brand: "Brembo", sku: "BRE-GP4RX-SET", category: "brakes", subcategory: "Calipers",
    price: 1240, rating: 5.0, reviews: 178, stock: 4,
    badge: "Limited", compatibleWith: ["ducati-panigale-v4-2024", "bmw-s1000rr-2024", "honda-cbr1000-2024", "yamaha-r1-2024"],
    gradient: "from-red-950 via-zinc-900 to-black", description: "Race-proven 4-piston monobloc calipers straight from MotoGP.",
    specs: { Type: "Monobloc", Pistons: "4", Material: "Aluminium Alloy", Finish: "Anodised" }, amenities: [], delivery: "5–7 days", instantBook: false,
  },
  {
    id: 3, name: "Öhlins TTX36 Rear Shock", brand: "Öhlins", sku: "OHL-TTX36-U", category: "suspension", subcategory: "Rear Shock",
    price: 1650, originalPrice: 1850, rating: 4.8, reviews: 94, stock: 6,
    badge: "Sale", compatibleWith: ["bmw-s1000rr-2024", "kawasaki-zx10r-2024", "triumph-streettriple-2024"],
    gradient: "from-zinc-700 via-zinc-900 to-black", description: "Factory-spec TTX36 twin-tube shock with fully adjustable compression and rebound.",
    specs: { Type: "Twin-Tube", Stroke: "67mm", Spring: "95N/mm", Adjustments: "22 clicks" }, amenities: [], delivery: "7–10 days", instantBook: false,
  },
  {
    id: 4, name: "Shoei X-SPR Pro Carbon Helmet", brand: "Shoei", sku: "SHO-XSPR-C", category: "helmets", subcategory: "Full Face",
    price: 799, rating: 4.9, reviews: 543, stock: 22,
    badge: "Editor's Pick", compatibleWith: ["*"],
    gradient: "from-slate-800 via-zinc-900 to-black", description: "AIM+ carbon shell construction with integrated emergency release system and Pinlock 120.",
    specs: { Shell: "AIM+ Carbon", Weight: "1,395g", Visor: "Pinlock 120", Standard: "ECE 22.06" }, amenities: [], delivery: "2–4 days", instantBook: true,
  },
  {
    id: 5, name: "Power Commander V Fuel Tuner", brand: "Dynojet", sku: "DYN-PCV-D4", category: "electronics", subcategory: "Fuel Management",
    price: 349, originalPrice: 399, rating: 4.7, reviews: 267, stock: 15,
    badge: "Sale", compatibleWith: ["ducati-panigale-v4-2024", "ducati-monster-2023", "bmw-s1000rr-2024"],
    gradient: "from-blue-950 via-zinc-900 to-black", description: "Maps fuel delivery over 1000 throttle position/RPM cells for perfect combustion.",
    specs: { "Fuel Maps": "1000 cells", Connection: "USB", Display: "LED", "Preloaded Maps": "10 included" }, amenities: [], delivery: "2–3 days", instantBook: true,
  },
  {
    id: 6, name: "Alpinestars GP Pro R4 Jacket", brand: "Alpinestars", sku: "ALP-GPR4-BLK", category: "jackets", subcategory: "Leather",
    price: 649, rating: 4.8, reviews: 189, stock: 31,
    badge: "New", compatibleWith: ["*"],
    gradient: "from-stone-800 via-zinc-900 to-black", description: "Premium cowhide leather race jacket with full titanium hardware and removable CE Level 2 protectors.",
    specs: { Material: "Full-grain cowhide", Back: "CE Level 2", Elbows: "CE Level 2", Chest: "CE Level 1" }, amenities: [], delivery: "3–5 days", instantBook: true,
  },
  {
    id: 7, name: "Michelin Power 6 Tyre Set", brand: "Michelin", sku: "MIC-PWR6-SET", category: "wheels", subcategory: "Tyres",
    price: 380, originalPrice: 440, rating: 4.7, reviews: 411, stock: 18,
    badge: "Sale", compatibleWith: ["ducati-panigale-v4-2024", "bmw-s1000rr-2024", "yamaha-r1-2024", "kawasaki-zx10r-2024"],
    gradient: "from-zinc-700 via-zinc-900 to-black", description: "Road-legal sport tyre delivering race track performance for everyday riding.",
    specs: { Front: "120/70 ZR17", Rear: "190/55 ZR17", Compound: "Dual", TUV: "Yes" }, amenities: [], delivery: "4–6 days", instantBook: true,
  },
  {
    id: 8, name: "SC-Project CR-T Exhaust Full System", brand: "SC-Project", sku: "SCP-CRT-K24", category: "exhaust", subcategory: "Full System",
    price: 2100, rating: 4.9, reviews: 88, stock: 3,
    badge: "Limited", compatibleWith: ["ktm-1290-superduke-2024", "ktm-390-duke-2024"],
    gradient: "from-amber-950 via-zinc-900 to-black", description: "Full titanium racing system with carbon silencer. Dyno-proven +15hp gain.",
    specs: { Material: "Titanium/Carbon", Weight: "3.8kg", Power: "+15hp", dB: "102dB" }, amenities: [], delivery: "10–14 days", instantBook: false,
  },
  {
    id: 9, name: "Bonamici Racing Footpeg Kit", brand: "Bonamici", sku: "BON-FP-BMW24", category: "accessories", subcategory: "Footpegs",
    price: 285, rating: 4.6, reviews: 142, stock: 12,
    badge: undefined, compatibleWith: ["bmw-s1000rr-2024", "bmw-r1250gs-2023"],
    gradient: "from-violet-950 via-zinc-900 to-black", description: "CNC-machined from 7075 aluminium, 5mm lower and 15mm wider than stock.",
    specs: { Material: "7075 Aluminium", Position: "-5mm / +15mm", Finish: "Anodised", Pins: "Titanium" }, amenities: [], delivery: "5–7 days", instantBook: true,
  },
  {
    id: 10, name: "Forma Adventure Low Boot", brand: "Forma", sku: "FOR-ADV-L-44", category: "boots", subcategory: "Adventure",
    price: 219, rating: 4.5, reviews: 326, stock: 45,
    badge: "New", compatibleWith: ["*"],
    gradient: "from-stone-700 via-zinc-900 to-black", description: "Waterproof Gore-Tex adventure boot with CE Level 2 ankle and toe protection.",
    specs: { Standard: "CE Cat. II", Liner: "Gore-Tex", Closure: "BOA + Zip", Sole: "Vibram" }, amenities: [], delivery: "2–4 days", instantBook: true,
  },
  {
    id: 11, name: "Garmin Zumo XT2 GPS Navigator", brand: "Garmin", sku: "GAR-ZUMOXT2", category: "gps", subcategory: "Navigation",
    price: 699, originalPrice: 749, rating: 4.8, reviews: 204, stock: 9,
    badge: "Sale", compatibleWith: ["*"],
    gradient: "from-indigo-950 via-zinc-900 to-black", description: "6.1\" sunlight-readable touchscreen with live traffic, weather, and adventure routing.",
    specs: { Screen: "6.1\" WSVGA", Map: "World Lifetime", Gloves: "Yes", Battery: "4hr" }, amenities: [], delivery: "3–5 days", instantBook: true,
  },
  {
    id: 12, name: "Yoshimura R-77 Alpha Slip-On", brand: "Yoshimura", sku: "YOS-R77A-YAM", category: "exhaust", subcategory: "Slip-On",
    price: 545, originalPrice: 620, rating: 4.7, reviews: 167, stock: 14,
    badge: "Sale", compatibleWith: ["yamaha-r1-2024", "yamaha-mt09-2023"],
    gradient: "from-red-900 via-zinc-900 to-black", description: "Street-legal stainless slip-on with carbon fibre end cap and deep note.",
    specs: { Material: "Stainless Steel", Cap: "Carbon Fibre", dB: "89dB", Weight: "-1.8kg" }, amenities: [], delivery: "3–5 days", instantBook: true,
  },
  {
    id: 13, name: "Spidi Track Wind Pro Suit", brand: "Spidi", sku: "SPI-TWP-BLK-52", category: "jackets", subcategory: "Race Suit",
    price: 1299, rating: 4.9, reviews: 73, stock: 7,
    badge: "Editor's Pick", compatibleWith: ["*"],
    gradient: "from-orange-950 via-zinc-900 to-black", description: "One-piece leather race suit with titanium sliders and CE Level 2 full protection.",
    specs: { Material: "Kangaroo + Cowhide", Back: "CE Level 2", Hump: "Aerodynamic", Sliders: "Titanium" }, amenities: [], delivery: "5–7 days", instantBook: false,
  },
  {
    id: 14, name: "Bridgestone Battlax RS11 Set", brand: "Bridgestone", sku: "BRI-RS11-S", category: "wheels", subcategory: "Tyres",
    price: 340, rating: 4.8, reviews: 289, stock: 24,
    badge: undefined, compatibleWith: ["honda-cbr1000-2024", "triumph-streettriple-2024", "yamaha-r1-2024"],
    gradient: "from-zinc-800 via-zinc-900 to-black", description: "Hypersport tyre developed with World Superbike technology for extreme track and road performance.",
    specs: { Front: "120/70 ZR17", Rear: "190/55 ZR17", MSRC: "Yes", Compound: "SC" }, amenities: [], delivery: "4–6 days", instantBook: true,
  },
  {
    id: 15, name: "Dainese D-Air Race Suit", brand: "Dainese", sku: "DAI-DAIR-BLK-52", category: "jackets", subcategory: "Race Suit",
    price: 2499, rating: 5.0, reviews: 41, stock: 2,
    badge: "Limited", compatibleWith: ["*"],
    gradient: "from-slate-900 via-zinc-900 to-black", description: "World's first airbag-integrated leather race suit with 35ms deployment time.",
    specs: { Airbag: "D-Air 2.0", Deploy: "35ms", Back: "CE Level 2", Material: "Kangaroo + TPU" }, amenities: [], delivery: "7–10 days", instantBook: false,
  },
  {
    id: 16, name: "Rizoma Wing 8 Mirror Set", brand: "Rizoma", sku: "RIZ-WING8-BLK", category: "accessories", subcategory: "Mirrors",
    price: 189, originalPrice: 220, rating: 4.6, reviews: 134, stock: 20,
    badge: "Sale", compatibleWith: ["ducati-panigale-v4-2024", "ducati-monster-2023", "bmw-s1000rr-2024"],
    gradient: "from-violet-900 via-zinc-900 to-black", description: "CNC-machined aluminium wing mirrors with anti-vibration stem and convex glass.",
    specs: { Material: "Aluminium", Glass: "Convex", Stem: "Anti-vibration", Finish: "Black Anodised" }, amenities: [], delivery: "5–7 days", instantBook: true,
  },
];

export const FEATURED_BRANDS = [
  "Akrapovič", "Öhlins", "Brembo", "Alpinestars", "Shoei", "Michelin",
  "Dynojet", "SC-Project", "Dainese", "Yoshimura", "Garmin", "Rizoma",
];
