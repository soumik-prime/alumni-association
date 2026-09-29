import {
  BloodGroup,
  Degree,
  EmploymentType,
  Gender,
} from "@/generated/prisma/enums";

// Human-readable overrides for enum members whose SCREAMING_SNAKE_CASE form
// doesn't read well as plain text (e.g. "A_POSITIVE" -> "A+"). Anything not
// listed here falls back to humanize(), so this stays safe even if the
// generated enums gain members later.
const BLOOD_GROUP_OVERRIDES: Partial<Record<BloodGroup, string>> = {
  [BloodGroup.A_POSITIVE]: "A+",
  [BloodGroup.A_NEGATIVE]: "A-",
  [BloodGroup.B_POSITIVE]: "B+",
  [BloodGroup.B_NEGATIVE]: "B-",
  [BloodGroup.AB_POSITIVE]: "AB+",
  [BloodGroup.AB_NEGATIVE]: "AB-",
  [BloodGroup.O_POSITIVE]: "O+",
  [BloodGroup.O_NEGATIVE]: "O-",
};

const DEGREE_OVERRIDES: Partial<Record<Degree, string>> = {
  [Degree.SSC]: "SSC",
  [Degree.HSC]: "HSC",
  [Degree.MSC]: "MSc",
  [Degree.MPHIL]: "MPhil",
  [Degree.PHD]: "PhD",
  [Degree.POSTDOC]: "Postdoc",
};

function humanize(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatBloodGroup(value: BloodGroup): string {
  return BLOOD_GROUP_OVERRIDES[value] ?? humanize(String(value));
}

export function formatDegree(value: Degree): string {
  return DEGREE_OVERRIDES[value] ?? humanize(String(value));
}

export function formatEmploymentType(value: EmploymentType): string {
  return humanize(String(value));
}

export function formatGender(value: Gender): string {
  return humanize(String(value));
}

export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatDateRange(
  startDate: string,
  endDate: string | null,
): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  return `${start} — ${end}`;
}

export interface EnrollmentStatus {
  isCurrentStudent: boolean;
  label: string;
}

// A student is still "current" through their graduation year; only after
// that year has fully passed do we consider them alumni. This is the single
// source of truth for student-vs-alumni status, derived from graduationYear
// rather than duplicated as a separate stored flag.
export function getEnrollmentStatus(
  graduationDate?: Date | null,
): EnrollmentStatus {
  const today = new Date();

  const isCurrentStudent =
    graduationDate === undefined ||
    graduationDate === null ||
    graduationDate >= today;

  return {
    isCurrentStudent,
    label:
      graduationDate === undefined ||
      graduationDate === null ||
      isCurrentStudent
        ? "Current Student"
        : `Alumni · Class of ${graduationDate.getFullYear()}`,
  };
}