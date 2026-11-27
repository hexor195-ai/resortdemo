export interface RoomTier {
  id: 'deluxe' | 'super-deluxe' | 'premium';
  name: string;
  sizeSqFt: number;
  bedding: string;
  capacity: string;
  view: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  highlights: string[];
}

export interface HeroSlide {
  id: string;
  shortLabel: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
}

export interface GalleryPhoto {
  id: string;
  category: 'grounds' | 'rooms' | 'dining';
  title: string;
  caption: string;
  src: string;
  alt: string;
}

export interface DiningHighlight {
  id: string;
  name: string;
  category: string;
  description: string;
  tag: string;
  imageSrc: string;
  imageAlt: string;
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
  tagline: 'Konkan Garden Cottages & Munching Bites Multicuisine Dining',
  logoSrc: '/images/logo.jpg',
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
    'Munching Bites multi-cuisine restaurant',
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

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'evening',
    shortLabel: 'Evening Courtyard',
    title: 'Konkan Garden Cottages at Dusk',
    caption:
      'Two-story red-laterite cottages, glowing balconies, open-air dining pavilion, and kids play lawn.',
    src: '/images/hero-evening.jpg',
    alt: 'Palm Bliss Resort two-story red-laterite cottages, lit balconies, red-roofed dining gazebo, and lawn at dusk',
  },
  {
    id: 'gazebo',
    shortLabel: 'Night Gazebo',
    title: 'Open-Air Munching Bites Pavilion',
    caption:
      'Breezy red-roofed courtyard pavilion illuminated warmly for relaxed family dinners.',
    src: '/images/gazebo-night.jpg',
    alt: 'Illuminated outdoor dining gazebo with red chairs in front of the Palm Bliss Resort wing at night',
  },
  {
    id: 'walkway',
    shortLabel: 'Garden Walkway',
    title: 'Lantern-Lit Laterite Strolls',
    caption:
      'Paved courtyard walkways flanked by palms, manicured lawn strips, and ground-floor verandas.',
    src: '/images/walkway-night.jpg',
    alt: 'Warmly lit brick garden pathway alongside ground and upper-floor resort verandas at night',
  },
  {
    id: 'aerial',
    shortLabel: 'Aerial Campus',
    title: 'Surrounded by Konkan Greenery',
    caption:
      'Spacious compound off the Talere–Vaibhavwadi Road with private parking and wooded hills.',
    src: '/images/aerial-day.jpg',
    alt: 'Aerial daytime view of Palm Bliss Resort green-roofed cottages, courtyard, and palm trees',
  },
];

export const ROOM_TIERS: RoomTier[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Room (Garden View)',
    sizeSqFt: 180,
    bedding: '1 King Bed',
    capacity: 'Up to 2 adults',
    view: 'Garden & Courtyard View',
    imageSrc: '/images/room-garden.jpg',
    imageAlt: 'Deluxe Room with white king bedding and wide window overlooking the resort garden gazebo',
    description:
      'Bright, airy garden-facing room featuring wide courtyard windows, crisp white linens, split AC, and peaceful morning light.',
    highlights: ['Split AC', 'Flat-screen TV', 'Attached private bathroom', 'Free Wi-Fi'],
  },
  {
    id: 'super-deluxe',
    name: 'Super Deluxe Room (Garden View)',
    sizeSqFt: 250,
    bedding: '1 King Bed + Extra Bedding Option',
    capacity: '2 to 5 adults',
    view: 'Garden & Palm Grove View',
    imageSrc: '/images/room-ac.jpg',
    imageAlt: 'Spacious Super Deluxe AC Room with double bed, wooden wardrobe, mirror, and TV',
    description:
      'Extra floor space tailored for families and small groups, complete with wooden wardrobe storage, ceiling fan, split AC, and courtyard access.',
    highlights: ['Spacious 250 sq.ft.', 'Split AC & fan', 'Wardrobe & mirror', 'Family friendly'],
  },
  {
    id: 'premium',
    name: 'Premium Room (Garden View)',
    sizeSqFt: 250,
    bedding: '1 King Bed',
    capacity: '2 to 3 adults',
    view: 'Upper Balcony Lawn View',
    imageSrc: '/images/room-floral.jpg',
    imageAlt: 'Premium Room with recessed warm ceiling lighting, floral accent headboard wall, and AC',
    description:
      'Refined interiors with recessed warm ceiling lighting, floral feature headboard, private balcony seating, and calm hillside views.',
    highlights: ['Balcony access', 'Recessed warm lighting', 'Refrigerator in select rooms', '24-hr housekeeping'],
  },
];

