import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../rateLimit";

describe("checkRateLimit", () => {
  it("allows requests under the limit", () => {
    const id = `test-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) {
      expect(checkRateLimit(id).allowed).toBe(true);
    }
  });

  it("blocks requests over the limit within the window", () => {
    const id = `test-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) {
      checkRateLimit(id);
    }
    expect(checkRateLimit(id).allowed).toBe(false);
  });

  it("tracks different identifiers independently", () => {
    const idA = `test-a-${Math.random()}`;
    const idB = `test-b-${Math.random()}`;
    for (let i = 0; i < 5; i += 1) {
      checkRateLimit(idA);
    }
    expect(checkRateLimit(idA).allowed).toBe(false);
    expect(checkRateLimit(idB).allowed).toBe(true);
  });
});
