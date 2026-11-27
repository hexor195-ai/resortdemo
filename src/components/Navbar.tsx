import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { RESORT_INFO } from '../data/resortData';

export interface NavbarProps {
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  { href: '#hero-showcase', label: 'Resort' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#munching-bites', label: 'Munching Bites' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#konkan-trails', label: 'Konkan & Amenities' },
  { href: '#guest-voices', label: 'Reviews' },
];

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#123724]/12 bg-[#faf9f5]/95 backdrop-blur-md">
      <a
        href="#main-content"
        className="visually-hidden fixed left-3 top-3 z-50 rounded-lg bg-[#123724] px-4 py-2 text-sm font-semibold text-white shadow-lg"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <a href="#hero-showcase" className="flex min-w-0 items-center gap-3 text-left">
          <img
            src={RESORT_INFO.logoSrc}
            alt="Palm Bliss Resort logo"
            className="h-11 w-11 shrink-0 rounded-xl border border-[#6bae3b]/50 object-cover shadow-sm sm:h-12 sm:w-12"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold tracking-tight text-[#123724] sm:text-lg">
              {RESORT_INFO.displayName}
            </span>
            <span className="block whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-[#475569]">
              Nadhavade · Konkan
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-semibold text-[#1e293b] transition hover:text-[#1b4d32]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={RESORT_INFO.phoneHref}
            className="hidden min-h-10 items-center gap-1.5 whitespace-nowrap rounded-xl border border-[#123724]/25 bg-white px-3.5 py-2 text-xs font-semibold text-[#123724] transition hover:bg-[#f1f5ec] md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-[#9e3b2b]" aria-hidden="true" />
            <span>{RESORT_INFO.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden min-h-10 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#123724] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b4d32] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
            <span>Book Stay</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#123724]/20 bg-white text-[#123724] lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-[#123724]/10 bg-[#faf9f5] px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#1e293b] hover:bg-[#f1f5ec]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
