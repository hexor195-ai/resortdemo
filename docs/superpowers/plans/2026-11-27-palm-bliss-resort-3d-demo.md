# Palm Bliss Resort 3D Demo Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a self-contained, interactive 3D pitch demo website for Palm Bliss Resort (Nadhavade, Konkan) featuring a procedural Three.js resort diorama, Day/Golden-Hour Dusk lighting, a "Save vs. OTA Rates" & Owner ROI calculator, multicuisine restaurant showcase, and direct WhatsApp/call inquiry conversion.

**Architecture:** A React + TypeScript + Vite single-page application styled with Tailwind CSS and custom Konkan hospitality tokens. A hero-contained procedural Three.js scene (`OrbitControls` with scroll-wheel zoom disabled so page scroll never traps) connects bidirectionally to full-width conversion sections below, backed by pure calculation utilities and a native `<dialog>` WhatsApp booking modal.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), Three.js (`three`, `@types/three`), `lucide-react`, Vitest + `@testing-library/react` + `@testing-library/jest-dom` + `jsdom`.

**Spec:** [2026-11-27-palm-bliss-resort-3d-demo-design.md](file:///e:/AntiGravity%20Projects/Resort%20Website%20Demo/docs/superpowers/specs/2026-11-27-palm-bliss-resort-3d-demo-design.md)

## Global Constraints

- Exact property identity: `PALM BLISS RESORT`, `Manohar Nagar, Navladeviwadi, Nadhavade, Maharashtra 416801`, Phone `094045 96257`, WhatsApp `https://wa.me/919404596257`, Tel `tel:+919404596257`.
- Verified metrics & policies: `4.5★` from `1,043` Google reviews (`74%` 5-star, `18%` 4-star); Check-in `11:00 AM`, Check-out `10:00 AM`.
- Verified amenities only: Free parking, Free Wi-Fi, Air conditioning, Multi-cuisine restaurant, Breakfast (extra charge), Kids' play area, Indoor games, Power backup, 24-hour front desk, Daily housekeeping, Local shuttle, Credit/Debit/Cash. Explicitly NO swimming pool, spa/hot tub, gym, or pets.
- Verified room tiers & OTA benchmarks: Deluxe Room (~180 sq. ft., Cleartrip ₹2,732 / Goibibo ₹2,781 / MakeMyTrip ₹3,111), Super Deluxe Room (~250 sq. ft., ~₹3,500), Premium Room (~250 sq. ft., ~₹4,000). Label OTA rates clearly as illustrative Google Hotels benchmarks.
- Self-contained assets: Procedural Three.js geometry/canvas textures only (no external `.glb` or stock image fetches that fail offline).
- Accessibility & Modern Web baseline: Native `<dialog>` (`showModal()`, no redundant `role="dialog"` / `aria-modal`, `overscroll-behavior: contain` on modal & `::backdrop`), single `<h1>`, explicit `<label for>`, `prefers-reduced-motion` support, `>= 4.5:1` text contrast, `>= 24x24px` (44px touch) interactive targets.

## Review Focus

1. **WebGL missing or software-context failure during pitch:** When `HTMLCanvasElement.getContext('webgl2')` / `WebGLRenderer` throws or returns null, the 3D hero must render a styled Konkan architectural fallback card with hotspot switching still functional rather than crashing the page.
2. **OrbitControls wheel-trapping page scroll:** Scrolling down over the 3D hero on desktop/trackpad must scroll the page normally (`enableZoom = false`), while explicit `+`, `-`, and `Reset` buttons control zoom.
3. **Owner ROI slider edge values (`0%` discount, high discount, `0` room-nights):** Calculations must never produce `NaN`, negative net savings without clear display, or divide-by-zero errors when sliders are dragged to extremes.
4. **WhatsApp inquiry with special characters or blank optional fields:** Names/dates with spaces, `&`, or empty check-in/guest fields must still build a valid URL-encoded `https://wa.me/919404596257?text=...` link and copy cleanly to clipboard even if `navigator.clipboard` is unavailable.
5. **Native `<dialog>` light-dismiss and scroll containment:** Opening the booking modal from any CTA must pre-fill the selected room or dining inquiry, allow backdrop click-outside dismissal (including Safari fallback), and reset `dialog.returnValue = ''` on close without locking `body` overflow.

---

### Task 1: Project Scaffolding, Styling Tokens & Verified Resort Data

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/index.css`
- Create: `src/test/setup.ts`
- Create: `src/data/resortData.ts`
- Test: `src/data/resortData.test.ts`

**Interfaces:**
- Produces in `src/data/resortData.ts`:
  - `RESORT_INFO`: `{ name, address, phoneDisplay, phoneHref, whatsappNumber, rating, reviewCount, checkIn, checkOut, amenities, excludedAmenities }`
  - `ROOM_TIERS`: `RoomTier[]` (`id`, `name`, `sizeSqFt`, `bedding`, `capacity`, `otaBenchmarks: { cleartrip?: number; goibibo?: number; makemytrip?: number }`, `referenceOtaRate: number`)
  - `CAMPUS_HOTSPOTS`: `CampusHotspot[]` (`id: 'overview' | 'rooms' | 'dining' | 'courtyard'`, `label`, `subtitle`, `description`, `cameraPos: [number, number, number]`, `targetPos: [number, number, number]`)
  - `DINING_HIGHLIGHTS`: `DiningHighlight[]`
  - `NEARBY_ATTRACTIONS`: `NearbyAttraction[]`
  - `GUEST_REVIEWS`: `GuestReview[]`

- [ ] **Step 1: Initialize git & scaffold Vite + React + TypeScript + Tailwind + Vitest dependencies**

Run:
```powershell
git init
npm init -y
npm install react react-dom three lucide-react
npm install -D vite @vitejs/plugin-react @tailwindcss/vite tailwindcss typescript @types/react @types/react-dom @types/three vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```
Expected: `package.json` and `node_modules` created cleanly with exit code 0.

- [ ] **Step 2: Configure `package.json` scripts, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/index.css`, and `src/test/setup.ts`**

Add `"type": "module"` and scripts `"dev": "vite"`, `"build": "tsc -b && vite build"`, `"test": "vitest run"` to `package.json`. Configure `@tailwindcss/vite` and Vitest `jsdom` environment + `src/test/setup.ts` (`@testing-library/jest-dom/vitest`) in `vite.config.ts`. Set Google Fonts (`Playfair Display` + `Plus Jakarta Sans`) in `index.html` with `<html lang="en">`. Define Konkan tokens (`#1B3B2B`, `#9E3B2B`, `#FAF7F2`, `#B47B2B`, `#1E293B`), `:focus-visible` outline (`3px solid #9E3B2B`, `outline-offset: 3px`), `.visually-hidden`, and `dialog:modal` / `dialog::backdrop` `overscroll-behavior: contain` rules in `src/index.css`.

- [ ] **Step 3: Write failing data integrity test in `src/data/resortData.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { CAMPUS_HOTSPOTS, RESORT_INFO, ROOM_TIERS } from './resortData';

describe('resortData', () => {
  it('preserves verified Palm Bliss Resort contact and review details', () => {
    expect(RESORT_INFO.name).toBe('PALM BLISS RESORT');
    expect(RESORT_INFO.phoneDisplay).toBe('094045 96257');
    expect(RESORT_INFO.whatsappNumber).toBe('919404596257');
    expect(RESORT_INFO.rating).toBe(4.5);
    expect(RESORT_INFO.reviewCount).toBe(1043);
    expect(RESORT_INFO.excludedAmenities).toContain('No swimming pool');
  });

  it('defines the three verified room tiers and four 3D campus hotspots', () => {
    expect(ROOM_TIERS.map((r) => r.id)).toEqual(['deluxe', 'super-deluxe', 'premium']);
    expect(CAMPUS_HOTSPOTS.map((h) => h.id)).toEqual(['overview', 'rooms', 'dining', 'courtyard']);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run src/data/resortData.test.ts`
Expected: FAIL because `src/data/resortData.ts` does not exist yet.

- [ ] **Step 5: Implement `src/data/resortData.ts` and verify test passes**

Create `src/data/resortData.ts` with all typed constants matching the verified spec data.
Run: `npx vitest run src/data/resortData.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json tsconfig.json vite.config.ts index.html src/index.css src/test/setup.ts src/data/resortData.ts src/data/resortData.test.ts
git commit -m "chore: scaffold project and add verified resort data"
```

---

### Task 2: Rate Comparison, Owner ROI & WhatsApp Inquiry Utilities

**Files:**
- Create: `src/utils/calculations.ts`
- Test: `src/utils/calculations.test.ts`

**Interfaces:**
- Consumes: `RoomTier`, `RESORT_INFO` from `src/data/resortData.ts`
- Produces in `src/utils/calculations.ts`:
  - `export interface StaySavingsResult { otaNightly: number; directNightly: number; otaTotal: number; directTotal: number; guestSavingsTotal: number; savingsPercent: number; }`
  - `export function calculateGuestStaySavings(otaNightly: number, nights: number, rooms: number, directDiscountPct: number): StaySavingsResult`
  - `export interface OwnerRoiResult { monthlyOtaGross: number; monthlyCommissionSaved: number; monthlyDirectRevenue: number; monthlyNetGain: number; annualNetGain: number; }`
  - `export function calculateOwnerRoi(monthlyRoomNights: number, avgOtaRate: number, otaCommissionPct: number, directDiscountPct: number): OwnerRoiResult`
  - `export type InquiryType = 'stay' | 'dining';`
  - `export interface BookingInquiryInput { type: InquiryType; guestName: string; guestPhone?: string; checkInDate?: string; checkOutDate?: string; diningDate?: string; diningTime?: string; guests: number; roomTierName?: string; notes?: string; estimatedDirectRate?: number; }`
  - `export function formatWhatsAppInquiryMessage(input: BookingInquiryInput): string`
  - `export function buildWhatsAppInquiryUrl(input: BookingInquiryInput): string`

- [ ] **Step 1: Write failing tests in `src/utils/calculations.test.ts`**

Test:
1. `calculateGuestStaySavings(2781, 2, 1, 14)` yields `directNightly === 2392`, `otaTotal === 5562`, `directTotal === 4784`, `guestSavingsTotal === 778`, `savingsPercent === 14`.
2. `calculateGuestStaySavings` clamps `nights >= 1`, `rooms >= 1`, and `directDiscountPct` between `0` and `50`.
3. `calculateOwnerRoi(25, 2781, 18, 14)`: verifies `monthlyOtaGross === 69525`, `monthlyCommissionSaved === 12515` (rounded), net gain vs. OTA payout (`otaGross * (1 - 0.18)` = `57011` vs `directRevenue = 25 * 2392 = 59800`, net gain `+2789` / month, `annualNetGain === 33468`) — AND verifies `0` room-nights returns all zeros without `NaN`.
4. `buildWhatsAppInquiryUrl` produces `https://wa.me/919404596257?text=...` properly encoding spaces, `&`, and handling empty `guestName` gracefully for both `'stay'` and `'dining'` types.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/utils/calculations.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `src/utils/calculations.ts`**

Implement `calculateGuestStaySavings`, `calculateOwnerRoi`, `formatWhatsAppInquiryMessage`, and `buildWhatsAppInquiryUrl` with clean clamping and integer rupee rounding (`Math.round`).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/utils/calculations.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```powershell
git add src/utils/calculations.ts src/utils/calculations.test.ts
git commit -m "feat: add direct-vs-OTA, owner ROI, and WhatsApp URL utilities"
```

---

### Task 3: Procedural 3D Konkan Campus Scene & Interactive Hero HUD

**Files:**
- Create: `src/three/campusTextures.ts`
- Create: `src/three/campusScene.ts`
- Create: `src/components/Resort3DHero.tsx`
- Test: `src/components/Resort3DHero.test.tsx`

**Interfaces:**
- Consumes: `CAMPUS_HOTSPOTS`, `CampusHotspot`, `HotspotId`, `RESORT_INFO` from `src/data/resortData.ts`
- Produces in `src/three/campusScene.ts`:
  - `export type LightingMode = 'day' | 'dusk';`
  - `export interface CampusSceneController { setHotspot: (id: HotspotId) => void; setLighting: (mode: LightingMode) => void; zoomBy: (deltaFactor: number) => void; resetView: () => void; dispose: () => void; }`
  - `export function createPalmBlissScene(container: HTMLElement, options: { initialHotspot: HotspotId; initialLighting: LightingMode; reducedMotion: boolean; onUserInteract?: () => void }): CampusSceneController | null` (returns `null` gracefully if WebGL context cannot be initialized).
- Produces in `src/components/Resort3DHero.tsx`:
  - `export interface Resort3DHeroProps { activeHotspot: HotspotId; onSelectHotspot: (id: HotspotId) => void; lightingMode: LightingMode; onToggleLighting: () => void; onOpenBooking: (type: 'stay' | 'dining', prefillRoom?: string) => void; }`
  - `export function Resort3DHero(props: Resort3DHeroProps): JSX.Element`

- [ ] **Step 1: Write failing component tests in `src/components/Resort3DHero.test.tsx`**

Mock `createPalmBlissScene` so JSDOM can test both:
1. WebGL available: clicking hotspot pills (`Deluxe & Super Deluxe Rooms`, `Multicuisine Gazebo`) calls `onSelectHotspot` and `controller.setHotspot`; clicking `+`, `-`, `Reset View` calls `zoomBy` / `resetView`; clicking Day/Dusk toggle calls `onToggleLighting`.
2. WebGL unavailable (`createPalmBlissScene` returns `null`): renders accessible architectural fallback view without throwing, keeping hotspot details and direct booking CTAs working.
3. Single `<h1>` landmark contains `PALM BLISS RESORT` and displays `4.5` rating + `1,043` reviews.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Resort3DHero.test.tsx`
Expected: FAIL (component not found).

- [ ] **Step 3: Implement `src/three/campusTextures.ts` and `src/three/campusScene.ts`**

- `campusTextures.ts`: Generate lightweight procedural `THREE.CanvasTexture` materials (Konkan red-laterite brick facade, green/terracotta roof shingle pattern, paved courtyard stone tiles).
- `campusScene.ts`:
  - Check `WebGLRenderer` creation inside `try/catch`; return `null` if unavailable.
  - Build main two-story guest wing + angled secondary wing: laterite walls, two tiers of crisp white balcony railings/pillars, glowing window panes (emissive intensity driven by `dusk` mode), hipped dark-green roofs, exterior staircase.
  - Build foreground open-air dining gazebo: red sloped roof, timber posts, warm glowing hanging lanterns, red dining chairs & tables.
  - Build courtyard lawn, paved brick walkways, colorful kids' slide & swing set, parking bay with stylized car, procedural swaying coconut palm trees, `THREE.FogExp2`, and distant green Sahyadri hill meshes.
  - Configure `OrbitControls` with `enableDamping = true`, `enableZoom = false` (never trap wheel scroll), `minPolarAngle = 0.2`, `maxPolarAngle = Math.PI / 2 - 0.08`, `minDistance = 12`, `maxDistance = 42`.
  - Smoothly `lerp` camera position & controls target on hotspot change (unless `reducedMotion` is true, where it snaps cleanly), cancel auto-glide immediately when the user starts dragging (`controls.addEventListener('start', ...)`), support `ResizeObserver`, and dispose geometries/materials/renderer cleanly on `dispose()`.

- [ ] **Step 4: Implement `src/components/Resort3DHero.tsx` and run tests**

Render the full-bleed `~88vh` desktop / `~68vh` mobile 3D viewport with floating glass HUD:
- Top-left: Trust badge (`4.5 ★ · 1,043 Google Reviews · Nadhavade, Konkan`), `<h1>` headline, and brief subtitle.
- Top-right: Day / Golden-Hour Dusk toggle + `+` / `-` / `Reset View` zoom controls (`aria-label`ed, `>= 36px` targets).
- Bottom bar: 4 interactive hotspot tabs + active hotspot quick summary & contextual CTA (`Check Direct Room Rates` / `Explore Dining Menu` / `Book via WhatsApp`).
- WebGL fallback state: Stylized Konkan resort illustration card when `sceneController === null`.

Run: `npx vitest run src/components/Resort3DHero.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```powershell
git add src/three/campusTextures.ts src/three/campusScene.ts src/components/Resort3DHero.tsx src/components/Resort3DHero.test.tsx
git commit -m "feat: add procedural 3D Palm Bliss campus diorama and hero HUD"
```

---

### Task 4: Sticky Navbar & Interactive "Save vs. OTA" + Owner ROI Section

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/RateComparisonSection.tsx`
- Test: `src/components/RateComparisonSection.test.tsx`

**Interfaces:**
- Consumes: `ROOM_TIERS`, `RESORT_INFO` from `src/data/resortData.ts`; `calculateGuestStaySavings`, `calculateOwnerRoi` from `src/utils/calculations.ts`; `LightingMode` from `src/three/campusScene.ts`
- Produces in `src/components/Navbar.tsx`:
  - `export function Navbar(props: { lightingMode: LightingMode; onToggleLighting: () => void; onOpenBooking: (type: 'stay' | 'dining') => void }): JSX.Element`
- Produces in `src/components/RateComparisonSection.tsx`:
  - `export function RateComparisonSection(props: { onLocateRoomsIn3D: () => void; onBookDirectStay: (roomTierName: string, nights: number, directNightlyRate: number) => void }): JSX.Element`

- [ ] **Step 1: Write failing tests in `src/components/RateComparisonSection.test.tsx`**

Test:
1. Default Guest View renders all three verified tiers (`Deluxe Room`, `Super Deluxe Room`, `Premium Room`), displays illustrative Goibibo/MakeMyTrip/Cleartrip comparison for Deluxe, and updates total savings when nights or room tier changes.
2. Switching to **Owner ROI View** displays monthly direct room-nights slider, OTA commission % slider, editable direct discount %, and updates monthly & annual commission savings cleanly (including `0` room-nights edge case without `NaN`).
3. Clicking *"Book This Direct Rate on WhatsApp"* invokes `onBookDirectStay` with the currently selected tier, nights, and calculated direct nightly rate; clicking *"Locate Rooms in 3D"* invokes `onLocateRoomsIn3D`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/RateComparisonSection.test.tsx`
Expected: FAIL (component not found).

- [ ] **Step 3: Implement `src/components/Navbar.tsx` and `src/components/RateComparisonSection.tsx`**

- `Navbar.tsx`: Include skip-to-content link `<a href="#main-content" className="visually-hidden">Skip to content</a>`, `<nav aria-label="Primary">` jump links (`#hero-3d`, `#save-ota`, `#dining`, `#konkan-trails`), Day/Dusk pill (`aria-pressed`), `tel:+919404596257` Call link, and `WhatsApp Book` button.
- `RateComparisonSection.tsx`: Segmented toggle (`Guest View` vs `Owner ROI View` with `aria-pressed`), room tier buttons, explicit `<label for>` on sliders/inputs, transparent disclaimer noting OTA rates are illustrative Google Hotels benchmarks, and high-contrast comparison cards.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/RateComparisonSection.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```powershell
git add src/components/Navbar.tsx src/components/RateComparisonSection.tsx src/components/RateComparisonSection.test.tsx
git commit -m "feat: add sticky navbar and interactive Save vs OTA + Owner ROI section"
```

---

### Task 5: Dining Pavilion, Konkan Trails & Accessible Guest Voices Carousel

**Files:**
- Create: `src/components/DiningShowcase.tsx`
- Create: `src/components/KonkanAndAmenities.tsx`
- Create: `src/components/GuestVoicesCarousel.tsx`
- Test: `src/components/GuestVoicesCarousel.test.tsx`

**Interfaces:**
- Consumes: `DINING_HIGHLIGHTS`, `NEARBY_ATTRACTIONS`, `GUEST_REVIEWS`, `RESORT_INFO` from `src/data/resortData.ts`
- Produces:
  - `export function DiningShowcase(props: { onLocateGazeboIn3D: () => void; onReserveTable: () => void }): JSX.Element`
  - `export function KonkanAndAmenities(props: { onLocateCourtyardIn3D: () => void }): JSX.Element`
  - `export function GuestVoicesCarousel(): JSX.Element`

- [ ] **Step 1: Write failing accessibility & interaction tests in `src/components/GuestVoicesCarousel.test.tsx`**

Test:
1. Renders `aria-roledescription="carousel"` region, each slide with `role="group"`, `aria-roledescription="slide"`, and `aria-label="X of Y"`.
2. Renders Previous/Next `<button>` controls and marker `<button>`s with `aria-current="true"` on the active slide.
3. Clicking Next/marker updates `aria-current` and announces the slide change in the visually hidden `aria-live="polite"` status region (mocking `scrollBy` / `scrollTo` in JSDOM cleanly).

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/GuestVoicesCarousel.test.tsx`
Expected: FAIL (component not found).

- [ ] **Step 3: Implement `DiningShowcase.tsx`, `KonkanAndAmenities.tsx`, and `GuestVoicesCarousel.tsx`**

- `DiningShowcase.tsx`: Spotlights 169+ dining reviews badge, 4 signature dishes (*Surmai Tandoori*, *Kashmiri & Peshawari Naan*, *Konkan Coastal Thali*, *South Indian Morning Breakfast*), *"Locate Gazebo in 3D"* button, and *"Reserve a Family Table on WhatsApp"* CTA.
- `KonkanAndAmenities.tsx`: Honest verified amenities grid (11:00 AM Check-in / 10:00 AM Check-out, Free Parking, Free Wi-Fi, AC Rooms, 24-Hr Front Desk, Kids Play Area, Indoor Games, Power Backup, Cards & Cash; plus clear transparency note: peaceful inland greenery without pool/spa/pets) and Nearby Konkan Trails cards (*Sherpe-Napne Waterfall 17 min*, *Salva Mountain 23 min*, *Vaghotan River View Point 23 min*, *Karul Ghat 47 min*) + *"Locate Courtyard in 3D"* button.
- `GuestVoicesCarousel.tsx`: Rating summary bar (4.5★ / 1,043 reviews — 74% 5★, 18% 4★) + horizontal CSS scroll-snap carousel (`scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, `touch-action: manipulation`, looping prev/next buttons, marker buttons with non-color-only active indicator, `scrollend` + debounced `scroll` fallback, polite live region).

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/GuestVoicesCarousel.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```powershell
git add src/components/DiningShowcase.tsx src/components/KonkanAndAmenities.tsx src/components/GuestVoicesCarousel.tsx src/components/GuestVoicesCarousel.test.tsx
git commit -m "feat: add dining pavilion, Konkan trails/amenities, and accessible guest voices carousel"
```

