# Palm Bliss Resort — 3D Interactive Demo Website Design

**Date:** 2026-11-27
**Target Property:** Palm Bliss Resort, Manohar Nagar, Navladeviwadi, Nadhavade, Maharashtra 416801 (Konkan / near Kankavli–Talere)
**Primary Contact:** `094045 96257` (`+91 94045 96257`)

---

## 1. Intent & Why

This project is a **client pitch demo website** built to win a website development contract from the owner of **Palm Bliss Resort**.

Today, Palm Bliss Resort has strong organic social proof on Google (**4.5★ across 1,043 reviews** and **670+ photos**), but **no official website** linked to its Google Business Profile (only a Facebook page and phone number). As a result:
1. Guests clicking *"Check availability"* on Google are routed to third-party OTAs (Cleartrip, Goibibo, MakeMyTrip), costing the resort ~15–22% in commissions on every booking.
2. Their **multi-cuisine restaurant** is their single most-reviewed attraction (169+ dining mentions), yet OTAs only sell rooms and never showcase their food, family dining gazebo, or group table bookings.

The demo must give the resort owner an unmistakable *"you modeled our actual property"* reaction within five seconds, and clearly prove how an official website pays for itself by shifting bookings and dining inquiries to zero-commission **WhatsApp and direct phone calls**.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Property authenticity:** The 3D scene and site copy reflect the real Palm Bliss Resort in Nadhavade — two-story red-laterite Konkan buildings with white balcony railings and sloped roofs, the open-air red-roofed dining pavilion, paved courtyard walkways, manicured lawns with a kids' play zone, free parking, palm trees, and green hills behind.
- **Zero-commission direct conversion:** Make `Call 094045 96257` and pre-filled `WhatsApp` inquiries effortless from anywhere on the page.
- **Pitch-ready ROI proof:** Include an interactive **"Save vs. OTA Rates"** comparison widget with both a **Guest Savings view** and an **Owner Commission-Savings (ROI) toggle**.
- **Smooth mobile & desktop pitch performance:** Loads instantaneously with procedural 3D geometry (no fragile external `.glb` or stock-image dependencies that could fail on weak Wi-Fi during a pitch meeting).

### Non-Goals
- Real-time backend reservation database, live payment gateway, or live OTA API scraping.
- Full multi-room interior 3D walk-in modeling.
- Multi-language (Marathi/Hindi) translation system in v1 demo.

### Anti-Goals
- Generic luxury beach-resort clichés (infinity pools, ocean beaches, spas, gyms) — the resort explicitly has **no pool, spa, gym, or pets**, and sits in lush inland Konkan greenery near waterfalls and ghats.
- Heavy 3D assets that stutter on a mid-range smartphone or overwhelm the booking/dining calls to action.
- Dark, unreadable text over glass cards.

---

## 3. Constraints & Verified Property Facts

All business details in the demo must stay faithful to the verified Google Business Profile:
- **Name:** PALM BLISS RESORT
- **Address:** Manohar Nagar, Navladeviwadi, Nadhavade, Maharashtra 416801
- **Phone / WhatsApp:** `094045 96257` (`https://wa.me/919404596257`, `tel:+919404596257`)
- **Rating:** 4.5★ from 1,043 Google reviews (74% 5-star, 18% 4-star)
- **Check-in / Check-out:** 11:00 AM / 10:00 AM
- **Verified Amenities:** Free parking, Free Wi-Fi (including public areas), Air conditioning, Multi-cuisine restaurant with table service, Breakfast (extra charge), Kids' activities / play area, Indoor games, Power backup, 24-hour front desk, Daily housekeeping, Local shuttle, Credit/Debit/Cash accepted.
- **Explicitly Excluded:** No swimming pool, no spa/hot tub, no fitness center, no pets.
- **Observed Room Categories & OTA Benchmarks (Google Hotels / Goibibo / MakeMyTrip):**
  1. **Deluxe Room (with Garden View):** ~180 sq. ft., 1 King Bed (up to 2 adults) — OTA snapshot ₹2,732 (Cleartrip) / ₹2,781 (Goibibo) / ₹3,111 (MakeMyTrip)
  2. **Super Deluxe Room (with Garden View):** ~250 sq. ft., 1 King Bed (2–5 adults) — approx. ₹3,500 (+ taxes) on MakeMyTrip
  3. **Premium Room (with Garden View):** ~250 sq. ft. — approx. ₹4,000 (+ taxes) on Goibibo
