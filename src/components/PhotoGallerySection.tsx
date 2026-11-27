import { useState } from 'react';
import { Camera } from 'lucide-react';
import { GALLERY_PHOTOS, type GalleryPhoto } from '../data/resortData';

type FilterCategory = 'all' | GalleryPhoto['category'];

const FILTERS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Photos' },
  { id: 'grounds', label: 'Campus & Lawns' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'dining', label: 'Munching Bites' },
];

export function PhotoGallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const visiblePhotos =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9e3b2b]">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            Real Property Photography
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#123724] sm:text-4xl">
            Inside Palm Bliss Resort
          </h2>
        </div>

        <div
          role="group"
          aria-label="Filter resort gallery photos"
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((filter) => {
            const isSelected = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-10 cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                  isSelected
                    ? 'bg-[#123724] text-white shadow-sm'
                    : 'border border-[#123724]/20 bg-white text-[#1e293b] hover:bg-[#f1f5ec]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visiblePhotos.map((photo) => (
          <figure
            key={photo.id}
            className="overflow-hidden rounded-2xl border border-[#123724]/12 bg-white shadow-sm"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#f1f5ec]">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
            <figcaption className="p-4">
              <h3 className="text-base font-bold text-[#123724]">{photo.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#475569]">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
