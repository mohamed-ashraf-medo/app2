import { z } from "zod";
import { createId } from "@/lib/utils";

export const CVLanguageSchema = z.enum(["en", "ar"]);
export type CVLanguage = z.infer<typeof CVLanguageSchema>;

export const TemplateIdSchema = z.enum([
  "classic-navy",
  "modern-indigo",
  "compact-tech",
]);
export type TemplateId = z.infer<typeof TemplateIdSchema>;

export const DensityModeSchema = z.enum(["airy", "standard", "compact"]);
export type DensityMode = z.infer<typeof DensityModeSchema>;

export const BuiltInSectionKeySchema = z.enum([
  "summary",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "languages",
]);
export type BuiltInSectionKey = z.infer<typeof BuiltInSectionKeySchema>;

export type SectionKey = BuiltInSectionKey | `custom:${string}`;

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || /^https?:\/\/.+/i.test(v) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(v),
    { message: "أدخل رابطاً صحيحاً مثل https://linkedin.com/in/username" }
  );

export const ExtraLinkSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().max(40),
  url: optionalUrl,
});

export const CVHeaderSchema = z.object({
  fullName: z.string().trim().max(120),
  headline: z.string().trim().max(140),
  location: z.string().trim().max(100),
  phone: z.string().trim().max(40),
  email: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), {
      message: "أدخل بريداً إلكترونياً صحيحاً",
    }),
  linkedin: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,
  extraLinks: z.array(ExtraLinkSchema).default([]),
});
export type CVHeader = z.infer<typeof CVHeaderSchema>;

export const SkillGroupSchema = z.object({
  id: z.string().min(1),
  category: z.string().trim().min(1, "أدخل اسم فئة المهارات").max(80),
  items: z.array(z.string().trim().min(1)).default([]),
});
export type SkillGroup = z.infer<typeof SkillGroupSchema>;

export const ProjectItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().max(120),
  subtitle: z.string().trim().max(140),
  date: z.string().trim().max(50),
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  role: z.string().trim().max(120),
  bullets: z.array(z.string().trim()).default([]),
  technologies: z.array(z.string().trim()).default([]),
});
export type ProjectItem = z.infer<typeof ProjectItemSchema>;

export const ExperienceItemSchema = z.object({
  id: z.string().min(1),
  role: z.string().trim().max(120),
  company: z.string().trim().max(120),
  location: z.string().trim().max(80),
  startDate: z.string().trim().max(40),
  endDate: z.string().trim().max(40),
  isCurrent: z.boolean().default(false),
  bullets: z.array(z.string().trim()).default([]),
});
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

export const EducationItemSchema = z.object({
  id: z.string().min(1),
  degree: z.string().trim().max(160),
  institution: z.string().trim().max(160),
  startDate: z.string().trim().max(40),
  endDate: z.string().trim().max(40),
  gpa: z.string().trim().max(40).default(""),
  details: z.string().trim().max(240).default(""),
});
export type EducationItem = z.infer<typeof EducationItemSchema>;

export const CertificationItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().max(180),
  issuer: z.string().trim().max(140),
  date: z.string().trim().max(50),
  credentialUrl: optionalUrl.default(""),
});
export type CertificationItem = z.infer<typeof CertificationItemSchema>;

export const LanguageItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().max(60),
  proficiency: z.string().trim().max(80),
});
export type LanguageItem = z.infer<typeof LanguageItemSchema>;

export const CustomEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().max(140),
  subtitle: z.string().trim().max(140).default(""),
  date: z.string().trim().max(50).default(""),
  url: optionalUrl.default(""),
  bullets: z.array(z.string().trim()).default([]),
});
export type CustomEntry = z.infer<typeof CustomEntrySchema>;

export const CustomSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1, "أدخل عنوان القسم المخصص").max(90),
  displayMode: z.enum(["bullets", "entries"]).default("bullets"),
  bullets: z.array(z.string().trim()).default([]),
  entries: z.array(CustomEntrySchema).default([]),
});
export type CustomSection = z.infer<typeof CustomSectionSchema>;

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "summary",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "languages",
];

export const CVDocumentSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(120),
  language: CVLanguageSchema.default("en"),
  templateId: TemplateIdSchema.default("classic-navy"),
  density: DensityModeSchema.default("standard"),
  targetTrackId: z.string().min(1).default("frontend"),
  sectionOrder: z.array(z.string()).default(DEFAULT_SECTION_ORDER),
  hiddenSections: z.array(z.string()).default([]),
  header: CVHeaderSchema,
  summary: z.string().trim().max(1600).default(""),
  skillGroups: z.array(SkillGroupSchema).default([]),
  projects: z.array(ProjectItemSchema).default([]),
  experience: z.array(ExperienceItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  certifications: z.array(CertificationItemSchema).default([]),
  languages: z.array(LanguageItemSchema).default([]),
  customSections: z.array(CustomSectionSchema).default([]),
  isPublic: z.boolean().default(false),
  shareId: z.string().optional(),
  ownerUid: z.string().optional(),
  updatedAt: z.string().min(1),
});

export type CVDocument = z.infer<typeof CVDocumentSchema>;

export function createEmptyCV(
  language: CVLanguage = "en",
  targetTrackId = "frontend",
  title?: string
): CVDocument {
  return {
    id: createId("cv"),
    title: title || (language === "ar" ? "سيرة ذاتية جديدة" : "New ATS Resume"),
    language,
    templateId: "classic-navy",
    density: "standard",
    targetTrackId,
    sectionOrder: [...DEFAULT_SECTION_ORDER],
    hiddenSections: [],
    header: {
      fullName: "",
      headline: "",
      location: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
      portfolio: "",
      extraLinks: [],
    },
    summary: "",
    skillGroups: [],
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    customSections: [],
    isPublic: false,
    updatedAt: new Date().toISOString(),
  };
}
