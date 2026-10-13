import { describe, expect, test } from "bun:test";
import { eventMotion } from "./event-motion";

describe("single-event scroll presentation", () => {
  test("starts with only the wedding and ends with only the reception", () => {
    expect(eventMotion(0, 0).opacity).toBe(1);
    expect(eventMotion(0, 1).opacity).toBe(0);
    expect(eventMotion(1, 0).opacity).toBe(0);
    expect(eventMotion(1, 1).opacity).toBe(1);
  });
  test("never displays two cards simultaneously", () => {
    for (let step = 0; step <= 1000; step++) {
      const p = step / 1000;
      expect(eventMotion(p, 0).opacity > 0 && eventMotion(p, 1).opacity > 0).toBe(false);
    }
  });
  test("reverses the same continuous progression without skipping events", () => {
    expect(eventMotion(0.35, 0).opacity).toBeCloseTo(0.5);
    expect(eventMotion(0.65, 1).opacity).toBeCloseTo(0.5);
    for (let step = 100; step > 0; step--) {
      const current = step / 100;
      const previous = (step - 1) / 100;
      expect(eventMotion(previous, 0).opacity).toBeGreaterThanOrEqual(eventMotion(current, 0).opacity);
      expect(eventMotion(previous, 1).opacity).toBeLessThanOrEqual(eventMotion(current, 1).opacity);
    }
  });
});