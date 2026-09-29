import { STUDY_HEADLINES } from "../_constants/home.constants";
import type { FeaturedProfileRow, MemberStatus } from "../_types/home.types";

export const getMemberStatus = (graduationDate: Date | null): MemberStatus =>
  graduationDate === null ? "current" : "alumni";

export const getInitials = (name: string) =>
  name
    .replace(/^Md\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

export function buildHeadline(profile: FeaturedProfileRow["profile"], now = new Date()): string {
  if (getMemberStatus(profile.graduationDate) === "current") return "CSE Student";

  const job = profile.workExperiences.find((w) => w.endDate === null);
  if (job) return `${job.title} at ${job.company.name}`;

  const study = profile.educations.find(
    (e) => STUDY_HEADLINES[e.degree] && (e.graduationYear === null || e.graduationYear >= now.getFullYear()),
  );
  if (study) return `${STUDY_HEADLINES[study.degree]}, ${study.institution.name}`;

  return "CSE Graduate";
}
