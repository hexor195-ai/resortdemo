import { Box, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { RESORT_INFO } from '../data/resortData';
import type { InquiryType } from '../utils/calculations';

export interface FooterAndFloatingBarProps {
  showBackTo3D: boolean;
  onBackTo3D: () => void;
  onOpenBooking: (type: InquiryType) => void;
}

export function FooterAndFloatingBar({
  showBackTo3D,
  onBackTo3D,
  onOpenBooking,
}: FooterAndFloatingBarProps) {
  return (
    <>
      <footer className="border-t border-[#1b3b2b]/15 bg-[#11261b] pb-24 pt-14 text-white lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Official Website Demo Proposal
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              {RESORT_INFO.displayName}
            </h2>
            <p className="mt-2 flex items-start gap-2 text-sm text-white/80">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
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
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Direct Front Desk
            </h3>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href={RESORT_INFO.phoneHref}
                className="inline-flex min-h-10 items-center gap-2 text-base font-bold text-white hover:text-amber-300"
              >
                <Phone className="h-4 w-4 text-amber-300" aria-hidden="true" />
                <span>{RESORT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={RESORT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                <span>Open Directions on Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 lg:col-span-3">
            <div>
              <h3 className="text-base font-bold text-white">Ready to Book or Dine?</h3>
              <p className="mt-1 text-xs text-white/75">
                Message the resort directly on WhatsApp with zero third-party fees.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('stay')}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#9e3b2b] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#7d2c1f]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Book Direct via WhatsApp</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Floating "Back to 3D Campus" jump pill (desktop + tablet) */}
      {showBackTo3D && (
        <button
          type="button"
          onClick={onBackTo3D}
          className="fixed bottom-20 right-4 z-30 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-white/25 bg-[#1b3b2b] px-4 py-2.5 text-xs font-bold text-white shadow-xl transition hover:bg-[#11261b] lg:bottom-6 lg:right-6"
        >
          <Box className="h-4 w-4 text-amber-300" aria-hidden="true" />
          <span>3D Campus View</span>
        </button>
      )}

      {/* Mobile Sticky Direct Booking & Call Bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-[#1b3b2b]/15 bg-[#faf7f2]/95 p-3 backdrop-blur-md lg:hidden">
        <a
          href={RESORT_INFO.phoneHref}
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#1b3b2b]/30 bg-white px-3 py-2 text-sm font-bold text-[#1b3b2b]"
        >
          <Phone className="h-4 w-4 text-[#9e3b2b]" aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <button
          type="button"
          onClick={() => onOpenBooking('stay')}
          className="inline-flex min-h-11 flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1b3b2b] px-3 py-2 text-sm font-bold text-white shadow"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span>WhatsApp Book</span>
        </button>
      </div>
    </>
  );
}
