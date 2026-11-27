import { Compass, Flame, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { DINING_HIGHLIGHTS } from '../data/resortData';

export interface DiningShowcaseProps {
  onLocateGazeboIn3D: () => void;
  onReserveTable: () => void;
}

export function DiningShowcase({ onLocateGazeboIn3D, onReserveTable }: DiningShowcaseProps) {
  return (
    <section id="dining" className="border-y border-[#1b3b2b]/10 bg-[#f2ece1]/75 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9e3b2b]/12 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9e3b2b]">
              <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
              169+ Dining Mentions on Google Reviews
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1b3b2b] sm:text-4xl">
              Open-Air Multicuisine Dining Pavilion
            </h2>
            <p className="mt-2.5 text-base text-[#475569]">
              Our courtyard gazebo restaurant is one of Nadhavade’s highest-rated stops for
              coastal Konkan seafood, clay-tandoor breads, and fresh morning tiffins. Now guests
              can preview the menu and book a family table directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onLocateGazeboIn3D}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#1b3b2b]/25 bg-white px-4 py-2.5 text-sm font-semibold text-[#1b3b2b] transition hover:bg-[#faf7f2]"
            >
              <Compass className="h-4 w-4 text-[#9e3b2b]" aria-hidden="true" />
              <span>Locate Gazebo in 3D</span>
            </button>
            <button
              type="button"
              onClick={onReserveTable}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#9e3b2b] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#7d2c1f]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Reserve a Family Table on WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DINING_HIGHLIGHTS.map((dish) => (
            <article
              key={dish.id}
              className="flex flex-col justify-between rounded-2xl border border-[#1b3b2b]/12 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b47b2b]">
                    {dish.category}
                  </span>
                  <Flame className="h-4 w-4 text-[#9e3b2b]" aria-hidden="true" />
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#1b3b2b]">{dish.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569]">{dish.description}</p>
              </div>
              <p className="mt-4 inline-flex w-fit rounded-full bg-[#faf7f2] px-3 py-1 text-xs font-semibold text-[#1b3b2b]">
                {dish.tag}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
