export type TrackId =
  | "frontend"
  | "backend"
  | "fullstack"
  | "swe"
  | "mobile"
  | "ai-data"
  | "devops"
  | "ui-ux"
  | "qa-security"
  | "custom";

export type SkillPriority = "core" | "important" | "bonus";

export interface RoadmapNode {
  id: string;
  label: string;
  labelAr: string;
  category: string;
  priority: SkillPriority;
  aliases: string[];
  requires?: string[];
  whyItMattersAr: string;
  projectIdeaAr: string;
  sampleBulletEn: string;
  sampleBulletAr: string;
}

export interface RoadmapPhase {
  id: string;
  titleAr: string;
  subtitleAr: string;
  nodes: RoadmapNode[];
}

export interface TrackSummaryPreset {
  id: string;
  levelAr: string;
  en: string;
  ar: string;
}

export interface TrackBulletPreset {
  id: string;
  categoryAr: string;
  en: string;
  ar: string;
}

export interface TrackSkillGroupPreset {
  categoryEn: string;
  categoryAr: string;
  skills: string[];
}

export interface ATSTrack {
  id: TrackId;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  accentHue: string;
  recommendedSections: string[];
  skillBank: TrackSkillGroupPreset[];
  summaryPresets: TrackSummaryPreset[];
  bulletPresets: TrackBulletPreset[];
  roadmapPhases: RoadmapPhase[];
}

export type ATSIssueSeverity = "critical" | "warning" | "tip";

export interface ATSIssue {
  id: string;
  severity: ATSIssueSeverity;
  pillar: "format" | "keywords" | "impact" | "completeness";
  titleAr: string;
  descriptionAr: string;
  fixActionAr: string;
  targetSectionId: string;
}

export interface ATSPillarScore {
  id: "format" | "keywords" | "impact" | "completeness";
  labelAr: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface ATSReport {
  overallScore: number;
  gradeLabelAr: string;
  pillars: ATSPillarScore[];
  issues: ATSIssue[];
  matchedCoreSkills: string[];
  missingCoreSkills: string[];
  provenSkills: string[];
  mentionedOnlySkills: string[];
  strongVerbCount: number;
  quantifiedBulletCount: number;
  totalBulletCount: number;
  wordCount: number;
  estimatedPageRatio: number;
}

export type NodeStatus = "proven" | "mentioned" | "missing";

export interface EvaluatedRoadmapNode extends RoadmapNode {
  status: NodeStatus;
  evidenceSources: string[];
  phaseId: string;
  phaseTitleAr: string;
}

export interface EvaluatedRoadmapPhase {
  id: string;
  titleAr: string;
  subtitleAr: string;
  nodes: EvaluatedRoadmapNode[];
  provenCount: number;
  mentionedCount: number;
  missingCount: number;
  completionPercentage: number;
}

export interface RoadmapEvaluation {
  trackId: TrackId;
  phases: EvaluatedRoadmapPhase[];
  totalNodes: number;
  provenCount: number;
  mentionedCount: number;
  missingCount: number;
  readinessPercentage: number;
  nextSteps: EvaluatedRoadmapNode[];
}

export interface JDMatchResult {
  hasInput: boolean;
  matchPercentage: number;
  totalExtracted: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  roleLevelDetectedAr: string;
}
