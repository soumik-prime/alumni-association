// Single source of truth for the filter shape shared by Filter.tsx,
// MobileFilter.tsx and FilterChip.tsx. Previously each component kept its
// own copy of FilterState / DEFAULT_FILTERS / PARAM_KEYS, which had already
// drifted out of sync (FilterChip was reading param names that Filter never
// wrote). Import from here instead of redefining.

export type CommunityType = "all" | "students" | "alumni";

export interface FilterState {
  communityType: CommunityType;
  batch: string;
  session: string;
  graduationYear: string;
  gender: string;
  bloodGroup: string;
  city: string;
  country: string;
  degree: string;
  institution: string;
  jobIndustry: string;
  company: string;
}

export const DEFAULT_FILTERS: FilterState = {
  communityType: "all",
  batch: "All batches",
  session: "All sessions",
  graduationYear: "Any year",
  gender: "Any",
  bloodGroup: "Any",
  city: "Any city",
  country: "Any country",
  degree: "Any degree",
  institution: "Any institution",
  jobIndustry: "Any industry",
  company: "Any company",
};

// FilterState key -> URL search param name.
export const PARAM_KEYS: Record<keyof FilterState, string> = {
  communityType: "type",
  batch: "batch",
  session: "session",
  graduationYear: "gradYear",
  gender: "gender",
  bloodGroup: "bloodGroup",
  city: "city",
  country: "country",
  degree: "degree",
  institution: "institution",
  jobIndustry: "industry",
  company: "company",
};

// Human-readable label for each param key, used by FilterChip so removable
// chips read "Batch: 04" instead of the raw param name.
export const PARAM_LABELS: Record<string, string> = {
  type: "Type",
  batch: "Batch",
  session: "Session",
  gradYear: "Grad. year",
  gender: "Gender",
  bloodGroup: "Blood group",
  city: "City",
  country: "Country",
  degree: "Degree",
  institution: "Institution",
  industry: "Industry",
  company: "Company",
};
