import type { Profile, WorkExperience } from "./profile";

/** Current role = the work experience with no end_date, else the most recent by start_date. */
export function getCurrentExperience(
  experiences: WorkExperience[]
): WorkExperience | undefined {
  if (experiences.length === 0) return undefined;
  const ongoing = experiences.find((e) => !e.end_date);
  if (ongoing) return ongoing;
  return [...experiences].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  )[0];
}

/** Newest-first ordering for the experience timeline. */
export function sortExperiencesDesc(
  experiences: WorkExperience[]
): WorkExperience[] {
  return [...experiences].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );
}

export function formatMonthYear(iso?: string): string {
  if (!iso) return "Present";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatUpdatedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diffDays = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Updated today";
  if (diffDays < 30) return `Updated ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return `Updated ${d.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function sameAddress(
  a?: Profile["present_address"],
  b?: Profile["permanent_address"]
): boolean {
  if (!a || !b) return false;
  return a.city === b.city && a.country.iso2 === b.country.iso2;
}

const PUBLICATION_TYPE_LABEL: Record<string, string> = {
  JOURNAL: "Journal",
  CONFERENCE: "Conference",
  BOOK_CHAPTER: "Book Chapter",
  THESIS: "Thesis",
  OTHER: "Other",
};

export function publicationTypeLabel(type: string): string {
  return PUBLICATION_TYPE_LABEL[type] ?? type;
}

const PUBLICATION_STATUS_LABEL: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  PUBLISHED: "Published",
  REJECTED: "Rejected",
};

export function publicationStatusLabel(status: string): string {
  return PUBLICATION_STATUS_LABEL[status] ?? status;
}
