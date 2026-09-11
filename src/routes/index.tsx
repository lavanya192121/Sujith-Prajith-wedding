import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CalendarHeart,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from "lucide-react";

import coverArt from "@/assets/cover-divine-hands.jpg";
import heroHands from "@/assets/hero-hands.jpg";
import { Countdown } from "@/components/wedding/Countdown";
import { Gallery } from "@/components/wedding/Gallery";
import { Divider, LotusMark, MandalaRing, PeacockFeather } from "@/components/wedding/Motifs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sujith & Prajith · Wedding Invitation · 18 January 2027" },
      {
        name: "description",
        content:
          "Sujith weds Prajith on 18 January 2027 in Kottayam, Kerala. Wedding and reception details, countdown, gallery, directions and RSVP.",
      },
      { property: "og:title", content: "Sujith & Prajith · 18 January 2027" },
      {
        property: "og:description",
        content:
          "With the blessings of our families, join us in Kottayam as Sujith and Prajith begin their life together.",
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

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Cover opened={opened} onOpen={() => setOpened(true)} />

      <div ref={contentRef} aria-hidden={!opened} className={opened ? "" : "hidden"}>
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
              aria-label="Open the invitation for Sujith and Prajith"
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
        src={heroHands}
        alt="Illustration of a bridal hand and Krishna's hand reaching towards each other with a lotus"
        width={1024}
        height={1536}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45 sm:opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background" />

      <div className="animate-rise relative z-10 w-full max-w-2xl text-center">
        <p className="text-[0.6rem] tracking-[0.5em] text-muted-foreground uppercase sm:text-xs">
          Save the date
        </p>
        <h1 className="font-display mt-6 text-5xl leading-[1.05] font-light text-sage-deep sm:text-7xl">
          Sujith
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
    <section className="relative px-5 py-20 sm:py-28">
      <MandalaRing className="animate-slow-spin pointer-events-none absolute -top-16 -right-24 h-72 w-72 text-gold/15" />
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Ceremonies" title="Event details" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.name} className="glass-card rounded-3xl p-7 sm:p-9">
              <LotusMark className="h-7 w-12 text-lotus" />
              <h3 className="font-display mt-4 text-3xl font-light text-sage-deep">
                {event.name}
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex min-w-0 items-start gap-3">
                  <CalendarHeart className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <dd className="min-w-0">{event.date}</dd>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <dd className="min-w-0">{event.time}</dd>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <dd className="min-w-0">
                    <span className="block font-medium">{event.venue}</span>
                    <span className="block text-muted-foreground">{event.address}</span>
                  </dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-gold/25 pt-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {event.note}
              </p>
            </article>
          ))}
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
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I am happy to confirm my presence at Sujith & Prajith's wedding on 18 January 2027.")}`}
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
    <footer className="relative overflow-hidden px-5 py-24 text-center sm:py-32">
      <MandalaRing className="animate-slow-spin pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 text-gold/20" />
      <div className="relative mx-auto max-w-xl">
        <LotusMark className="mx-auto h-10 w-16 text-lotus" />
        <h2 className="font-script mt-6 text-5xl text-gradient-gold sm:text-6xl">
          Thank you
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          For the love, the prayers and the blessings that have brought us here. We
          look forward to beginning this journey surrounded by you.
        </p>
        <Divider className="mt-10" />
        <p className="font-display mt-8 text-2xl font-light text-sage-deep">
          Sujith <span className="font-script text-gold">&amp;</span> Prajith
        </p>
        <p className="mt-3 text-[0.6rem] tracking-[0.45em] text-muted-foreground uppercase">
          18 January 2027 · Kottayam
        </p>
      </div>
    </footer>
  );
}
