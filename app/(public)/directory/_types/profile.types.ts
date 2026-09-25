export type PersonStatus = "student" | "alumni";

export interface Profile {
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

export interface DirectoryResult {
  profiles: Profile[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
