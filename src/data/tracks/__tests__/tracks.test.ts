import { describe, expect, it } from "vitest";
import { ATS_TRACKS, getTrackById } from "../index";

describe("ATS Tracks & Roadmap Registry", () => {
  const expectedIds = [
    "frontend",
    "backend",
    "fullstack",
    "swe",
    "mobile",
    "ai-data",
    "devops",
    "ui-ux",
    "qa-security",
    "custom",
  ] as const;

  it("provides all 9 tech ATS tracks plus the universal custom track", () => {
    expect(ATS_TRACKS).toHaveLength(10);
    for (const id of expectedIds) {
      const track = getTrackById(id);
      expect(track.id).toBe(id);
      expect(track.nameAr.length).toBeGreaterThan(2);
      expect(track.summaryPresets.length).toBeGreaterThanOrEqual(2);
      expect(track.bulletPresets.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("ensures every tech track has a valid acyclic roadmap with >= 4 phases and >= 12 nodes", () => {
    const techTracks = ATS_TRACKS.filter((t) => t.id !== "custom");
    for (const track of techTracks) {
      expect(track.roadmapPhases.length).toBeGreaterThanOrEqual(4);
      const allNodeIds = new Set<string>();
      for (const phase of track.roadmapPhases) {
        for (const node of phase.nodes) {
          expect(allNodeIds.has(node.id)).toBe(false);
          allNodeIds.add(node.id);
          expect(node.aliases.length).toBeGreaterThanOrEqual(1);
        }
      }
      expect(allNodeIds.size).toBeGreaterThanOrEqual(12);

      for (const phase of track.roadmapPhases) {
        for (const node of phase.nodes) {
          for (const reqId of node.requires ?? []) {
            expect(allNodeIds.has(reqId)).toBe(true);
            expect(reqId).not.toBe(node.id);
          }
        }
      }
    }
  });
});
