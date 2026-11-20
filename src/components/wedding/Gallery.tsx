import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import coupleLamp from "@/assets/gallery-couple-lamp.jpg.asset.json";
import coupleBench from "@/assets/gallery-couple-bench.jpg.asset.json";
import coupleGarden from "@/assets/gallery-couple-garden.jpg.asset.json";
import laughLean from "@/assets/gallery-laugh-lean.jpg.asset.json";
import verandaWalk from "@/assets/gallery-veranda-walk.jpg.asset.json";
import tiledRoof from "@/assets/gallery-tiled-roof.jpg.asset.json";
import plantBench from "@/assets/gallery-plant-bench.jpg.asset.json";
import benchSmile from "@/assets/gallery-bench-smile.jpg.asset.json";
import shoulderEmbrace from "@/assets/gallery-shoulder-embrace.jpg.asset.json";
import walkBw from "@/assets/gallery-walk-bw.jpg.asset.json";
import { withBase } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const photos = [
  { src: withBase(coupleGarden.url), alt: "Sujitha and Prajith smiling together among lush greenery", caption: "Two hearts, one path" },
  { src: withBase(coupleBench.url), alt: "Sujitha and Prajith seated together on a sunlit veranda", caption: "Quiet moments of joy" },
  { src: withBase(coupleLamp.url), alt: "Sujitha and Prajith holding hands beside the nilavilakku lamp", caption: "Held in love's embrace" },
  { src: withBase(laughLean.url), alt: "Sujitha and Prajith laughing together, arms around each other", caption: "Laughter we share" },
  { src: withBase(verandaWalk.url), alt: "Sujitha and Prajith walking hand in hand along a teal veranda", caption: "Walking hand in hand" },
  { src: withBase(tiledRoof.url), alt: "Sujitha and Prajith strolling beneath a terracotta tiled roof", caption: "Steps toward forever" },
  { src: withBase(plantBench.url), alt: "Sujitha and Prajith seated side by side on a tiled bench", caption: "Side by side" },
  { src: withBase(benchSmile.url), alt: "Sujitha and Prajith gazing at each other and smiling", caption: "A moment to treasure" },
  { src: withBase(shoulderEmbrace.url), alt: "Prajith embracing Sujitha as they sit close together", caption: "Wrapped in warmth" },
  { src: withBase(walkBw.url), alt: "Sujitha and Prajith walking together in timeless black and white", caption: "Timeless together" },
];

const positionClasses = {
  center: "gallery-slide-center",
  left: "gallery-slide-left",
  right: "gallery-slide-right",
  hiddenLeft: "gallery-slide-hidden-left",
  hiddenRight: "gallery-slide-hidden-right",
};

function getPosition(index: number, active: number) {
  const forward = (index - active + photos.length) % photos.length;
  const backward = (active - index + photos.length) % photos.length;
  if (forward === 0) return "center";
  if (forward === 1) return "right";
  if (backward === 1) return "left";
  return forward < backward ? "hiddenRight" : "hiddenLeft";
}

export function Gallery() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const previous = () => setActive((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setActive((current) => (current + 1) % photos.length);

  useEffect(() => {
    if (paused || open !== null) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [paused, open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((index) => ((index ?? 0) + 1) % photos.length);
      if (event.key === "ArrowLeft") {
        setOpen((index) => ((index ?? 0) - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openPhoto = open === null ? undefined : photos[open];

  return (
    <>
      <div
        className="gallery-carousel mx-auto max-w-6xl"
        aria-roledescription="carousel"
        aria-label="Wedding gallery"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
        }}
      >
        <div className="gallery-stage relative mx-auto" aria-live="polite">
          {photos.map((photo, index) => {
            const position = getPosition(index, active);
            const isCenter = position === "center";
            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => (isCenter ? setOpen(index) : setActive(index))}
                className={`gallery-slide group absolute ${positionClasses[position]}`}
                aria-label={isCenter ? `Open image: ${photo.alt}` : `Show image: ${photo.alt}`}
                aria-current={isCenter ? "true" : undefined}
                tabIndex={isCenter ? 0 : -1}
              >
                <span className="gallery-frame block h-full w-full overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={index < 3 ? "eager" : "lazy"}
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-2 border border-gold/35" />
                  <span className="pointer-events-none absolute inset-0 bg-sage-deep/10 transition-colors duration-700 group-hover:bg-transparent" />
                  <span className="gallery-sheen pointer-events-none absolute inset-0" />
                </span>
                <span className="gallery-caption absolute right-3 bottom-3 left-3 border-t border-gold/40 bg-sage-deep/75 px-3 py-3 text-center backdrop-blur-md">
                  <span className="font-event block text-[0.58rem] font-medium tracking-[0.28em] text-background uppercase">
                    {photo.caption}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={previous}
            className="rounded-full border-gold/45 bg-background/55 text-sage-deep backdrop-blur-md hover:bg-gold/15"
            aria-label="Previous gallery image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2" aria-label={`Image ${active + 1} of ${photos.length}`}>
            {photos.map((photo, index) => (
              <button
                key={photo.caption}
                type="button"
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  active === index ? "w-8 bg-gold" : "w-1.5 bg-sage-deep/25 hover:bg-gold/55"
                }`}
                aria-label={`Show ${photo.caption}`}
                aria-current={active === index ? "true" : undefined}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={next}
            className="rounded-full border-gold/45 bg-background/55 text-sage-deep backdrop-blur-md hover:bg-gold/15"
            aria-label="Next gallery image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {openPhoto && (
        <div
          className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-sage-deep/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setOpen(null)}
            className="lightbox-control absolute top-4 right-4 z-10 h-11 w-11 rounded-full border border-gold/60 bg-sage-deep/75 text-background shadow-lg backdrop-blur-md hover:bg-sage-deep/95 sm:top-6 sm:right-6"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((index) => ((index ?? 0) - 1 + photos.length) % photos.length);
            }}
            className="lightbox-control absolute top-1/2 left-3 z-10 h-12 w-12 -translate-y-1/2 rounded-full border border-gold/60 bg-sage-deep/75 text-background shadow-lg backdrop-blur-md hover:bg-sage-deep/95 sm:left-6 sm:h-11 sm:w-11"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((index) => ((index ?? 0) + 1) % photos.length);
            }}
            className="lightbox-control absolute top-1/2 right-3 z-10 h-12 w-12 -translate-y-1/2 rounded-full border border-gold/60 bg-sage-deep/75 text-background shadow-lg backdrop-blur-md hover:bg-sage-deep/95 sm:right-6 sm:h-11 sm:w-11"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <figure key={open} className="lightbox-figure max-h-full w-full max-w-2xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={openPhoto.src}
              alt={openPhoto.alt}
              width={1024}
              height={1024}
              className="max-h-[75vh] w-full rounded-2xl border border-gold/40 object-contain"
            />
            <figcaption className="mt-4 text-center text-sm tracking-wide text-background/80">
              {openPhoto.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}