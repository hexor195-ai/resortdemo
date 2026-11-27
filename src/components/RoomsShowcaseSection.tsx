import { Check, MessageCircle, Sparkles } from 'lucide-react';
import { RESORT_INFO, ROOM_TIERS } from '../data/resortData';

export interface RoomsShowcaseSectionProps {
  onBookRoom: (roomTierName: string) => void;
}

export function RoomsShowcaseSection({ onBookRoom }: RoomsShowcaseSectionProps) {
  return (
    <section id="rooms" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9e3b2b]">
            Garden-View Cottages
          </p>
          <h2 className="type-section mt-2 text-[#123724]">
            Comfortable AC Rooms <em className="font-medium italic">Surrounded by Greenery</em>
          </h2>
          <p className="mt-2.5 max-w-[60ch] text-base leading-relaxed text-[#475569]">
            Spotless, air-conditioned rooms inside our two-story Konkan laterite wings. Check-in{' '}
            {RESORT_INFO.checkIn} · Check-out {RESORT_INFO.checkOut}.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#f1f5ec] px-3.5 py-1.5 text-xs font-bold text-[#123724]">
          <Sparkles className="h-3.5 w-3.5 text-[#6bae3b]" aria-hidden="true" />
          Direct Front-Desk Inquiry
        </span>
      </div>

      <div className="mt-10 grid gap-7 lg:grid-cols-3">
        {ROOM_TIERS.map((tier) => (
          <article
            key={tier.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-[#123724]/15 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f1f5ec]">
              <img
                src={tier.imageSrc}
                alt={tier.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#123724]/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                {tier.sizeSqFt} sq.ft.
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8a5a18]">
                  {tier.bedding} · {tier.capacity}
                </p>
                <h3 className="mt-1.5 text-2xl font-bold text-[#123724]">{tier.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{tier.description}</p>

                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {tier.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#1e293b]"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#6bae3b]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onBookRoom(tier.name)}
                className="mt-6 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#123724] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1b4d32]"
              >
                <MessageCircle className="h-4 w-4 text-[#a3e66f]" aria-hidden="true" />
                <span>Book This Room on WhatsApp</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
