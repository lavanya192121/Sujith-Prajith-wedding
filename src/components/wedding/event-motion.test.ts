import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { eventMotion } from "./event-motion";

describe("single-event scroll presentation", () => {
  test("starts with only the wedding and ends with only the reception", () => {
    assert.equal(eventMotion(0, 0).opacity, 1);
    assert.equal(eventMotion(0, 1).opacity, 0);
    assert.equal(eventMotion(1, 0).opacity, 0);
    assert.equal(eventMotion(1, 1).opacity, 1);
  });
  test("never displays two cards simultaneously", () => {
    for (let step = 0; step <= 1000; step++) {
      const p = step / 1000;
      assert.equal(eventMotion(p, 0).opacity > 0 && eventMotion(p, 1).opacity > 0, false);
    }
  });
  test("rotates like a turning page, not a plain fade", () => {
    assert.equal(eventMotion(0, 0).rotateY, 0);
    assert.ok(eventMotion(0.4, 0).rotateY < -30, "outgoing card turns away");
    assert.ok(eventMotion(0.6, 1).rotateY > 30, "incoming card swings in turned");
    assert.equal(eventMotion(1, 1).rotateY, 0);
  });
  test("rotation reverses continuously with scroll in the same direction", () => {
    for (let step = 100; step > 0; step--) {
      const current = step / 100;
      const previous = (step - 1) / 100;
      assert.ok(eventMotion(previous, 0).rotateY <= eventMotion(current, 0).rotateY);
      assert.ok(eventMotion(previous, 1).rotateY >= eventMotion(current, 1).rotateY);
    }
  });
  test("reverses the same continuous progression without skipping events", () => {
    assert.ok(Math.abs(eventMotion(0.35, 0).opacity - 0.5) < 0.001);
    assert.ok(Math.abs(eventMotion(0.65, 1).opacity - 0.5) < 0.001);
    for (let step = 100; step > 0; step--) {
      const current = step / 100;
      const previous = (step - 1) / 100;
      assert.ok(eventMotion(previous, 0).opacity >= eventMotion(current, 0).opacity);
      assert.ok(eventMotion(previous, 1).opacity <= eventMotion(current, 1).opacity);
    }
  });
});