---

### Task 6: Native `<dialog>` WhatsApp Booking Widget, Footer & Full App Integration

**Files:**
- Create: `src/components/BookingDialog.tsx`
- Create: `src/components/FooterAndFloatingBar.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Test: `src/components/BookingDialog.test.tsx`

**Interfaces:**
- Consumes: `RESORT_INFO`, `ROOM_TIERS`, `HotspotId` from `src/data/resortData.ts`; `buildWhatsAppInquiryUrl`, `formatWhatsAppInquiryMessage`, `InquiryType` from `src/utils/calculations.ts`; all section components and `LightingMode`
- Produces in `src/components/BookingDialog.tsx`:
  - `export interface BookingPrefill { type: InquiryType; roomTierName?: string; nights?: number; estimatedDirectRate?: number; }`
  - `export function BookingDialog(props: { open: boolean; prefill: BookingPrefill; onClose: () => void }): JSX.Element`
- Produces in `src/components/FooterAndFloatingBar.tsx`:
  - `export function FooterAndFloatingBar(props: { showBackTo3D: boolean; onBackTo3D: () => void; onOpenBooking: (type: InquiryType) => void }): JSX.Element`

- [ ] **Step 1: Write failing tests in `src/components/BookingDialog.test.tsx`**

Polyfill `HTMLDialogElement.prototype.showModal` / `close` in the test file for JSDOM, then test:
1. Opening dialog calls `showModal()`, uses native `<dialog>` without redundant `role="dialog"` or `aria-modal`, and labels via `aria-labelledby`.
2. Switching between *Room Stay* and *Restaurant Table / Group* tabs updates form fields and live WhatsApp message preview immediately, updating the `https://wa.me/919404596257?text=...` anchor `href` and `tel:+919404596257` Call link.
3. Clicking *"Copy Inquiry Text"* copies formatted inquiry text and announces `"Inquiry copied to clipboard"` in a polite status region; closing resets `returnValue` and invokes `onClose`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/BookingDialog.test.tsx`
Expected: FAIL (component not found).

- [ ] **Step 3: Implement `BookingDialog.tsx`, `FooterAndFloatingBar.tsx`, `App.tsx`, and `main.tsx`**

- `BookingDialog.tsx`: Native `<dialog closedby="any">` with pointerdown/pointerup outside-dismiss fallback when `!('closedBy' in HTMLDialogElement.prototype)`, resets `dialog.returnValue = ''` on `close`, explicit `<label for>` + `autocomplete` attributes, live WhatsApp preview, `Send on WhatsApp`, `Call 094045 96257`, and `Copy Inquiry Text` (with `textarea` fallback if `navigator.clipboard` is unavailable).
- `FooterAndFloatingBar.tsx`: Full address (`Manohar Nagar, Navladeviwadi, Nadhavade, Maharashtra 416801`), check-in/out times, Google Maps directions link, `094045 96257` direct CTA, floating `"3D Campus"` jump button (shown after scrolling past hero), and sticky mobile bottom action bar (`Call` + `WhatsApp Book`).
- `App.tsx`: Connects `lightingMode`, `activeHotspot`, `bookingOpen`, `bookingPrefill`, `IntersectionObserver` on the hero for `showBackTo3D`, and bidirectional `"Locate in 3D"` scroll + camera glide.

- [ ] **Step 4: Run full test suite and production TypeScript + Vite build**

Run: `npx vitest run && npm run build`
Expected: All tests PASS and `tsc -b && vite build` succeeds cleanly with zero TypeScript or bundler errors.

- [ ] **Step 5: Commit**

```powershell
git add src/components/BookingDialog.tsx src/components/BookingDialog.test.tsx src/components/FooterAndFloatingBar.tsx src/App.tsx src/main.tsx
git commit -m "feat: add native booking dialog, footer, floating controls, and wire App"
```

---

### Task 7: Live Browser Visual & Functional Verification

**Files:**
- No code changes unless verification uncovers layout, WebGL, console, or responsive defects.

- [ ] **Step 1: Start local preview server and inspect live in headless/webview browser**

Run `npm run preview -- --port 4173` (or `npm run dev -- --port 5173`) and verify on desktop (`1440px`) and mobile (`375px`):
1. Zero console errors or uncaught exceptions.
2. 3D Palm Bliss campus renders both Day and Golden-Hour Dusk states cleanly, hotspot pills glide the camera, and page scrolling over the 3D canvas works smoothly without wheel trapping.
3. Save vs. OTA & Owner ROI toggle computes live changes cleanly; Dining, Konkan Trails, and Guest Voices carousel operate smoothly; Booking `<dialog>` opens, updates WhatsApp URL, and dismisses cleanly on `Esc`/backdrop click.

- [ ] **Step 2: Fix any observed visual/interaction issue, re-run `npx vitest run && npm run build`, and commit final polish**

---

## Self-Review Checklist (Completed)

- **Spec coverage:** Every section in the spec (3D Konkan campus + Day/Dusk + 4 hotspots + zoom/scroll isolation, Save vs. OTA + Owner ROI view with 3 verified room tiers, Multicuisine Dining Pavilion, Amenities + Nearby Konkan Trails, Guest Voices carousel, Native `<dialog>` WhatsApp/Call booking widget, Floating 3D return pill & mobile CTA bar) maps directly to Tasks 1–6.
- **Type consistency:** `HotspotId`, `LightingMode`, `RoomTier`, `BookingPrefill`, `InquiryType`, `calculateGuestStaySavings`, `calculateOwnerRoi`, `buildWhatsAppInquiryUrl`, `createPalmBlissScene` share consistent names and signatures across all tasks.
- **Review Focus coverage:** All 5 failure modes have explicit assertions/behaviors in Tasks 2, 3, 4, and 6.
