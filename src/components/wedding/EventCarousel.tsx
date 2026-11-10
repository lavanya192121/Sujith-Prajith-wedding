import { useEffect, useRef } from "react";
import { CalendarHeart, Clock, MapPin } from "lucide-react";
import { Divider, LotusMark, PeacockFeather } from "./Motifs";
import { eventMotion } from "./event-motion";

const events = [
  {
    name: "The Wedding",
    time: "12:18 PM – 12:40 PM",
    date: "Saturday, 12 December 2026",
    venue: "SNDP Building",
    address: "Kaviyoor, Thiruvalla, Kerala 689582",
    note: "Muhurtham followed by sadya lunch",
    eyebrow: "Sacred vows",
  },
];

export function EventCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("article"));
    if (cards.length < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const shell = section.querySelector<HTMLElement>(".event-sticky-shell");
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const shellHeight = shell?.offsetHeight ?? window.innerHeight;
      section.style.setProperty("--event-shell-height", `${shellHeight}px`);
      section.style.setProperty("--event-sticky-top", `${Math.min(0, window.innerHeight - shellHeight)}px`);
      const distance = Math.max(1, section.offsetHeight - shellHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
        cards.forEach((card, index) => {
          const motion = eventMotion(reducedMotion.matches ? (progress < 0.5 ? 0 : 1) : progress, index);
          card.style.setProperty("--event-opacity", String(motion.opacity));
          card.style.setProperty("--event-offset", `${motion.offset.toFixed(2)}px`);
          card.style.setProperty("--event-rotate", `${motion.rotateY.toFixed(2)}deg`);
          card.style.setProperty("--event-slide", `${motion.slide.toFixed(2)}px`);
          card.style.setProperty("--event-scale", motion.scale.toFixed(3));
          card.style.setProperty("--event-sheen", motion.sheen.toFixed(3));
          card.style.visibility = motion.opacity > 0 ? "visible" : "hidden";
          card.setAttribute("aria-hidden", String(motion.opacity === 0));
          card.inert = motion.opacity === 0;
        });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onKey = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
      event.preventDefault();
      const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (forward ? section.offsetHeight - (shell?.offsetHeight ?? window.innerHeight) : 0), behavior: reducedMotion.matches ? "instant" : "smooth" });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    viewport.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      viewport.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section ref={sectionRef} data-static data-single={events.length === 1 ? "" : undefined} className="event-scroll-section relative" aria-labelledby="event-details-heading">
      <div className="event-sticky-shell">
        <div className="mx-auto w-full max-w-2xl px-5">
          <header data-reveal="up" className="text-center">
            <p className="text-xs text-gold uppercase">Ceremonies</p>
            <h2 id="event-details-heading" className="font-display mt-3 text-4xl font-light text-sage-deep sm:text-5xl">Event details</h2>
            <Divider className="mt-5" />
          </header>
          <div ref={viewportRef} data-reveal="scale" className="event-carousel-viewport mt-8 sm:mt-12" role="region" aria-label="Wedding ceremony details" tabIndex={0}>
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