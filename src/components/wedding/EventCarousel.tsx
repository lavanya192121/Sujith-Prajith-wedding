import { useEffect, useRef } from "react";
import { CalendarHeart, Clock, MapPin } from "lucide-react";
import { Divider, LotusMark, PeacockFeather } from "./Motifs";

const events = [
  {
    name: "The Wedding",
    time: "10:30 AM",
    date: "Saturday, 12 December 2026",
    venue: "Sree Krishna Kalyana Mandapam",
    address: "Nagampadam, Kottayam, Kerala 686001",
    note: "Muhurtham followed by sadya lunch",
    eyebrow: "Sacred vows",
  },
  {
    name: "The Reception",
    time: "7:00 PM",
    date: "Saturday, 12 December 2026",
    venue: "Lakeview Banquet Hall",
    address: "Kodimatha, Kottayam, Kerala 686039",
    note: "Dinner, music and dancing",
    eyebrow: "Evening celebration",
  },
];

export function EventCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let touching = false;
    const paintProgress = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      const progress = max > 0 ? viewport.scrollLeft / max : 1;
      progressRef.current?.style.setProperty("--event-progress", String(progress));
    };
    const update = () => {
      frame = 0;
      if (touching || reducedMotion.matches) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / (distance * 0.82)));
      viewport.scrollLeft = progress * (viewport.scrollWidth - viewport.clientWidth);
      paintProgress();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const touchStart = () => { touching = true; };
    const touchEnd = () => { touching = false; };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    viewport.addEventListener("scroll", paintProgress, { passive: true });
    viewport.addEventListener("touchstart", touchStart, { passive: true });
    viewport.addEventListener("touchend", touchEnd, { passive: true });
    viewport.addEventListener("touchcancel", touchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      viewport.removeEventListener("scroll", paintProgress);
      viewport.removeEventListener("touchstart", touchStart);
      viewport.removeEventListener("touchend", touchEnd);
      viewport.removeEventListener("touchcancel", touchEnd);
    };
  }, []);

  return (
    <section ref={sectionRef} data-static className="event-scroll-section relative" aria-labelledby="event-details-heading">
      <div className="event-sticky-shell">
        <div className="mx-auto w-full max-w-6xl px-5">
          <header className="text-center">
            <p className="text-xs text-gold uppercase">Ceremonies</p>
            <h2 id="event-details-heading" className="font-display mt-3 text-4xl font-light text-sage-deep sm:text-5xl">Event details</h2>
            <Divider className="mt-5" />
          </header>
          <div ref={viewportRef} className="event-carousel-viewport mt-8 sm:mt-12" role="region" aria-label="Wedding and reception events" tabIndex={0}>
            <div className="event-carousel-track">
              {events.map((event, index) => (
                <article key={event.name} className="event-glass-card group relative min-w-0 overflow-hidden rounded-2xl">
                  <div className="event-card-art" aria-hidden="true">
                    {index === 0 ? <LotusMark className="h-24 w-36 text-lotus/25" /> : <PeacockFeather className="h-32 w-16 text-primary/20" />}
                  </div>
                  <div className="event-card-corner event-card-corner-top" aria-hidden="true" />
                  <div className="event-card-corner event-card-corner-bottom" aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <div className="min-w-0">
                        <p className="font-event text-xs text-primary uppercase">{event.eyebrow}</p>
                        <h3 className="font-display mt-2 text-3xl font-medium text-sage-deep sm:text-4xl">{event.name}</h3>
                      </div>
                      <span className="font-display shrink-0 text-4xl font-light text-gold/60">0{index + 1}</span>
                    </div>
                    <div className="metallic-separator mt-5 h-px w-full" />
                    <dl className="font-event mt-6 space-y-5 text-sm text-foreground">
                      <EventDetail icon={CalendarHeart} label="Date">{event.date}</EventDetail>
                      <EventDetail icon={Clock} label="Time"><span className="font-display text-2xl text-sage-deep">{event.time}</span></EventDetail>
                      <EventDetail icon={MapPin} label="Venue">
                        <span className="block font-medium text-sage-deep">{event.venue}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{event.address}</span>
                      </EventDetail>
                    </dl>
                    <div className="mt-7 border-t border-gold/30 pt-4">
                      <p className="font-event flex items-center gap-2 text-xs leading-relaxed text-primary">
                        <LotusMark className="h-4 w-6 shrink-0 text-gold" />
                        {event.note}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div ref={progressRef} className="event-carousel-progress mx-auto mt-6 flex max-w-xs items-center gap-4" aria-hidden="true">
            <span className="font-display text-sm text-muted-foreground">01</span>
            <div className="event-progress-rail relative h-px flex-1 bg-border"><span className="event-progress-marker absolute top-0 h-px bg-gold" /></div>
            <span className="font-display text-sm text-muted-foreground">02</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventDetail({ icon: Icon, label, children }: { icon: typeof Clock; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-3">
      <dt className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/30 bg-background/50">
        <Icon aria-hidden="true" className="h-4 w-4 text-gold" strokeWidth={1.5} />
        <span className="sr-only">{label}</span>
      </dt>
      <dd className="min-w-0 pt-1 leading-relaxed">{children}</dd>
    </div>
  );
}