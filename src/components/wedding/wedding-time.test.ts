import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

describe("confirmed wedding time", () => {
  test("event card and countdown both use the updated start time", () => {
    const eventCard = readFileSync(new URL("./EventCarousel.tsx", import.meta.url), "utf8");
    const countdown = readFileSync(new URL("./Countdown.tsx", import.meta.url), "utf8");

    assert.match(eventCard, /time: "12:18 PM – 12:40 PM"/);
    assert.match(countdown, /2026-12-12T12:18:00\+05:30/);
  });
});