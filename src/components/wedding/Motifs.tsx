export function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M50 54c0-14 4-26 12-34-1 12-4 24-12 34Z" />
        <path d="M50 54c0-14-4-26-12-34 1 12 4 24 12 34Z" />
        <path d="M50 54c6-11 15-19 26-22-6 10-15 18-26 22Z" />
        <path d="M50 54c-6-11-15-19-26-22 6 10 15 18 26 22Z" />
        <path d="M50 54c9-6 20-8 31-6-9 6-20 8-31 6Z" />
        <path d="M50 54c-9-6-20-8-31-6 9 6 20 8 31 6Z" />
        <path d="M50 54c0-9 2-17 6-23" opacity="0.5" />
      </g>
    </svg>
  );
}

export function PeacockFeather({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 140" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M30 140V52" />
        <ellipse cx="30" cy="34" rx="15" ry="21" />
        <ellipse cx="30" cy="32" rx="8" ry="11" />
        <circle cx="30" cy="30" r="4" />
        {Array.from({ length: 11 }).map((_, i) => {
          const a = (-70 + i * 14) * (Math.PI / 180);
          return (
            <path
              key={i}
              d={`M30 52 L${Number((30 + Math.sin(a) * 26).toFixed(2))} ${Number((52 - Math.cos(a) * 30).toFixed(2))}`}
              opacity="0.55"
            />
          );
        })}
      </g>
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="gold-rule h-px w-16 sm:w-28" />
      <LotusMark className="h-6 w-10 text-gold" />
      <span className="gold-rule h-px w-16 sm:w-28" />
    </div>
  );
}

const r2 = (n: number) => Number(n.toFixed(2));

export function MandalaRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth="0.8">
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="82" strokeDasharray="2 6" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          return (
            <path
              key={i}
              d={`M${r2(100 + Math.cos(a) * 66)} ${r2(100 + Math.sin(a) * 66)} l${r2(Math.cos(a) * 12)} ${r2(Math.sin(a) * 12)}`}
            />
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={r2(100 + Math.cos(a) * 52)}
              cy={r2(100 + Math.sin(a) * 52)}
              rx="10"
              ry="4"
              transform={`rotate(${i * 30} ${r2(100 + Math.cos(a) * 52)} ${r2(100 + Math.sin(a) * 52)})`}
            />
          );
        })}
      </g>
    </svg>
  );
}
