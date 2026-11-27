import { useState } from 'react';
import {
  BadgeIndianRupee,
  CheckCircle2,
  Compass,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { ROOM_TIERS, type RoomTier } from '../data/resortData';
import { calculateGuestStaySavings, calculateOwnerRoi } from '../utils/calculations';

export interface RateComparisonSectionProps {
  onLocateRoomsIn3D: () => void;
  onBookDirectStay: (roomTierName: string, nights: number, directNightlyRate: number) => void;
}

export function RateComparisonSection({
  onLocateRoomsIn3D,
  onBookDirectStay,
}: RateComparisonSectionProps) {
  const [viewMode, setViewMode] = useState<'guest' | 'owner'>('guest');
  const [selectedTierId, setSelectedTierId] = useState<RoomTier['id']>('deluxe');
  const [nights, setNights] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [directDiscountPct, setDirectDiscountPct] = useState(14);
  const [monthlyRoomNights, setMonthlyRoomNights] = useState(25);
  const [otaCommissionPct, setOtaCommissionPct] = useState(18);

  const selectedTier = ROOM_TIERS.find((t) => t.id === selectedTierId) ?? ROOM_TIERS[0];
  const staySavings = calculateGuestStaySavings(
    selectedTier.referenceOtaRate,
    nights,
    rooms,
    directDiscountPct
  );
  const ownerRoi = calculateOwnerRoi(
    monthlyRoomNights,
    selectedTier.referenceOtaRate,
    otaCommissionPct,
    directDiscountPct
  );

  const formatINR = (amount: number) =>
    `${amount < 0 ? '-' : ''}₹${Math.abs(amount).toLocaleString('en-IN')}`;

  return (
    <section id="save-ota" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#9e3b2b]">
            Zero-Commission Direct Booking Engine
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1b3b2b] sm:text-4xl">
            Save vs. OTA Rates — Built for Guests &amp; Owner ROI
          </h2>
          <p className="mt-2.5 text-base text-[#475569]">
            Guests skip third-party markups while Palm Bliss Resort keeps revenue instead of paying
            15–22% OTA commissions on every booking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onLocateRoomsIn3D}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#1b3b2b]/25 bg-white px-4 py-2 text-sm font-semibold text-[#1b3b2b] transition hover:bg-[#f2ece1]"
          >
            <Compass className="h-4 w-4 text-[#9e3b2b]" aria-hidden="true" />
            <span>Locate Rooms in 3D</span>
          </button>

          <div
            role="group"
            aria-label="Comparison perspective"
            className="inline-flex rounded-xl border border-[#1b3b2b]/20 bg-[#f2ece1] p-1"
          >
            <button
              type="button"
              aria-pressed={viewMode === 'guest'}
              onClick={() => setViewMode('guest')}
              className={`min-h-10 cursor-pointer rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                viewMode === 'guest'
                  ? 'bg-[#1b3b2b] text-white shadow-sm'
                  : 'text-[#1e293b] hover:bg-white/70'
              }`}
            >
              Guest View
            </button>
            <button
              type="button"
              aria-pressed={viewMode === 'owner'}
              onClick={() => setViewMode('owner')}
              className={`inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                viewMode === 'owner'
                  ? 'bg-[#9e3b2b] text-white shadow-sm'
                  : 'text-[#1e293b] hover:bg-white/70'
              }`}
            >
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span>Owner ROI View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Room Tier Selector */}
      <div
        role="group"
        aria-label="Select room category"
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        {ROOM_TIERS.map((tier) => {
          const isSelected = tier.id === selectedTierId;
          const directPreview = calculateGuestStaySavings(
            tier.referenceOtaRate,
            1,
            1,
            directDiscountPct
          ).directNightly;
          return (
            <button
              key={tier.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedTierId(tier.id)}
              className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left transition ${
                isSelected
                  ? 'border-[#9e3b2b] bg-white shadow-lg ring-2 ring-[#9e3b2b]/20'
                  : 'border-[#1b3b2b]/15 bg-white/80 hover:border-[#1b3b2b]/35 hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-[#1b3b2b]">{tier.name}</h3>
                  <span className="shrink-0 rounded-full bg-[#f2ece1] px-2.5 py-1 text-xs font-semibold text-[#9e3b2b]">
                    {tier.sizeSqFt} sq.ft.
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-[#475569]">
                  {tier.bedding} · {tier.capacity} · {tier.view}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {tier.highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-[#faf7f2] px-2 py-0.5 text-xs text-[#334155]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-[#1b3b2b]/10 pt-3">
                <div>
                  <span className="block text-xs text-[#64748b] line-through">
                    OTA ~{formatINR(tier.referenceOtaRate)}
                  </span>
                  <span className="text-xl font-bold text-[#1b3b2b]">
                    {formatINR(directPreview)}
                    <span className="text-xs font-normal text-[#475569]">/night direct</span>
                  </span>
                </div>
                <span className="text-xs font-bold text-[#1b3b2b]">
                  {isSelected ? 'Selected' : 'Select'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Calculator Panel */}
      {viewMode === 'guest' ? (
        <div className="mt-8 grid gap-6 rounded-3xl border border-[#1b3b2b]/15 bg-white p-6 shadow-md lg:grid-cols-12 lg:p-8">
          {/* Controls */}
          <div className="flex flex-col justify-between gap-5 lg:col-span-5">
            <div>
              <h3 className="text-2xl font-bold text-[#1b3b2b]">Direct Stay Estimator</h3>
              <p className="mt-1 text-sm text-[#475569]">
                Compare {selectedTier.name} direct pricing against major travel portals.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-semibold text-[#1e293b]">
                    <label htmlFor="guest-nights">Number of Nights</label>
                    <span>
                      {nights} {nights === 1 ? 'night' : 'nights'}
                    </span>
                  </div>
                  <input
                    id="guest-nights"
                    type="range"
                    min={1}
                    max={7}
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#1b3b2b]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-[#1e293b]">
                    <label htmlFor="guest-rooms">Rooms Needed</label>
                    <span>
                      {rooms} {rooms === 1 ? 'room' : 'rooms'}
                    </span>
                  </div>
                  <input
                    id="guest-rooms"
                    type="range"
                    min={1}
                    max={4}
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer accent-[#1b3b2b]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#faf7f2] p-4 text-xs leading-relaxed text-[#475569]">
              OTA prices shown are illustrative Google Hotels snapshot benchmarks (e.g., Cleartrip
              ₹2,732, Goibibo ₹2,781, MakeMyTrip ₹3,111 for Deluxe Garden View). Final direct
              tariff is confirmed instantly by the front desk on WhatsApp.
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  Third-Party OTA Portals
                </span>
                <p className="mt-4 text-3xl font-bold text-slate-700 line-through">
                  {formatINR(staySavings.otaTotal)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatINR(staySavings.otaNightly)}/night × {nights} night(s) × {rooms} room(s)
                </p>

                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {selectedTier.otaBenchmarks.cleartrip && (
                    <li className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Cleartrip snapshot</span>
                      <span className="font-semibold">
                        {formatINR(selectedTier.otaBenchmarks.cleartrip)}/night
                      </span>
                    </li>
                  )}
                  {selectedTier.otaBenchmarks.goibibo && (
                    <li className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>Goibibo snapshot</span>
                      <span className="font-semibold">
                        {formatINR(selectedTier.otaBenchmarks.goibibo)}/night
                      </span>
                    </li>
                  )}
                  {selectedTier.otaBenchmarks.makemytrip && (
                    <li className="flex justify-between border-b border-slate-200 pb-1.5">
                      <span>MakeMyTrip snapshot</span>
                      <span className="font-semibold">
                        {formatINR(selectedTier.otaBenchmarks.makemytrip)}/night
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Includes portal service markups and limited room-wing choice.
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border-2 border-[#1b3b2b] bg-[#1b3b2b] p-5 text-white shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-200">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Direct Website Rate
                  </span>
                  <span className="rounded-full bg-[#9e3b2b] px-2.5 py-1 text-xs font-bold text-white">
                    Save {staySavings.savingsPercent}%
                  </span>
                </div>

                <p className="mt-4 text-3xl font-bold text-white">
                  {formatINR(staySavings.directTotal)}
                </p>
                <p className="mt-1 text-xs text-white/80">
                  {formatINR(staySavings.directNightly)}/night · You save{' '}
                  <strong className="text-amber-300">
                    {formatINR(staySavings.guestSavingsTotal)}
                  </strong>
                </p>

                <ul className="mt-5 space-y-2 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <span>Zero OTA convenience fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <span>Priority garden-view wing request</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <span>Direct front-desk confirmation</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() =>
                  onBookDirectStay(selectedTier.name, nights, staySavings.directNightly)
                }
                className="mt-6 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9e3b2b] px-4 py-3 text-sm font-bold text-white shadow transition hover:bg-[#7d2c1f]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Book This Direct Rate on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 rounded-3xl border border-[#9e3b2b]/25 bg-white p-6 shadow-md lg:grid-cols-12 lg:p-8">
          <div className="space-y-5 lg:col-span-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9e3b2b]/10 px-3 py-1 text-xs font-bold text-[#9e3b2b]">
                <BadgeIndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
                Live Pitch Calculator for Resort Owner
              </span>
              <h3 className="mt-2 text-2xl font-bold text-[#1b3b2b]">
                How Your Official Website Pays for Itself
              </h3>
              <p className="mt-1 text-sm text-[#475569]">
                Adjust the sliders with the owner to model shifting Google searchers from OTAs to
                direct bookings on {selectedTier.name}.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-[#1e293b]">
                <label htmlFor="roi-nights">Monthly Direct Room-Nights</label>
                <span>{monthlyRoomNights} nights/mo</span>
              </div>
              <input
                id="roi-nights"
                type="range"
                min={0}
                max={80}
                value={monthlyRoomNights}
                onChange={(e) => setMonthlyRoomNights(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-[#9e3b2b]"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-[#1e293b]">
                <label htmlFor="roi-commission">Typical OTA Commission %</label>
                <span>{otaCommissionPct}%</span>
              </div>
              <input
                id="roi-commission"
                type="range"
                min={10}
                max={30}
                value={otaCommissionPct}
                onChange={(e) => setOtaCommissionPct(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-[#9e3b2b]"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-[#1e293b]">
                <label htmlFor="roi-discount">Direct Website Guest Discount %</label>
                <span>{directDiscountPct}%</span>
              </div>
              <input
                id="roi-discount"
                type="range"
                min={0}
                max={25}
                value={directDiscountPct}
                onChange={(e) => setDirectDiscountPct(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-[#1b3b2b]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            <div className="rounded-2xl border border-[#1b3b2b]/15 bg-[#faf7f2] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Monthly OTA Commission Saved
              </p>
              <p className="mt-2 text-3xl font-bold text-[#9e3b2b]">
                {formatINR(ownerRoi.monthlyCommissionSaved)}
              </p>
              <p className="mt-1 text-xs text-[#475569]">
                Gross OTA volume: {formatINR(ownerRoi.monthlyOtaGross)}/mo at {otaCommissionPct}%
                fee
              </p>
            </div>

            <div className="rounded-2xl border border-[#1b3b2b]/15 bg-[#faf7f2] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                Direct Website Revenue Kept
              </p>
              <p className="mt-2 text-3xl font-bold text-[#1b3b2b]">
                {formatINR(ownerRoi.monthlyDirectRevenue)}
              </p>
              <p className="mt-1 text-xs text-[#475569]">
                Even after giving guests {directDiscountPct}% off OTA rates
              </p>
            </div>

            <div
              className={`rounded-2xl p-5 text-white sm:col-span-2 ${
                ownerRoi.monthlyNetGain < 0 ? 'bg-[#7d2c1f]' : 'bg-[#1b3b2b]'
              }`}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    {ownerRoi.monthlyNetGain < 0
                      ? 'Net Revenue Impact vs. OTA Payouts — Direct discount exceeds OTA commission'
                      : 'Extra Profit Retained vs. OTA Payouts'}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-white">
                    {ownerRoi.monthlyNetGain > 0 ? '+' : ''}
                    {formatINR(ownerRoi.monthlyNetGain)}
                    <span className="text-sm font-normal text-white/80"> / month</span>
                  </p>
                  <p className="mt-1 text-sm text-white/85">
                    {ownerRoi.monthlyNetGain < 0
                      ? 'Annualized net difference:'
                      : 'Annualized net gain:'}{' '}
                    <strong className="text-amber-300">
                      {formatINR(ownerRoi.annualNetGain)}/year
                    </strong>{' '}
                    — plus direct restaurant &amp; family event inquiries from Google.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onBookDirectStay(selectedTier.name, nights, staySavings.directNightly)
                  }
                  className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9e3b2b] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#7d2c1f]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Preview Booking Flow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