- **Nearby Konkan Landmarks:** Sherpe-Napne Waterfall (~17 min), Salva Mountain (~23 min), Vaghotan River View Point (~23 min), Karul Ghat (~47 min).
- **Review Culinary Highlights:** Surmai Tandoori, Kashmiri Naan, Peshawari Naan, South Indian breakfast, multi-cuisine family dining.

---

## 4. Approaches Considered

1. **Interactive 3D Resort Diorama + Guided Tour *(Selected)***
   - Custom procedural Three.js 3D campus miniature in the hero with free orbit, Day/Golden-Hour Dusk toggle, 4 clickable property hotspots, and bidirectional jump links from the conversion sections below (OTA vs. Direct ROI, Dining, Konkan Trails, WhatsApp Booking).
   - *Why chosen:* Delivers immediate owner recognition (*"that's our building and gazebo"*) while staying fast on phones and keeping direct booking conversion central.
2. **Editorial 3D Parallax & Interactive Showcase *(Rejected)***
   - WebGL tilt cards and 3D gallery ribbons without an architectural model.
   - *Why rejected:* Misses the signature "3D model of our actual resort" pitch hook.
3. **Free-Explore 3D Walkthrough with Walk-In Room Interiors *(Rejected)***
   - Full interior + exterior 3D navigation.
   - *Why rejected:* Higher GPU load, awkward mobile controls during an in-person pitch, and obscures booking/ROI messaging.

---

## 5. System Architecture & Experience Design

### Tech Stack *(Our Call)*
- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS with custom Konkan Hospitality CSS tokens
- **3D Engine:** Three.js (`three` + `OrbitControls` from `three/examples/jsm/controls/OrbitControls.js`) wrapped in a dedicated, lifecycle-safe React canvas component with `ResizeObserver`, `prefers-reduced-motion` handling, and graceful WebGL fallback.
- **Icons & Typography:** `lucide-react` vector icons; Google Fonts `Playfair Display` (headings) and `Plus Jakarta Sans` (body/UI), with system font fallbacks.

### Visual Direction & Palette
Grounded in the resort's real architecture and Konkan landscape:
- **Primary Canopy Green:** `#1B3B2B`
- **Konkan Laterite Terracotta:** `#9E3B2B`
- **Sunlit Sand / Ivory Background:** `#FAF7F2`
- **Warm Brass / Gold Accent:** `#B47B2B`
- **Card Surface:** `#FFFFFF` / translucent warm glass `rgba(250, 247, 242, 0.88)` with dark legible ink (`#1E293B`) ensuring >= 4.5:1 text contrast.

### 3D Diorama Scene & Interaction Model *(Builder Calls Resolved)*
- **Layout & Scroll Relationship *(Our Call)*:** Hero-contained 3D viewport (`~88vh` desktop, `~68vh` mobile) followed by full-width conversion sections below—avoiding a cramped split-screen so pricing comparisons, menu cards, and WhatsApp booking forms stay roomy on both laptops and phones.
  - **Scroll/Wheel Isolation:** `OrbitControls` disables mouse-wheel zoom (`enableZoom = false`) so scrolling down the page never gets trapped inside the 3D canvas; explicit `+` / `-` / `Reset View` glass buttons handle zoom cleanly.
  - **Bidirectional Jump:** Scrolling past the hero surfaces a compact floating *"3D Campus"* pill to jump back up; clicking *"Locate in 3D"* on the Rooms, Dining, or Courtyard sections smoothly scrolls to the hero and glides the camera to that building.
- **Procedural 3D Campus:**
  - *Main Two-Story Guest Wing & Secondary Wing:* Laterite-red textured walls, crisp white balcony railings on ground and upper floors, warm lit windows, sloped slate-green hipped roofs, external stairs.
  - *Open-Air Dining Gazebo:* Foreground red-roofed pavilion with wooden pillars, warm pendant glow, and red dining chairs.
  - *Grounds & Environment:* Brick courtyard walkways, manicured green lawn, colorful kids' slide/swing play zone, paved parking area with stylized parked car, swaying procedural palm trees, tropical bushes, `FogExp2` atmospheric depth, and rolling green Sahyadri hills on the horizon.
- **Day / Golden-Hour Dusk Switch:**
  - Smoothly interpolates sky backdrop, sun elevation/color, fog tint, and toggles warm point lights + emissive window/lantern glow for the resort's signature dusk look.
