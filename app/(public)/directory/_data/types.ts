export type PersonStatus = "student" | "alumni";

export interface DirectoryProfile {
  id: string;
  name: string;
  photoUrl: string;
  status: PersonStatus;
  session: string;
  batch: string;
  graduationYear?: string;
  gender?: string;
  bloodGroup?: string;
  city: string;
  country: string;
  degree?: string;
  institution?: string;
  jobIndustry?: string;
  company?: string;
}

// Mirrors the query params the directory page reads from the URL. Keys
// match the PARAM_KEYS values in `_data/filter-config.ts`, so this is the
// exact shape `page.tsx` builds from `searchParams` and hands to the
// (future) API call.
export interface DirectoryQueryParams {
  search?: string;
  type?: "all" | "students" | "alumni";
  batch?: string;
  session?: string;
  gradYear?: string;
  gender?: string;
  bloodGroup?: string;
  city?: string;
  country?: string;
  degree?: string;
  institution?: string;
  industry?: string;
  company?: string;
  page?: number;
  pageSize?: number;
}

export interface DirectoryResult {
  profiles: DirectoryProfile[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptionSet {
  batchOptions: string[];
  sessionOptions: string[];
  graduationYearOptions: string[];
  genderOptions: string[];
  bloodGroupOptions: string[];
  cityOptions: string[];
  countryOptions: string[];
  degreeOptions: string[];
  institutionOptions: string[];
  jobIndustryOptions: string[];
  companyOptions: string[];
}
