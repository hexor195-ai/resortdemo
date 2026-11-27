export type HotspotId = 'overview' | 'rooms' | 'dining' | 'courtyard';

export interface RoomTier {
  id: 'deluxe' | 'super-deluxe' | 'premium';
  name: string;
  sizeSqFt: number;
  bedding: string;
  capacity: string;
  view: string;
  highlights: string[];
  otaBenchmarks: {
    cleartrip?: number;
    goibibo?: number;
    makemytrip?: number;
  };
  referenceOtaRate: number;
}

export interface CampusHotspot {
  id: HotspotId;
  label: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  targetSection: string;
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  pinPos: [number, number, number];
}

export interface DiningHighlight {
  id: string;
  name: string;
  category: string;
  description: string;
  tag: string;
}

export interface NearbyAttraction {
  id: string;
  name: string;
  driveTime: string;
  vibe: string;
  description: string;
}

export interface GuestReview {
  id: string;
  guestName: string;
  tripType: string;
  topic: string;
  rating: number;
  quote: string;
}

export const RESORT_INFO = {
  name: 'PALM BLISS RESORT',
  displayName: 'Palm Bliss Resort',
  tagline: 'Konkan Garden Sanctuary & Multicuisine Pavilion',
  address: 'Manohar Nagar, Navladeviwadi, Nadhavade, Maharashtra 416801',
  regionLine: 'Talere–Vaibhavwadi Road, Sindhudurg, Konkan',
  phoneDisplay: '094045 96257',
  phoneHref: 'tel:+919404596257',
  whatsappNumber: '919404596257',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Palm+Bliss+Resort+Nadhavade+Maharashtra+416801',
  rating: 4.5,
  reviewCount: 1043,
  ratingBreakdown: {
    fiveStarPct: 74,
    fourStarPct: 18,
    threeStarPct: 3,
    otherPct: 5,
  },
  checkIn: '11:00 AM',
  checkOut: '10:00 AM',
  amenities: [
    'Free private parking',
    'Free Wi-Fi across rooms & lawns',
    'Air-conditioned garden rooms',
    'Multi-cuisine restaurant (table service)',
    'Breakfast available (extra charge)',
    'Kids play area & outdoor slide',
    'Indoor games',
    '24-hour front desk & daily housekeeping',
    'Power backup & local shuttle',
    'Credit cards, debit cards & cash accepted',
  ],
  excludedAmenities: [
    'No swimming pool',
    'No spa or hot tub',
    'No fitness center',
    'No pets allowed',
  ],
} as const;

export const ROOM_TIERS: RoomTier[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Room (Garden View)',
    sizeSqFt: 180,
    bedding: '1 King Bed',
    capacity: 'Up to 2 adults',
    view: 'Garden & Courtyard View',
    highlights: ['Split AC', 'Flat-screen TV', 'Attached private bathroom', 'Free Wi-Fi'],
    otaBenchmarks: {
      cleartrip: 2732,
      goibibo: 2781,
      makemytrip: 3111,
    },
    referenceOtaRate: 2781,
  },
  {
    id: 'super-deluxe',
    name: 'Super Deluxe Room (Garden View)',
    sizeSqFt: 250,
    bedding: '1 King Bed + Extra Bedding Option',
    capacity: '2 to 5 adults',
    view: 'Garden & Palm Grove View',
    highlights: ['Spacious 250 sq.ft.', 'Split AC & fan', 'Wardrobe & seating', 'Priority ground/1st floor'],
    otaBenchmarks: {
      makemytrip: 3500,
    },
    referenceOtaRate: 3500,
  },
  {
    id: 'premium',
    name: 'Premium Room (Garden View)',
    sizeSqFt: 250,
    bedding: '1 King Bed',
    capacity: '2 to 3 adults',
    view: 'Upper Balcony Lawn View',
    highlights: ['Balcony access', 'Split AC', 'Refrigerator in select rooms', '24-hr housekeeping'],
    otaBenchmarks: {
      goibibo: 4000,
    },
    referenceOtaRate: 4000,
  },
];

