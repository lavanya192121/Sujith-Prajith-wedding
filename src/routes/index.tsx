import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import couplePhoto from "@/assets/couple-photo.jpg.asset.json";
import coupleSketch from "@/assets/couple-sketch.png.asset.json";
import locationQr from "@/assets/location-qr.png.asset.json";
import divineHands from "@/assets/cover-divine-hands.jpg";
import introCouple from "@/assets/intro-couple.png";
import weddingOpening from "@/assets/wedding-opening.mp4.asset.json";
import { Countdown } from "@/components/wedding/Countdown";
import { Gallery } from "@/components/wedding/Gallery";
import { EventCarousel } from "@/components/wedding/EventCarousel";
import { Divider, LotusMark, MandalaRing, PeacockFeather } from "@/components/wedding/Motifs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujitha & Prajith · Wedding Invitation · 12 December 2026" },
      {
        name: "description",
        content:
          "Sujitha weds Prajith on 12 December 2026 in Thiruvalla, Kerala. Wedding details, countdown, gallery, directions and RSVP.",
      },
      { property: "og:title", content: "Sujitha & Prajith · 12 December 2026" },
      {
        property: "og:description",
        content:
          "With the blessings of our families, join us in Thiruvalla as Sujitha and Prajith begin their life together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const WHATSAPP_NUMBER = "919400000000";
const PHONE_NUMBER = "+919400000000";
const VENUE_QUERY = "SNDP Building, Kaviyoor, Thiruvalla, Kerala, India";
const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_QUERY)}`;

function Invitation() {
  const [opened, setOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollReveal(contentRef, opened);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Cover opened={opened} onFinished={() => setOpened(true)} />

      {opened && <ScrollProgress />}
      {opened && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <span className="ambient-orb ambient-orb-gold" />
          <span className="ambient-orb ambient-orb-sage" />
        </div>
      )}

      <div ref={contentRef} aria-hidden={!opened} className={opened ? "invitation-fade-in relative z-10" : "hidden"}>
        <Hero />
        <CountdownSection />
        <EventCarousel />
        <GallerySection />
        <LocationSection />
        <Rsvp />
        <ThankYou />
      </div>
    </main>
  );
}

const REVEAL_VARIANTS = ["up", "up", "scale", "up"] as const;

function useScrollReveal(ref: RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    const root = ref.current;
    if (!active || !root) return;
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        ":scope > section > div > *, :scope > footer > div > *, [data-reveal]",
      ),
    ).filter((el) => !el.closest("[data-static]"));
    targets.forEach((el, i) => {
      if (!el.dataset["reveal"]) {
        const siblings = Array.from(el.parentElement?.children ?? []);
        const idx = siblings.indexOf(el);
        el.dataset["reveal"] = REVEAL_VARIANTS[i % REVEAL_VARIANTS.length];
        el.style.setProperty("--reveal-delay", `${Math.min(idx, 5) * 110}ms`);
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref, active]);
}

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${p})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
      <div ref={barRef} className="scroll-progress h-full origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

function Cover({ opened, onFinished }: { opened: boolean; onFinished: () => void }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setDismissed(true), 1400);
    return () => clearTimeout(t);
  }, [opened]);

  if (dismissed) return null;

  return (
    <div className={`intro-cover fixed inset-0 z-40 overflow-hidden bg-background ${opened ? "animate-cover-exit" : ""}`} aria-label="Sujitha and Prajith's wedding invitation opening">
      <div className="intro-hands absolute inset-0" aria-hidden="true">
        <img src={divineHands} alt="" className="intro-hands-back absolute inset-0 h-full w-full object-cover" />
        <img src={divineHands} alt="" className="relative mx-auto h-full w-full object-contain" />
      </div>
      <div className="intro-veil absolute inset-0" aria-hidden="true" />
      <div className="intro-couple-scene absolute inset-0 flex flex-col items-center justify-end" aria-hidden="true">
        <div className="intro-halo absolute inset-0" />
        <LotusMark className="intro-corner-lotus absolute left-[6%] top-[9%] h-20 w-28 text-lotus/40 sm:h-28 sm:w-36" />
        <PeacockFeather className="intro-corner-feather absolute right-[8%] top-[9%] h-24 w-14 text-sage-deep/25 sm:h-36 sm:w-20" />
        <img src={introCouple} alt="" width={848} height={1264} className="intro-couple-art relative z-10 h-[48vh] max-h-[540px] w-auto max-w-[95vw] object-contain object-bottom sm:h-[53vh] sm:max-h-[820px]" />
      </div>
      <div className="intro-story absolute inset-0 z-20 flex flex-col items-center text-center">
        <div className="intro-monogram mt-[7vh] flex items-center gap-3 font-display text-xs tracking-[0.38em] text-sage-deep/80 sm:text-sm" aria-hidden="true">
          <span className="intro-monogram-rule h-px w-10 bg-gold/60" /> S &amp; P <span className="intro-monogram-rule h-px w-10 bg-gold/60" />
        </div>
        <div className="intro-rings absolute top-[16%] flex items-center justify-center text-gold" aria-hidden="true">
          <span className="intro-ring intro-ring-left" /><span className="intro-ring intro-ring-right" />
        </div>
        <div className="intro-final-title absolute top-[14%] flex w-full flex-col items-center px-5 sm:top-[15%]">
          <span className="font-display text-xs tracking-[0.38em] text-sage-deep uppercase">Together with our families</span>
          <LotusMark className="mt-4 h-8 w-14 text-gold" />
          <h2 className="font-display mt-3 text-[clamp(3.4rem,8vh,6.5rem)] leading-none font-light text-sage-deep">Our <em className="font-normal">wedding</em></h2>
          <p className="font-display mt-4 text-xl tracking-[0.1em] text-sage-deep sm:text-2xl">Sujitha <span className="font-script text-gold">&amp;</span> Prajith</p>
          <p className="mt-3 text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase sm:text-xs">12 December 2026 · Thiruvalla</p>
        </div>
        <div className="intro-petals pointer-events-none absolute inset-0" aria-hidden="true">
          {PETALS.map((p) => (
            <span key={p.id} className="petal animate-petal" style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, ["--petal-sway" as string]: p.sway }} />
          ))}
        </div>
      </div>
      {!opened && (
        <video
          src={weddingOpening.url}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-label="Wedding invitation opening video"
          onEnded={onFinished}
          className="absolute inset-0 z-50 h-full w-full bg-background object-contain"
        />
      )}
    </div>
  );
}

const PETALS = [
  { id: 1, left: "38%", delay: "0s", duration: "7s", sway: "2.5rem" },
  { id: 2, left: "52%", delay: "2.2s", duration: "8.5s", sway: "-2rem" },
  { id: 3, left: "62%", delay: "4.4s", duration: "7.6s", sway: "3rem" },
  { id: 4, left: "45%", delay: "5.8s", duration: "9s", sway: "-2.6rem" },
];

function Hero() {
  return (
    <section className="relative flex min-h-screen items-start justify-center overflow-hidden px-5 pt-24 pb-24">
      <img
        src={couplePhoto.url}
        alt="Sujitha and Prajith together, smiling in a garden"
        className="hero-photo pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-80 sm:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/28 to-background" />
      <div className="absolute inset-0 bg-background/10" />

      <div className="hero-content relative z-10 w-full max-w-2xl text-center sm:pt-[6vh]">
        <h1 className="font-display text-5xl leading-[1.05] font-light text-sage-deep sm:text-7xl">
          Sujitha
          <span className="font-script mx-3 block text-gradient-gold text-4xl sm:inline sm:text-5xl">
            &amp;
          </span>
          Prajith
        </h1>
        <p className="mt-4 text-[0.6rem] tracking-[0.5em] text-muted-foreground uppercase sm:mt-6 sm:text-xs">
          Save the date
        </p>
        <LotusMark className="mx-auto mt-16 h-6 w-10 text-gold sm:mt-20" />
        <p className="mt-16 font-display text-2xl tracking-[0.18em] text-foreground sm:mt-20 sm:text-3xl">
          12 · 12 · 2026
        </p>
        <p className="mt-3 text-xs tracking-[0.35em] text-muted-foreground uppercase">
          Saturday · Thiruvalla, Kerala
        </p>
      </div>

      <div data-static className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:pb-12">
        <p className="font-display animate-rise mx-auto max-w-2xl text-center text-base leading-relaxed text-foreground italic sm:text-xl">
          "Two hearts unite in a beautiful bond of love, beginning a timeless journey
          filled with happiness, cherished memories, and a lifetime of togetherness on
          this special day. Our love story begins."
        </p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-[0.6rem] tracking-[0.45em] text-gold uppercase sm:text-xs">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl font-light text-sage-deep sm:text-5xl">
        {title}
      </h2>
      <Divider className="mt-6" />
    </div>
  );
}

function CountdownSection() {
  return (
    <section className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Counting every moment" title="Until we celebrate" />
        <div className="mt-12">
          <Countdown />
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Moments & motifs" title="Our gallery" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Tap any image to view it larger.
        </p>
        <div className="mt-10">
          <Gallery />
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="relative px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Finding us" title="Location & directions" />
        <div className="glass-card mt-12 rounded-3xl p-8 sm:p-10">
          <div className="mx-auto flex max-w-xs flex-col items-center">
            <img
              src={locationQr.url}
              alt="QR code linking to the wedding venue location in Thiruvalla, Kerala"
              className="h-56 w-56 rounded-2xl bg-white p-2 shadow-lg shadow-gold/10 sm:h-64 sm:w-64"
            />
            <p className="mt-5 text-center text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase sm:text-xs">
              Scan for location
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            The venue at SNDP Building, Kaviyoor, Thiruvalla is a two-hour drive
            from Cochin International Airport and ten minutes from Thiruvalla
            Railway Station.
          </p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-7 py-3 text-xs tracking-[0.28em] text-sage-deep uppercase transition-colors hover:bg-gold/30"
          >
            <Navigation className="h-4 w-4" />
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}

function Rsvp() {
  return (
    <section className="relative px-5 py-20 sm:py-28">
      <PeacockFeather className="animate-drift pointer-events-none absolute -left-8 bottom-10 h-56 text-sage-deep/15" />
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Kindly respond" title="RSVP" />
        <div className="glass-card mt-12 rounded-3xl p-8 text-center sm:p-12">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your presence would mean the world to us. Please let us know if you can
            join, so we can keep a seat and a sadya leaf ready for you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I am happy to confirm my presence at Sujitha & Prajith's wedding on 12 December 2026.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-xs tracking-[0.25em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              RSVP on WhatsApp
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/15 px-8 py-4 text-xs tracking-[0.25em] text-sage-deep uppercase transition-colors hover:bg-gold/30"
            >
              <Phone className="h-4 w-4" />
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThankYou() {
  return (
    <footer className="relative overflow-hidden px-5 py-24 sm:py-32">
      <MandalaRing className="animate-slow-spin pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 text-gold/20" />

      <div className="relative mx-auto max-w-3xl">
        <div className="glass-card rounded-[2rem] p-8 sm:p-12">
          <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
            {/* Stamp-style couple sketch — left, matching the desktop format on every screen */}
            <div className="relative shrink-0">
              <div className="relative rotate-[-2deg] rounded-2xl border-2 border-gold/60 bg-background/40 p-1.5 shadow-lg shadow-gold/10 sm:p-2">
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />
                <img
                  src={coupleSketch.url}
                  alt="Sketch of Sujitha and Prajith"
                  width={220}
                  height={280}
                  className="h-36 w-27 rounded-xl object-cover grayscale-[20%] sepia-[15%] sm:h-56 sm:w-44"
                />
              </div>
              <p className="font-display mt-2 text-center text-[0.55rem] tracking-[0.3em] text-gold uppercase sm:mt-3 sm:text-xs">
                With love
              </p>
            </div>

            {/* Thank-you message — right, left-aligned like the desktop format */}
            <div className="min-w-0 text-left">
              <LotusMark className="h-5 w-8 text-lotus sm:h-7 sm:w-11" />
              <h2 className="font-script mt-3 text-3xl text-gradient-gold sm:mt-4 sm:text-5xl">
                Thank you
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
                For the love, the prayers and the blessings that have brought us
                here. We look forward to beginning this journey surrounded by you.
              </p>
              <Divider className="mt-5 justify-start sm:mt-8" />
              <p className="font-display mt-4 whitespace-nowrap text-base font-light text-sage-deep sm:mt-6 sm:text-2xl">
                Sujitha <span className="font-script text-gold">&amp;</span> Prajith
              </p>
              <p className="mt-1.5 whitespace-nowrap text-[0.5rem] tracking-[0.18em] text-muted-foreground uppercase sm:mt-2 sm:text-[0.6rem] sm:tracking-[0.45em]">
                12 December 2026 · Thiruvalla
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base =
    "absolute h-5 w-5 text-gold/80 sm:h-6 sm:w-6";
  const place = {
    tl: "-top-2.5 -left-2.5",
    tr: "-top-2.5 -right-2.5",
    bl: "-bottom-2.5 -left-2.5",
    br: "-bottom-2.5 -right-2.5",
  }[position];
  const rotate = {
    tl: "",
    tr: "rotate-90",
    bl: "-rotate-90",
    br: "rotate-180",
  }[position];
  return (
    <svg
      viewBox="0 0 40 40"
      className={`${base} ${place} ${rotate}`}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M4 36 Q4 4 36 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 36 Q10 10 36 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="36" cy="4" r="2" fill="currentColor" />
      <circle cx="10" cy="36" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}