- **Camera & Hotspots:**
  - 4 interactive 3D pins + synchronized selector pills:
    1. **Overview / Arrival** (Full campus + parking + hills)
    2. **Deluxe & Super Deluxe Rooms** (Main two-story laterite wing)
    3. **Multicuisine Gazebo** (Foreground red-roofed dining pavilion)
    4. **Lawn & Kids Zone** (Courtyard garden & play area)
  - Clicking a hotspot glides the damped camera smoothly (`lerp`) to that viewpoint; dragging with mouse/touch lets the user freely orbit (polar angle clamped above ground) and pauses automatic drift.

### Key Page Sections & Pitch Conversion Flows
1. **Sticky Header:** Palm Bliss Resort crest, quick jump links (*3D Tour*, *Save vs. OTA*, *Dining*, *Explore Konkan*), Day/Dusk toggle, and direct `Call` + `WhatsApp Book` actions.
2. **Hero 3D Canvas & Floating Pitch HUD:** Interactive 3D campus taking center stage with 4.5★ (1,043 Reviews) badge, hotspot switcher, `+`/`-`/`Reset` zoom controls, drag-to-orbit hint, and quick CTAs.
3. **Interactive "Save vs. OTA Rates" & Owner ROI Section:**
   - **Controls:** Verified room tier selector (*Deluxe Garden View ~180 sq.ft.*, *Super Deluxe Garden View ~250 sq.ft.*, *Premium Garden View ~250 sq.ft.*), nights slider (1–7 nights), number of rooms (1–4), and a prominent **"Guest View" vs. "Owner ROI View"** segmented toggle.
   - **Guest View:** Compares observed OTA reference rates (Deluxe: Cleartrip ₹2,732 / Goibibo ₹2,781 / MakeMyTrip ₹3,111; Super Deluxe: ~₹3,500; Premium: ~₹4,000 — clearly labeled as illustrative OTA benchmarks) against a customizable **Direct Website Rate** (default ~14% below Goibibo, e.g., ₹2,390/night for Deluxe) + direct perks (no platform fees, priority garden-view request). Pre-fills the WhatsApp booking widget with the selected stay.
   - **Owner ROI View:** Interactive monthly direct-bookings slider (10–60 room-nights/month) and adjustable OTA commission % (default 18%) + editable direct discount %, letting you adjust numbers live with the owner during the pitch to show exact monthly & annual commission savings.
4. **Multicuisine Restaurant & Dining Pavilion:** Spotlights their top Google review strength (169 dining reviews) with curated menu cards (*Surmai Tandoori*, *Kashmiri & Peshawari Naan*, *Konkan Coastal Thali*, *South Indian Morning Breakfast*) and a one-click *"Book a Family Table on WhatsApp"* action.
5. **Property Amenities & Nearby Konkan Attractions:** Honest amenity grid (11 AM check-in / 10 AM check-out, Free Parking, Wi-Fi, AC, 24h Front Desk, Kids Zone, Indoor Games, Power Backup, Cards/Cash) + nearby attraction cards with drive times (Napne Waterfall 17m, Salva Mountain 23m, Vaghotan River 23m, Karul Ghat 47m).
6. **Guest Voices Carousel:** Accessible prev/next review highlights (keyboard-friendly, pauseable, no auto-advance trap) showcasing real review themes (Dining, Service, Cleanliness, Family atmosphere).
7. **Direct WhatsApp & Call Booking Widget (Modal/Drawer + Embedded Footer CTA):**
   - Supports *Room Reservation* or *Restaurant Table / Group Inquiry*.
   - Inputs: Guest name, phone (optional), inquiry type, check-in/out dates (or dining date & time), guest count, room/table preference.
   - Live formatted WhatsApp message preview + **"Send on WhatsApp"** (`https://wa.me/919404596257?text=...`), **"Call 094045 96257"** (`tel:+919404596257`), and **"Copy Inquiry Text"** fallback.

---

## 6. Left to the Builder

- Exact Three.js primitive proportions, procedural canvas textures (laterite brick, tiled roof, paved courtyard), and lighting intensity tuning.
- Responsive layout breakpoints (375px mobile through 1440px desktop) and keyboard/focus accessibility details for modals, toggles, and carousel controls.
- Exact calculation formulas and copy polish inside the Owner ROI calculator.