export const MUNCHING_BITES_INFO = {
  name: 'Munching Bites',
  fullName: "Konkan's Munching Route Multicuisine Restaurant",
  logoSrc: '/images/munching-logo.jpg',
  rating: 4.3,
  ratingCount: 147,
  hours: '7:00 AM – 11:00 PM (Daily)',
  justdialUrl:
    'https://www.justdial.com/Sindhudurg/KonkanS-Munching-Route-Multicuisine-Restaurant-Nadhavade/9999P2362-2362-220618221553-L1W1_BZDET',
  summary:
    'Located right inside the Palm Bliss Resort courtyard, Munching Bites welcomes resort guests and Konkan highway travelers for fresh coastal seafood, clay-tandoor breads, Indo-Chinese starters, and comforting Indian family meals.',
  serviceFeatures: [
    'Open-Air Gazebo & Indoor Seating',
    'Breakfast, Brunch, Lunch & Dinner',
    'Dine-in · Takeaway · Drive-Through',
    'Kids Menu & High Chairs Available',
    'Halal Meat & Vegetarian Options',
    'Freshly Prepared Family Group Meals',
  ],
  cuisines: ['Konkani & Coastal Seafood', 'North Indian & Tandoor', 'Indo-Chinese Wok', 'South Indian Breakfast'],
} as const;

export const DINING_HIGHLIGHTS: DiningHighlight[] = [
  {
    id: 'seafood',
    name: 'Surmai & Prawns Fry',
    category: 'Konkani Coastal Kitchen',
    description:
      'Fresh kingfish and marinated prawns pan-seared with aromatic Konkan spices — paired with crisp onion rings.',
    tag: 'Guest Favorite',
    imageSrc: '/images/food-seafood.jpg',
    imageAlt: 'Plated spicy prawns starter and pan-fried surmai fish at Munching Bites',
  },
  {
    id: 'thali',
    name: 'Traditional Konkan Thali',
    category: 'Wholesome Indian Meals',
    description:
      'Steaming jeera rice, soft chapatis, rich curries, crispy papad, raita, and cooling solkadhi served fresh.',
    tag: 'Dine-In Highlight',
    imageSrc: '/images/food-thali.jpg',
    imageAlt: 'Traditional Konkani thali platter with curries, chapati, rice, papad, and solkadhi',
  },
  {
    id: 'pomfret',
    name: 'Rava-Fried Whole Pomfret',
    category: 'Coastal Catch',
    description:
      'Crisp semolina-crusted whole pomfret fried golden to order, garnished with fresh coriander and lime.',
    tag: 'Fresh Catch',
    imageSrc: '/images/food-pomfret.jpg',
    imageAlt: 'Golden rava-fried whole pomfret garnished with onion rings and coriander',
  },
  {
    id: 'starters',
    name: 'Indo-Chinese & Wood-Fired Bites',
    category: 'Multicuisine Favorites',
    description:
      'Crowd-pleasing Manchurian, crispy starters, fresh pizzas, and South Indian morning tiffins for every palate.',
    tag: '7 AM – 11 PM',
    imageSrc: '/images/munching-starter.jpg',
    imageAlt: 'Crispy Indo-Chinese glazed starter platter served fresh at Munching Bites',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-evening',
    category: 'grounds',
    title: 'Dusk Courtyard & Kids Lawn',
    caption: 'Warm balcony lights overlooking the manicured garden & kids slide.',
    src: '/images/hero-evening.jpg',
    alt: 'Palm Bliss Resort main courtyard and cottages glowing at dusk',
  },
  {
    id: 'gal-aerial-dusk',
    category: 'grounds',
    title: 'Twilight Resort Compound',
    caption: 'Surrounded by tall coconut palms and quiet Konkan hillsides.',
    src: '/images/aerial-dusk.jpg',
    alt: 'Aerial twilight view of Palm Bliss Resort illuminated in Nadhavade',
  },
  {
    id: 'gal-walkway',
    category: 'grounds',
    title: 'Laterite Garden Walkway',
    caption: 'Paved pathways connecting every cottage wing to dining and parking.',
    src: '/images/walkway-night.jpg',
    alt: 'Evening walkway lined with potted plants and two-story guest rooms',
  },
  {
    id: 'gal-room-garden',
    category: 'rooms',
    title: 'Deluxe Garden View Room',
    caption: 'Air-conditioned comfort opening onto courtyard greenery.',
    src: '/images/room-garden.jpg',
    alt: 'Deluxe Garden View Room interior with double bed and courtyard window',
  },
  {
    id: 'gal-room-ac',
    category: 'rooms',
    title: 'Super Deluxe Family Room',
    caption: 'Generous 250 sq.ft. layout with wooden wardrobe and split AC.',
    src: '/images/room-ac.jpg',
    alt: 'Super Deluxe Room interior with wardrobe, mirror, TV, and AC',
  },
  {
    id: 'gal-room-floral',
    category: 'rooms',
    title: 'Premium Suite Interior',
    caption: 'Recessed ceiling lighting and refined floral headboard decor.',
    src: '/images/room-floral.jpg',
    alt: 'Premium Room interior with floral wall accent and warm recessed lights',
  },
  {
    id: 'gal-gazebo',
    category: 'dining',
    title: 'Munching Bites Gazebo',
    caption: 'Open-air courtyard dining pavilion lit warmly every evening.',
    src: '/images/gazebo-night.jpg',
    alt: 'Munching Bites covered outdoor dining gazebo with red seating at night',
  },
  {
    id: 'gal-pizza',
    category: 'dining',
    title: 'Multicuisine Dining Hall',
    caption: 'Freshly baked pizzas alongside Indian, Coastal, and Chinese dishes.',
    src: '/images/food-pizza.jpg',
    alt: 'Freshly baked pizza served on wooden dining table at Munching Bites',
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
