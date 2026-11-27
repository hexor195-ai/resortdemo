import { ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { MUNCHING_BITES_INFO, RESORT_INFO } from '../data/resortData';

export interface FooterAndFloatingBarProps {
  onOpenBooking: () => void;
}

export function FooterAndFloatingBar({ onOpenBooking }: FooterAndFloatingBarProps) {
  return (
    <>
      <footer className="border-t border-[#123724]/15 bg-[#0f2b1c] pb-24 pt-14 text-white lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src={RESORT_INFO.logoSrc}
                alt="Palm Bliss Resort logo"
                className="h-14 w-14 rounded-2xl border border-[#6bae3b]/60 object-cover shadow"
              />
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  {RESORT_INFO.displayName}
                </h2>
                <p className="text-xs font-medium text-[#a3e66f]">{RESORT_INFO.tagline}</p>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 text-sm text-white/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#a3e66f]" aria-hidden="true" />
              <span>
                {RESORT_INFO.address}
                <br />
                {RESORT_INFO.regionLine}
              </span>
            </p>
            <p className="mt-3 text-xs text-white/70">
              Check-in: {RESORT_INFO.checkIn} · Check-out: {RESORT_INFO.checkOut} · Credit/Debit
              Cards &amp; Cash Accepted
            </p>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#a3e66f]">
              Front Desk &amp; Directions
            </h3>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={RESORT_INFO.phoneHref}
                className="inline-flex min-h-10 items-center gap-2 text-base font-bold text-white hover:text-[#a3e66f]"
              >
                <Phone className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
                <span>{RESORT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={RESORT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                <span>Open Resort on Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={MUNCHING_BITES_INFO.justdialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                <span>Munching Bites Dining Profile ({MUNCHING_BITES_INFO.hours})</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 lg:col-span-3">
            <div>
              <h3 className="text-base font-bold text-white">Plan Your Stay</h3>
              <p className="mt-1 text-xs text-white/75">
                Message Palm Bliss Resort directly on WhatsApp or call the front desk for room
                availability.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#6bae3b] px-4 py-2.5 text-sm font-bold text-[#0e2618] transition hover:bg-[#7cc449]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Book Room via WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-white/60 sm:px-6">
          © {new Date().getFullYear()} {RESORT_INFO.displayName} · Nadhavade, Sindhudurg,
          Maharashtra
        </div>
      </footer>

      {/* Mobile Sticky Room Booking & Call Bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-[#123724]/15 bg-[#faf9f5]/95 p-3 backdrop-blur-md lg:hidden">
        <a
          href={RESORT_INFO.phoneHref}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#123724]/30 bg-white px-3 py-2 text-sm font-bold text-[#123724]"
        >
          <Phone className="h-4 w-4 text-[#9e3b2b]" aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <button
          type="button"
          onClick={onOpenBooking}
          className="inline-flex min-h-11 flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#123724] px-3 py-2 text-sm font-bold text-white shadow"
        >
          <MessageCircle className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
          <span>Book Room</span>
        </button>
      </div>
    </>
  );
}
