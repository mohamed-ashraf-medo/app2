import { describe, expect, it } from "vitest";
import { cn, formatArabicDate, createId } from "../utils";

describe("utils", () => {
  it("merges tailwind classes cleanly with cn()", () => {
    expect(cn("px-2 py-1", "px-4", false && "hidden")).toBe("py-1 px-4");
  });

  it("formats ISO dates in Arabic locale using Intl.DateTimeFormat", () => {
    const formatted = formatArabicDate("2026-11-25T10:00:00Z");
    expect(formatted.length).toBeGreaterThan(4);
    expect(formatted).not.toBe("Invalid Date");
  });

  it("generates distinct non-empty IDs with optional prefix", () => {
    const a = createId("cv");
    const b = createId("cv");
    expect(a.startsWith("cv_")).toBe(true);
    expect(a).not.toBe(b);
  });
});
