export function eventMotion(progress: number, index: number) {
  const p = Math.max(0, Math.min(1, progress));
  const phase = index === 0
    ? Math.max(0, Math.min(1, (p - 0.2) / 0.3))
    : Math.max(0, Math.min(1, (p - 0.5) / 0.3));
  const eased = phase * phase * (3 - 2 * phase);
  return {
    opacity: index === 0 ? 1 - eased : eased,
    offset: index === 0 ? -36 * eased : 36 * (1 - eased),
  };
}