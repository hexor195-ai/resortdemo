import { useEffect, useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const visiblePhotos =
    activeFilter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);

  const activePhoto =
    lightboxIndex !== null ? (visiblePhotos[lightboxIndex] ?? null) : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activePhoto && !dialog.open) {
      dialog.showModal();
    } else if (!activePhoto && dialog.open) {
      dialog.close();
    }
  }, [activePhoto]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      setLightboxIndex(null);
    };
    dialog.addEventListener('close', handleClose);

    let cleanupBackdrop = () => {};
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) dialog.close();
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      cleanupBackdrop = () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      cleanupBackdrop();
    };
  }, []);

  const stepLightbox = (delta: number) => {
    if (lightboxIndex === null || visiblePhotos.length === 0) return;
    setLightboxIndex((lightboxIndex + delta + visiblePhotos.length) % visiblePhotos.length);
  };

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#9e3b2b]">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            Real Property Photography
          </span>
          <h2 className="type-section mt-2 text-[#123724]">
            Inside <em className="font-medium italic">Palm Bliss Resort</em>
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
                onClick={() => {
                  setActiveFilter(filter.id);
                  setLightboxIndex(null);
                }}
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
        {visiblePhotos.map((photo, index) => (
          <figure
            key={photo.id}
            className="overflow-hidden rounded-2xl border border-[#123724]/12 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`View photo: ${photo.title}`}
              className="group block w-full cursor-pointer overflow-hidden bg-[#f1f5ec] text-left"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            </button>
            <figcaption className="p-4">
              <h3 className="text-base font-bold text-[#123724]">{photo.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#475569]">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Native Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-photo-title"
        {...({ closedby: 'any' } as Record<string, string>)}
        className="m-auto max-h-[92svh] w-[calc(100%-1.5rem)] max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-[#0f2b1c] p-0 text-white shadow-2xl"
      >
        {activePhoto && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5">
              <div>
                <h3 id="lightbox-photo-title" className="text-lg font-bold text-white">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-white/75">{activePhoto.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close photo preview"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-black/40">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="max-h-[68svh] w-full object-contain"
              />
              {visiblePhotos.length > 1 && (
                <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
                  <button
                    type="button"
                    onClick={() => stepLightbox(-1)}
                    aria-label="Previous gallery photo"
                    className="pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepLightbox(1)}
                    aria-label="Next gallery photo"
                    className="pointer-events-auto inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/80"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
