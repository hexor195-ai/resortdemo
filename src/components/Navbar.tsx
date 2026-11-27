import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b border-[#123724]/15 bg-[#faf9f5]/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-xs'}`}>
      <div
        className="h-[3px] w-full bg-gradient-to-r from-[#123724] via-[#6bae3b] to-[#8a5a18]"
        aria-hidden="true"
      />
      <a
        href="#main-content"
        className="visually-hidden fixed left-3 top-3 z-50 rounded-lg bg-[#123724] px-4 py-2 text-sm font-semibold text-white shadow-lg"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <a
          href="#hero-showcase"
          className="group flex min-w-0 items-center gap-3.5 text-left"
        >
          <span className="shrink-0 rounded-2xl bg-white p-0.5 shadow-md ring-2 ring-[#6bae3b]/75 transition group-hover:ring-[#123724]">
            <img
              src={RESORT_INFO.logoSrc}
              alt="Palm Bliss Resort logo"
              className="h-[50px] w-[50px] rounded-[13px] object-cover sm:h-14 sm:w-14"
            />
          </span>
          <span className="min-w-0">
            <span className="font-display type-brand block truncate text-[#123724]">
              Palm <em className="font-medium italic text-[#1b4d32]">Bliss</em>
            </span>
            <span className="mt-0.5 flex items-center gap-1.5">
              <span
                className="h-[1.5px] w-3.5 shrink-0 rounded-full bg-[#6bae3b] sm:w-4"
                aria-hidden="true"
              />
              <span className="whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#8a5a18]">
                RESORT · NADHAVADE
              </span>
              <span
                className="hidden h-[1.5px] w-4 shrink-0 rounded-full bg-[#6bae3b] sm:inline-block"
                aria-hidden="true"
              />
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