export const CAMPUS_HOTSPOTS: CampusHotspot[] = [
  {
    id: 'overview',
    label: 'Full Konkan Campus',
    shortLabel: 'Overview',
    subtitle: 'Nadhavade · Sahyadri Foothills',
    description:
      'Red-laterite Konkan cottages framed by palm groves, manicured courtyard lawns, open-air dining, and free guest parking.',
    ctaLabel: 'Compare Direct vs. OTA Rates',
    targetSection: '#save-ota',
    cameraPos: [20, 14, 24],
    targetPos: [0, 1.5, 0],
    pinPos: [0, 5.2, -2],
  },
  {
    id: 'rooms',
    label: 'Deluxe & Super Deluxe Wings',
    shortLabel: 'AC Rooms',
    subtitle: 'Two-Story Laterite Cottages',
    description:
      'Air-conditioned garden-view rooms with crisp white balcony railings, warm evening lighting, 11 AM check-in, and 24-hour front desk support.',
    ctaLabel: 'Check Direct Room Savings',
    targetSection: '#save-ota',
    cameraPos: [10.5, 6.8, 12.5],
    targetPos: [0, 2.8, -5.2],
    pinPos: [0, 6.2, -5.2],
  },
  {
    id: 'dining',
    label: 'Multicuisine Dining Pavilion',
    shortLabel: 'Dining Gazebo',
    subtitle: '169+ Dining Reviews on Google',
    description:
      'Open-air red-roofed dining gazebo serving coastal Surmai Tandoori, Kashmiri & Peshawari Naan, and fresh South Indian breakfasts.',
    ctaLabel: 'Explore Signature Menu',
    targetSection: '#dining',
    cameraPos: [-11.5, 5.8, 13.5],
    targetPos: [-4.2, 1.4, 4.6],
    pinPos: [-4.2, 4.2, 4.6],
  },
  {
    id: 'courtyard',
    label: 'Courtyard Lawn & Kids Zone',
    shortLabel: 'Lawn & Kids',
    subtitle: 'Family-Friendly Grounds',
    description:
      'Paved laterite walkways, open green lawns, a children’s slide & swing play zone, and calm mountain-breeze evenings.',
    ctaLabel: 'See Amenities & Trails',
    targetSection: '#konkan-trails',
    cameraPos: [11, 5.5, 13],
    targetPos: [4.2, 1.0, 4.2],
    pinPos: [4.4, 3.0, 4.4],
  },
];

export const DINING_HIGHLIGHTS: DiningHighlight[] = [
  {
    id: 'surmai',
    name: 'Surmai Tandoori',
    category: 'Coastal Konkan Grill',
    description:
      'Fresh kingfish marinated in roasted Konkan spices and charred in the clay tandoor — a top guest favorite in Google reviews.',
    tag: 'Most Praised',
  },
  {
    id: 'naan',
    name: 'Kashmiri & Peshawari Naan',
    category: 'Tandoor Specialties',
    description:
      'Soft, blistered tandoori breads stuffed with delicate aromatic nuts and sweet-savory fillings, served hot with rich curries.',
    tag: 'Signature Bread',
  },
  {
    id: 'thali',
    name: 'Multi-Cuisine Family Spread',
    category: 'Indian · Chinese · Coastal',
    description:
      'Wholesome lunches and dinners prepared fresh to order for highway travelers, couples, and large family groups.',
    tag: 'Table Service',
  },
  {
    id: 'breakfast',
    name: 'South Indian Morning Tiffin',
    category: 'Morning Breakfast',
    description:
      'Crisp dosas, fluffy idlis, chutney, and hot filter coffee in the breezy open-air courtyard before heading out to the ghats.',
    tag: '80+ Breakfast Reviews',
  },
];

export const NEARBY_ATTRACTIONS: NearbyAttraction[] = [
  {
    id: 'napne',
    name: 'Sherpe–Napne Waterfall',
    driveTime: '17 min drive',
    vibe: 'Cascading Konkan Falls',
    description: 'Scenic perennial waterfall tucked into lush green hills near Vaibhavwadi.',
  },
  {
    id: 'salva',
    name: 'Salva Mountain',
    driveTime: '23 min drive',
    vibe: 'Hilltop Panorama',
    description: 'Quiet Sahyadri ridge trails with sweeping mist views at sunrise and dusk.',
  },
  {
    id: 'vaghotan',
    name: 'Vaghotan River View Point',
    driveTime: '23 min drive',
    vibe: 'Riverside Calm',
    description: 'Peaceful river bend overlooking verdant Konkan valleys.',
  },
  {
    id: 'karul',
    name: 'Karul Ghat',
    driveTime: '47 min drive',
    vibe: 'Mountain Pass',
    description: 'Dramatic Sahyadri mountain pass connecting Kolhapur and the Konkan belt.',
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    guestName: 'Verified Google Guest',
    tripType: 'Family Dining & Stay',
    topic: 'Dining · 169 Mentions',
    rating: 5,
    quote:
      'Delicious Surmai Tandoori and Kashmiri Naan in the open-air pavilion. Peaceful surroundings, spotless restrooms, and very warm staff.',
  },
  {
    id: 'rev-2',
    guestName: 'Verified Google Guest',
    tripType: 'Weekend Road Trip',
    topic: 'Property & Parking · 156 Mentions',
    rating: 5,
    quote:
      'Clean garden-view AC rooms with generous parking right inside the property. The lawns and kids play area kept our children happily occupied.',
  },
  {
    id: 'rev-3',
    guestName: 'Verified Google Guest',
    tripType: 'Breakfast & Stopover',
    topic: 'Breakfast & Service · 165 Mentions',
    rating: 5,
    quote:
      'Fresh South Indian breakfast and attentive table service. Staff promptly helped us with every request — a serene stop near Nadhavade.',
  },
  {
    id: 'rev-4',
    guestName: 'Verified Google Guest',
    tripType: 'Family Getaway',
    topic: 'Cleanliness · 74 Mentions',
    rating: 4,
    quote:
      'Quiet nature backdrop away from highway rush, well-maintained rooms, and genuinely humble hospitality across the entire team.',
  },
];
