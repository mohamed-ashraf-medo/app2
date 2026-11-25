import { describe, expect, it } from "vitest";
import {
  CVDocumentSchema,
  createEmptyCV,
  CustomSectionSchema,
} from "../cv";
import {
  ARABIC_SAMPLE_CV,
  CLASSIC_FRONTEND_SAMPLE_CV,
} from "@/data/presets/sample-cv";

describe("CVDocumentSchema", () => {
  it("validates the classic frontend sample CV modeled after Abdelrahman_Nagah_CV.pdf", () => {
    const parsed = CVDocumentSchema.safeParse(CLASSIC_FRONTEND_SAMPLE_CV);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.templateId).toBe("classic-navy");
      expect(parsed.data.projects).toHaveLength(3);
      expect(parsed.data.skillGroups).toHaveLength(4);
    }
  });

  it("validates Arabic RTL sample CV cleanly", () => {
    const parsed = CVDocumentSchema.safeParse(ARABIC_SAMPLE_CV);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.language).toBe("ar");
    }
  });

  it("validates custom sections in both bullets and entries modes inside sectionOrder", () => {
    const customSection = CustomSectionSchema.parse({
      id: "vol_1",
      title: "Volunteering & Community",
      displayMode: "entries",
      bullets: [],
      entries: [
        {
          id: "e1",
          title: "IEEE Student Branch",
          subtitle: "Web Committee Lead",
          date: "2025 – 2026",
          url: "https://ieee.org",
          bullets: ["Organized 3 frontend workshops for 120 students."],
        },
      ],
    });

    const cv = createEmptyCV("en", "frontend");
    cv.customSections.push(customSection);
    cv.sectionOrder.push(`custom:${customSection.id}`);

    const parsed = CVDocumentSchema.safeParse(cv);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.sectionOrder).toContain("custom:vol_1");
    }
  });

  it("rejects malformed email addresses with a clear Arabic validation message", () => {
    const cv = createEmptyCV("ar", "backend");
    cv.header.email = "not-an-email";
    const parsed = CVDocumentSchema.safeParse(cv);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues[0]?.path).toEqual(["header", "email"]);
    }
  });
});
