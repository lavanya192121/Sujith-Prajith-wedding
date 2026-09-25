import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import lotus from "@/assets/gallery-lotus.jpg";
import peacock from "@/assets/gallery-peacock.jpg";
import lamp from "@/assets/gallery-lamp.jpg";
import mandala from "@/assets/gallery-mandala.jpg";
import temple from "@/assets/gallery-temple.jpg";
import mandap from "@/assets/gallery-mandap.jpg";

const photos = [
  {
    src: lotus,
    alt: "Pink lotus in bloom, the emblem of the celebration",
    caption: "The sacred lotus",
    frame: "w-64 p-2 sm:w-72",
    offset: "md:translate-y-4",
  },
  {
    src: peacock,
    alt: "Peacock feather illustration in sage and gold",
    caption: "Ethereal plumage",
    frame: "w-64 p-2 sm:w-80",
    offset: "md:-translate-y-8",
  },
  {
    src: lamp,
    alt: "Traditional brass nilavilakku lamp with jasmine",
    caption: "Eternal flame",
    frame: "w-56 p-2 sm:w-60",
    offset: "md:translate-y-12",
  },
  {
    src: mandala,
    alt: "Sage and gold mandala rangoli pattern",
    caption: "Infinite geometry",
    frame: "w-64 p-2 sm:w-72",
    offset: "md:-translate-y-4",
  },
  {
    src: temple,
    alt: "Kerala temple silhouette against a dusk sky",
    caption: "Sanctuary of love",
    frame: "w-72 p-3 sm:w-80",
    offset: "md:translate-y-8",
  },
  {
    src: mandap,
    alt: "Floral mandap draped in sage silk and lotuses",
    caption: "The union canopy",
    frame: "w-64 p-2 sm:w-72",
    offset: "md:-translate-y-12",
  },
];

function Reveal({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 3) * 140}ms` }}
      className={`transition-all duration-1000 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

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
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center justify-items-center gap-y-14 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
        {photos.map((photo, i) => (
          <Reveal key={photo.src} index={i}>
            <div
              className={`group relative flex flex-col items-center transition-transform duration-700 ${photo.offset}`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`relative overflow-hidden border border-gold/40 bg-card shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--sage-deep)_45%,transparent)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_30px_60px_-24px_color-mix(in_oklab,var(--sage-deep)_55%,transparent),0_0_24px_color-mix(in_oklab,var(--gold)_28%,transparent)] ${photo.frame}`}
                aria-label={`Open image: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                {/* inner hairline frame */}
                <span className="pointer-events-none absolute inset-2 border border-gold/25 transition-colors duration-700 group-hover:border-gold/60" />
                {/* soft sage wash that lifts on hover */}
                <span className="pointer-events-none absolute inset-0 bg-sage-deep/10 transition-colors duration-700 group-hover:bg-transparent" />
                {/* gold corner accents */}
                <span className="pointer-events-none absolute top-4 left-4 h-5 w-5 border-t border-l border-gold opacity-0 transition-all duration-500 group-hover:opacity-80" />
                <span className="pointer-events-none absolute right-4 bottom-4 h-5 w-5 border-r border-b border-gold opacity-0 transition-all duration-500 group-hover:opacity-80" />
              </button>
              <span className="font-event mt-4 text-[0.62rem] font-medium tracking-[0.3em] text-sage-deep/70 uppercase transition-colors duration-500 group-hover:text-gold">
                {photo.caption}
              </span>
            </div>
          </Reveal>
        ))}
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
