// Types for the public Alumni Association profile.
// Mirrors the underlying database schema so a future API response
// can be dropped in with no shape changes.

export type Country = {
  iso2: string;
  name: string;
  flag?: string;
};

export type Address = {
  id: string;
  city: string;
  country: Country;
};

export type Institution = {
  id: string;
  name: string;
  website?: string;
};

export type Company = {
  id: string;
  name: string;
  industry: string;
  website?: string;
};

export type HigherStudyDegree =
  | "MSc"
  | "MBA"
  | "MPhil"
  | "PhD"
  | "Postdoc"
  | "Other";

export type HigherStudy = {
  id: string;
  institution: Institution;
  degree: HigherStudyDegree;
  field?: string;
  graduation_year?: number;
};

export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Internship"
  | "Contract"
  | "Freelance"
  | "Self-employed"
  | "Temporary"
  | "Apprenticeship"
  | "Research Assistantship"
  | "Teaching Assistantship"
  | "Volunteer"
  | "Other";

export type WorkExperience = {
  id: string;
  company: Company;
  career_field?: string;
  title: string;
  employment_type: EmploymentType;
  start_date: string; // ISO date
  end_date?: string; // ISO date, absent = present
};

export type PublicationType =
  | "JOURNAL"
  | "CONFERENCE"
  | "BOOK_CHAPTER"
  | "THESIS"
  | "OTHER";

export type PublicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "PUBLISHED"
  | "REJECTED";

export type PublicationAuthor = {
  student_id?: string;
  name: string;
};

export type Publication = {
  id: string;
  title: string;
  abstract?: string;
  type: PublicationType;
  venue?: string;
  doi?: string;
  external_url?: string;
  published_year?: number;
  status: PublicationStatus;
  authors: PublicationAuthor[];
};

export type Gender = "M" | "F";

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type Profile = {
  id: string;
  reg_no: string;
  name: string;
  batch: number;
  session: string;
  graduation_year?: number;
  photo?: string;
  bio?: string;
  gender?: Gender;
  blood_group?: BloodGroup;

  email?: string;
  facebook?: string;
  github?: string;
  linkedin?: string;
  google_scholar?: string;
  portfolio?: string;

  present_address?: Address;
  permanent_address?: Address;

  ssc_institution?: Institution;
  hsc_institution?: Institution;

  visible: boolean;
  created_at: string;
  updated_at: string;

  higher_studies: HigherStudy[];
  work_experiences: WorkExperience[];
  publications: Publication[];
};
