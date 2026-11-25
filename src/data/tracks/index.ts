import type { ATSTrack, TrackId } from "@/types/analyzer";
import { FRONTEND_TRACK } from "./frontend";
import { BACKEND_TRACK } from "./backend";
import { FULLSTACK_TRACK } from "./fullstack";
import { SWE_TRACK } from "./swe";
import { MOBILE_TRACK } from "./mobile";
import { AI_DATA_TRACK } from "./ai-data";
import { DEVOPS_TRACK } from "./devops";
import { UI_UX_TRACK } from "./ui-ux";
import { QA_SECURITY_TRACK } from "./qa-security";
import { CUSTOM_TRACK } from "./custom";

export const ATS_TRACKS: ATSTrack[] = [
  FRONTEND_TRACK,
  BACKEND_TRACK,
  FULLSTACK_TRACK,
  SWE_TRACK,
  MOBILE_TRACK,
  AI_DATA_TRACK,
  DEVOPS_TRACK,
  UI_UX_TRACK,
  QA_SECURITY_TRACK,
  CUSTOM_TRACK,
];

const TRACK_MAP = new Map<string, ATSTrack>(
  ATS_TRACKS.map((track) => [track.id, track])
);

export function getTrackById(id: string): ATSTrack {
  return TRACK_MAP.get(id) ?? FRONTEND_TRACK;
}

export function isValidTrackId(id: string): id is TrackId {
  return TRACK_MAP.has(id);
}

export function getAllTrackSkillAliases(): Map<string, string> {
  const aliasMap = new Map<string, string>();
  for (const track of ATS_TRACKS) {
    for (const phase of track.roadmapPhases) {
      for (const node of phase.nodes) {
        for (const alias of node.aliases) {
          const normalized = alias.toLowerCase().trim();
          if (normalized && !aliasMap.has(normalized)) {
            aliasMap.set(normalized, node.label);
          }
        }
      }
    }
  }
  return aliasMap;
}
