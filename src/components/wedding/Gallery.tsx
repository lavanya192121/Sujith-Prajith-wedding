import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import lotus from "@/assets/gallery-lotus.jpg";
import peacock from "@/assets/gallery-peacock.jpg";
import lamp from "@/assets/gallery-lamp.jpg";
import mandala from "@/assets/gallery-mandala.jpg";
import temple from "@/assets/gallery-temple.jpg";
import mandap from "@/assets/gallery-mandap.jpg";

const photos = [
  { src: lotus, alt: "Pink lotus in bloom, the emblem of the celebration" },
  { src: peacock, alt: "Peacock feather illustration in sage and gold" },
  { src: lamp, alt: "Traditional brass nilavilakku lamp with jasmine" },
  { src: mandala, alt: "Sage and gold mandala rangoli pattern" },
  { src: temple, alt: "Kerala temple silhouette against a dusk sky" },
  { src: mandap, alt: "Floral mandap draped in sage silk and lotuses" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setOpen((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="relative -mx-5 overflow-hidden sm:-mx-6">
        <div className="group flex w-max animate-gallery-scroll hover:[animation-play-state:paused]">
          {[...photos, ...photos].map((photo, i) => (
            <button
              key={`${photo.src}-${i}`}
              type="button"
              onClick={() => setOpen(i % photos.length)}
              className="group/item relative mx-2 h-64 w-56 shrink-0 overflow-hidden rounded-2xl border border-gold/30 sm:mx-3 sm:h-80 sm:w-72"
              aria-label={`Open image: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-700 group-hover/item:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-sage-deep/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-sage-deep/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 rounded-full border border-gold/50 bg-background/20 p-2 text-background transition-colors hover:bg-background/35"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
            }}
            className="absolute left-3 rounded-full border border-gold/50 bg-background/20 p-2 text-background transition-colors hover:bg-background/35 sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((i) => ((i ?? 0) + 1) % photos.length);
            }}
            className="absolute right-3 rounded-full border border-gold/50 bg-background/20 p-2 text-background transition-colors hover:bg-background/35 sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure
            className="animate-rise max-h-full w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[open]!.src}
              alt={photos[open]!.alt}
              width={1024}
              height={1024}
              className="max-h-[75vh] w-full rounded-2xl border border-gold/40 object-contain"
            />
            <figcaption className="mt-4 text-center text-sm tracking-wide text-background/80">
              {photos[open]!.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
