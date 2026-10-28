// One event card at a time. The outgoing card turns away like a page
// being lifted, and the incoming card swings into view from the same
// side — a continuous 3D rotation that clearly signals the change.
export function eventMotion(progress: number, index: number) {
  const p = Math.max(0, Math.min(1, progress));
  const phase = index === 0
    ? Math.max(0, Math.min(1, (p - 0.2) / 0.3))
    : Math.max(0, Math.min(1, (p - 0.5) / 0.3));
  const eased = phase * phase * (3 - 2 * phase);
  const exit = index === 0;
  return {
    opacity: exit ? 1 - eased : eased,
    offset: exit ? -36 * eased : 36 * (1 - eased),
    rotateY: exit ? -62 * eased : 62 * (1 - eased),
    slide: exit ? -64 * eased : 64 * (1 - eased),
    scale: exit ? 1 - 0.1 * eased : 0.9 + 0.1 * eased,
    sheen: 4 * eased * (1 - eased),
  };
}
