import {
  Baby,
  Car,
  Check,
  Clock,
  Info,
  MapPin,
  ShieldCheck,
  Wifi,
} from 'lucide-react';
import { NEARBY_ATTRACTIONS, RESORT_INFO } from '../data/resortData';

export function KonkanAndAmenities() {
  return (
    <section
      id="konkan-trails"
      className="border-t border-[#123724]/10 bg-[#f1f5ec]/60 py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
        {/* Verified Property Amenities */}
        <div className="rounded-3xl border border-[#123724]/15 bg-white p-6 shadow-sm lg:col-span-6 lg:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9e3b2b]">
              Honest Hospitality Details
            </p>
            <h2 className="type-section mt-1.5 text-[#123724]">
              Property Amenities &amp; <em className="font-medium italic">Timings</em>
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-[#123724] p-4 text-white">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#a3e66f]" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/75">Check-in</p>
                <p className="text-base font-bold">{RESORT_INFO.checkIn}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-white/15 pl-4">
              <Clock className="h-5 w-5 text-[#a3e66f]" aria-hidden="true" />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/75">Check-out</p>
                <p className="text-base font-bold">{RESORT_INFO.checkOut}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5 text-center text-xs font-semibold text-[#123724]">
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-[#faf9f5] p-3">
              <Car className="h-5 w-5 text-[#9e3b2b]" aria-hidden="true" />
              <span>Free Parking</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-[#faf9f5] p-3">
              <Wifi className="h-5 w-5 text-[#9e3b2b]" aria-hidden="true" />
              <span>Free Wi-Fi</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-[#faf9f5] p-3">
              <Baby className="h-5 w-5 text-[#9e3b2b]" aria-hidden="true" />
              <span>Kids Play Area</span>
            </div>
          </div>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {RESORT_INFO.amenities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#334155]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#6bae3b]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-amber-900/15 bg-[#faf9f5] p-3.5 text-xs text-[#475569]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#8a5a18]" aria-hidden="true" />
            <p>
              <strong>Property transparency:</strong> Palm Bliss Resort is a peaceful garden &amp;
              dining retreat ({RESORT_INFO.excludedAmenities.join(' · ')}).
            </p>
          </div>
        </div>

        {/* Nearby Konkan Landmarks */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9e3b2b]">
              Explore Sindhudurg &amp; Konkan
            </p>
            <h2 className="type-section mt-1.5 text-[#123724]">
              Waterfalls, Hills &amp; <em className="font-medium italic">Ghat Drives</em>
            </h2>
            <p className="mt-2 max-w-[58ch] text-base leading-relaxed text-[#475569]">
              Ideally positioned off the Talere–Vaibhavwadi Road in Nadhavade for waterfall day
              trips, ridge viewpoints, and tranquil countryside stays.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {NEARBY_ATTRACTIONS.map((spot) => (
                <article
                  key={spot.id}
                  className="rounded-2xl border border-[#123724]/12 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#123724]/10 px-2.5 py-1 text-xs font-bold text-[#123724]">
                      <MapPin className="h-3.5 w-3.5 text-[#9e3b2b]" aria-hidden="true" />
                      {spot.driveTime}
                    </span>
                    <span className="text-xs font-semibold text-[#8a5a18]">{spot.vibe}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-[#123724]">{spot.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                    {spot.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#123724]/15 bg-white p-4 text-sm text-[#1e293b] shadow-sm">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#6bae3b]" aria-hidden="true" />
            <span>
              <strong>Easy Highway Access:</strong> Ample free private parking on-site for families,
              road-trippers, and tourist groups.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
