import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type RefObject } from "react";
import {
  CalendarHeart,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import couplePhoto from "@/assets/couple-photo.jpg.asset.json";
import coupleSketch from "@/assets/couple-sketch.png.asset.json";
import coverArt from "@/assets/cover-divine-hands.jpg";
import { Countdown } from "@/components/wedding/Countdown";
import { Gallery } from "@/components/wedding/Gallery";
import { Divider, LotusMark, MandalaRing, PeacockFeather } from "@/components/wedding/Motifs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujitha & Prajith · Wedding Invitation · 18 January 2027" },
      {
        name: "description",
        content:
          "Sujitha weds Prajith on 18 January 2027 in Kottayam, Kerala. Wedding and reception details, countdown, gallery, directions and RSVP.",
      },
      { property: "og:title", content: "Sujitha & Prajith · 18 January 2027" },
      {
        property: "og:description",
        content:
          "With the blessings of our families, join us in Kottayam as Sujitha and Prajith begin their life together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const WHATSAPP_NUMBER = "919400000000";
const PHONE_NUMBER = "+919400000000";
const VENUE_QUERY = "Kottayam, Kerala, India";
const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_QUERY)}`;

function Invitation() {
  const [opened, setOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1400);
    return () => clearTimeout(timer);
  }, [opened]);

  useScrollReveal(contentRef, opened);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Cover opened={opened} onOpen={() => setOpened(true)} />

      {opened && <ScrollProgress />}
      {opened && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <span className="ambient-orb ambient-orb-gold" />
          <span className="ambient-orb ambient-orb-sage" />
        </div>
      )}

      <div ref={contentRef} aria-hidden={!opened} className={opened ? "relative z-10" : "hidden"}>
        <Hero />
        <CountdownSection />
        <Events />
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
    );
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

function Cover({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => setDismissed(true), 1600);
    return () => clearTimeout(t);
  }, [opened]);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-40 bg-background">
      <div className="flex h-full w-full">
        <div
          className={`relative h-full w-1/2 overflow-hidden bg-background ${opened ? "animate-veil-left" : ""}`}
        >
          <div className="absolute inset-y-0 left-0 h-full w-[200%]">
            <CoverArt />
          </div>
        </div>
        <div
          className={`relative h-full w-1/2 overflow-hidden bg-background ${opened ? "animate-veil-right" : ""}`}
        >
          <div className="absolute inset-y-0 right-0 h-full w-[200%]">
            <CoverArt />
          </div>
        </div>
      </div>

      {!opened && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="absolute top-[5.5vh] font-display text-[0.72rem] font-medium tracking-[0.55em] text-gold-foreground uppercase [text-shadow:0_1px_14px_var(--background),0_0_4px_var(--background)] sm:text-sm">
            Together with our families
          </p>

          <div className="relative flex items-center justify-center">
            {PETALS.map((p) => (
              <span
                key={p.id}
                className="petal animate-petal"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  ["--petal-sway" as string]: p.sway,
                }}
              />
            ))}
            <button
              type="button"
              onClick={onOpen}
              className="animate-float-glow pointer-events-auto cursor-pointer bg-transparent px-6 py-4 focus-visible:outline-none"
              aria-label="Open the invitation for Sujitha and Prajith"
            >
              <span className="font-script text-rich-gold flex items-center gap-3 text-8xl leading-none sm:gap-5 sm:text-[10rem]">
                S
                <LotusMark className="h-10 w-16 text-lotus sm:h-14 sm:w-24" />
                P
              </span>
            </button>
          </div>

          <p className="animate-soft-pulse absolute bottom-[4.5vh] font-display text-[0.7rem] font-medium tracking-[0.45em] text-gold-foreground uppercase [text-shadow:0_1px_14px_var(--background),0_0_4px_var(--background)] sm:text-sm">
            Tap to open invitation
          </p>
        </div>
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

function CoverArt() {
  return (
    <div className="relative h-full w-full">
      <img
        src={coverArt}
        alt=""
        aria-hidden
        width={603}
        height={1150}
        className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-90 blur-2xl"
      />
      <img
        src={coverArt}
        alt="Radha's hennaed hand reaching down towards Krishna's blue hand holding a lotus and peacock feather"
        width={603}
        height={1150}
        className="relative h-full w-full object-contain object-center"
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24">
      <img
        src={couplePhoto.url}
        alt="Sujitha and Prajith together, smiling in a garden"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-80 sm:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/28 to-background" />
      <div className="absolute inset-0 bg-background/10" />

      <div className="animate-rise relative z-10 w-full max-w-2xl text-center">
        <p className="text-[0.6rem] tracking-[0.5em] text-muted-foreground uppercase sm:text-xs">
          Save the date
        </p>
        <h1 className="font-display mt-6 text-5xl leading-[1.05] font-light text-sage-deep sm:text-7xl">
          Sujitha
          <span className="font-script mx-3 block text-gradient-gold text-4xl sm:inline sm:text-5xl">
            &amp;
          </span>
          Prajith
        </h1>
        <Divider className="mt-8" />
        <p className="mt-8 font-display text-2xl tracking-[0.18em] text-foreground sm:text-3xl">
          18 · 01 · 2027
        </p>
        <p className="mt-3 text-xs tracking-[0.35em] text-muted-foreground uppercase">
          Monday · Kottayam, Kerala
        </p>
        <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-muted-foreground italic">
          "As Radha and Krishna, two hearts reaching for one another — we ask for your
          presence and your blessings."
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

const events = [
  {
    name: "The Wedding",
    time: "10:30 AM",
    date: "Monday, 18 January 2027",
    venue: "Sree Krishna Kalyana Mandapam",
    address: "Nagampadam, Kottayam, Kerala 686001",
    note: "Muhurtham followed by sadya lunch",
  },
  {
    name: "The Reception",
    time: "7:00 PM",
    date: "Monday, 18 January 2027",
    venue: "Lakeview Banquet Hall",
    address: "Kodimatha, Kottayam, Kerala 686039",
    note: "Dinner, music and dancing",
  },
];

function Events() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:py-28">
      <MandalaRing className="animate-slow-spin pointer-events-none absolute -top-16 -right-24 h-72 w-72 text-gold/10" />
      <PeacockFeather className="animate-drift pointer-events-none absolute -bottom-16 -left-5 h-64 text-sage-deep/10" />
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Ceremonies" title="Event details" />
        <div className="relative mt-14 space-y-9 sm:mt-16 md:space-y-12">
          <div className="ceremony-line absolute inset-y-5 left-5 w-px md:left-1/2 md:-translate-x-1/2" />
          {events.map((event, index) => (
            <div
              key={event.name}
              className={`relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:gap-6 ${index % 2 === 1 ? "md:[&>article]:col-start-3" : ""}`}
            >
              <div
                className={`relative z-10 col-start-1 row-start-1 grid h-10 w-10 place-items-center rounded-full border border-gold/70 bg-background shadow-[0_0_0_5px_var(--background),0_0_24px_color-mix(in_oklab,var(--gold)_28%,transparent)] md:col-start-2 ${index % 2 === 1 ? "md:row-start-1" : ""}`}
                aria-hidden="true"
              >
                {index === 0 ? (
                  <LotusMark className="h-5 w-7 text-gold" />
                ) : (
                  <PeacockFeather className="h-7 w-4 text-gold" />
                )}
              </div>

              <article
                className={`ceremony-card group relative col-start-2 row-start-1 overflow-hidden rounded-2xl p-6 sm:p-8 md:col-span-1 ${index % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-3"}`}
              >
                <EventCorner position="tl" />
                <EventCorner position="tr" />
                <EventCorner position="bl" />
                <EventCorner position="br" />
                <div className={`relative z-10 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                  <div className={`flex items-center gap-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/10 shadow-inner">
                      {index === 0 ? (
                        <LotusMark className="h-5 w-8 text-lotus" />
                      ) : (
                        <PeacockFeather className="h-8 w-4 text-sage-deep" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="font-event text-[0.58rem] font-medium tracking-[0.32em] text-gold uppercase">
                        {index === 0 ? "Sacred vows" : "Evening celebration"}
                      </p>
                      <h3 className="font-display mt-1 text-3xl font-medium text-sage-deep sm:text-4xl">
                        {event.name}
                      </h3>
                    </div>
                  </div>

                  <div className={`metallic-separator mt-5 h-px w-full ${index % 2 === 0 ? "md:ml-auto" : ""}`} />

                  <dl className="font-event mt-6 space-y-4 text-sm text-foreground">
                    <EventDetail icon={CalendarHeart} alignRight={index % 2 === 0}>
                      {event.date}
                    </EventDetail>
                    <EventDetail icon={Clock} alignRight={index % 2 === 0}>
                      {event.time}
                    </EventDetail>
                    <EventDetail icon={MapPin} alignRight={index % 2 === 0}>
                      <span className="block font-medium text-sage-deep">{event.venue}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {event.address}
                      </span>
                    </EventDetail>
                  </dl>

                  <div className={`mt-7 flex ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    <p className="font-event inline-flex max-w-full items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-[0.62rem] font-medium tracking-[0.14em] text-sage-deep uppercase shadow-inner">
                      <LotusMark className="h-3 w-5 shrink-0 text-gold" />
                      <span>{event.note}</span>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventDetail({
  icon: Icon,
  alignRight,
  children,
}: {
  icon: typeof Clock;
  alignRight: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex min-w-0 items-start gap-3 ${alignRight ? "md:flex-row-reverse" : ""}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/30 bg-background/45 shadow-inner">
        <Icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
      </span>
      <dd className={`min-w-0 pt-1 ${alignRight ? "md:text-right" : ""}`}>{children}</dd>
    </div>
  );
}

function EventCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const placement = {
    tl: "top-3 left-3",
    tr: "top-3 right-3 rotate-90",
    bl: "bottom-3 left-3 -rotate-90",
    br: "right-3 bottom-3 rotate-180",
  }[position];

  return (
    <svg
      viewBox="0 0 54 54"
      className={`pointer-events-none absolute h-10 w-10 text-gold/45 transition-colors duration-500 group-hover:text-gold/70 ${placement}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 49V18Q4 4 18 4H49" stroke="currentColor" strokeWidth="1" />
      <path d="M10 40V21Q10 10 21 10H40" stroke="currentColor" strokeWidth="0.7" />
      <path d="M4 27C13 26 18 20 19 11C20 20 26 26 35 27" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="4" cy="49" r="1.8" fill="currentColor" />
      <circle cx="49" cy="4" r="1.8" fill="currentColor" />
    </svg>
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
        <div className="glass-card mt-12 overflow-hidden rounded-3xl p-2">
          <iframe
            title="Map of the wedding venue in Kottayam, Kerala"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&z=13&output=embed`}
            loading="lazy"
            className="h-72 w-full rounded-2xl border-0 sm:h-96"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Kottayam is a two-hour drive from Cochin International Airport and ten
            minutes from Kottayam Railway Station.
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
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I am happy to confirm my presence at Sujitha & Prajith's wedding on 18 January 2027.")}`}
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
                18 January 2027 · Kottayam
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
