// Route-level defaults shared by the page (server) and the filter UI (client).
// Nothing here touches the database — it's config, not data access.

export const DEFAULT_PAGE_SIZE = 12;

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
