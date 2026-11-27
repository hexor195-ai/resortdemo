import { Check, Clock, ExternalLink, MapPin, Star, UtensilsCrossed } from 'lucide-react';
import { DINING_HIGHLIGHTS, MUNCHING_BITES_INFO } from '../data/resortData';

export function MunchingBitesSection() {
  return (
    <section
      id="munching-bites"
      className="border-y border-[#123724]/12 bg-[#f1f5ec]/85 py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Restaurant Header & Official Brand Card */}
        <div className="grid items-center gap-8 rounded-3xl border border-[#123724]/15 bg-white p-6 shadow-sm lg:grid-cols-12 lg:p-8">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={MUNCHING_BITES_INFO.logoSrc}
                alt="Konkan's Munching Route restaurant crest"
                className="h-14 w-14 rounded-2xl border border-[#123724]/15 object-cover shadow-sm"
              />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9e3b2b]/12 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9e3b2b]">
                  <UtensilsCrossed className="h-3.5 w-3.5" aria-hidden="true" />
                  In-House Multicuisine Restaurant
                </span>
                <p className="mt-1 text-xs font-semibold text-[#475569]">
                  {MUNCHING_BITES_INFO.fullName}
                </p>
              </div>
            </div>

            <h2 className="type-section mt-4 text-[#123724]">
              Munching <em className="font-medium italic text-[#9e3b2b]">Bites</em>
            </h2>
            <p className="mt-2.5 max-w-[60ch] text-base leading-relaxed text-[#475569]">
              {MUNCHING_BITES_INFO.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#1e293b]">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#faf9f5] px-3 py-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                {MUNCHING_BITES_INFO.rating} ({MUNCHING_BITES_INFO.ratingCount} Justdial Ratings)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#faf9f5] px-3 py-2">
                <Clock className="h-4 w-4 text-[#9e3b2b]" aria-hidden="true" />
                {MUNCHING_BITES_INFO.hours}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#faf9f5] px-3 py-2">
                <MapPin className="h-4 w-4 text-[#1b4d32]" aria-hidden="true" />
                Resort Courtyard Gazebo
              </span>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {MUNCHING_BITES_INFO.serviceFeatures.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-[#334155]">
                  <Check className="h-4 w-4 shrink-0 text-[#6bae3b]" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a
                href={MUNCHING_BITES_INFO.justdialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#123724]/25 bg-[#faf9f5] px-4 py-2 text-xs font-bold text-[#123724] transition hover:bg-[#e7efe0]"
              >
                <span>View Munching Bites on Justdial</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#123724] lg:col-span-5">
            <img
              src="/images/gazebo-night.jpg"
              alt="Munching Bites open-air dining gazebo illuminated at night at Palm Bliss Resort"
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Culinary Photo Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DINING_HIGHLIGHTS.map((dish) => (
            <article
              key={dish.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#123724]/12 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#f1f5ec]">
                <img
                  src={dish.imageSrc}
                  alt={dish.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8a5a18]">
                    {dish.category}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold text-[#123724]">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">{dish.description}</p>
                </div>
                <p className="mt-4 inline-flex w-fit rounded-full bg-[#f1f5ec] px-3 py-1 text-xs font-semibold text-[#123724]">
                  {dish.tag}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
