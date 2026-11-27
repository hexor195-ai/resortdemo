import { Menu, MessageCircle, Moon, Phone, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { RESORT_INFO } from '../data/resortData';
import type { LightingMode } from '../three/campusScene';
import type { InquiryType } from '../utils/calculations';

export interface NavbarProps {
  lightingMode: LightingMode;
  onToggleLighting: () => void;
  onOpenBooking: (type: InquiryType) => void;
}

const NAV_LINKS = [
  { href: '#hero-3d', label: '3D Tour' },
  { href: '#save-ota', label: 'Save vs. OTA' },
  { href: '#dining', label: 'Dining' },
  { href: '#konkan-trails', label: 'Konkan & Amenities' },
  { href: '#guest-voices', label: 'Reviews' },
];

export function Navbar({ lightingMode, onToggleLighting, onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1b3b2b]/15 bg-[#faf7f2]/92 backdrop-blur-md">
      <a
        href="#main-content"
        className="visually-hidden fixed left-3 top-3 z-50 rounded-lg bg-[#1b3b2b] px-4 py-2 text-sm font-semibold text-white shadow-lg"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#hero-3d" className="flex items-center gap-3 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9e3b2b] font-display text-lg font-bold text-white shadow-sm">
            PB
          </span>
          <span>
            <span className="block font-display text-base font-bold tracking-tight text-[#1b3b2b] sm:text-lg">
              {RESORT_INFO.displayName}
            </span>
            <span className="block text-[11px] font-medium text-[#475569]">
              Nadhavade · Konkan
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[#1e293b] transition hover:text-[#9e3b2b]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLighting}
            aria-pressed={lightingMode === 'dusk'}
            aria-label={lightingMode === 'dusk' ? 'Switch to daylight' : 'Switch to golden-hour dusk'}
            className="hidden min-h-10 cursor-pointer items-center gap-1.5 rounded-xl border border-[#1b3b2b]/20 bg-white px-3 py-2 text-xs font-semibold text-[#1b3b2b] transition hover:bg-[#f2ece1] sm:inline-flex"
          >
            {lightingMode === 'dusk' ? (
              <Sun className="h-4 w-4 text-[#b47b2b]" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-[#1b3b2b]" aria-hidden="true" />
            )}
            <span>{lightingMode === 'dusk' ? 'Daylight' : 'Dusk'}</span>
          </button>

          <a
            href={RESORT_INFO.phoneHref}
            className="hidden min-h-10 items-center gap-1.5 rounded-xl border border-[#1b3b2b]/25 bg-white px-3.5 py-2 text-xs font-semibold text-[#1b3b2b] transition hover:bg-[#f2ece1] md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-[#9e3b2b]" aria-hidden="true" />
            <span>{RESORT_INFO.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking('stay')}
            className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-xl bg-[#1b3b2b] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#11261b] sm:text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>WhatsApp Book</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#1b3b2b]/20 bg-white text-[#1b3b2b] lg:hidden"
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
          className="border-t border-[#1b3b2b]/10 bg-[#faf7f2] px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#1e293b] hover:bg-[#f2ece1]"
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
