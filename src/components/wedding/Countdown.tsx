import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-12T10:00:00+05:30").getTime();

function parts(diff: number) {
  const clamped = Math.max(diff, 0);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = parts(now === null ? TARGET : TARGET - now);
  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="glass-card rounded-2xl px-3 py-5 text-center sm:px-5 sm:py-7"
        >
          <div className="font-display text-4xl leading-none font-light text-sage-deep tabular-nums sm:text-5xl">
            {now === null ? "--" : String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
