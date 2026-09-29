import {
  BloodGroup,
  Degree,
  EmploymentType,
  Gender,
  Industry,
} from "@/generated/prisma/enums";

export interface Country {
  name: string;
}

export interface Address {
  city: string;
  country: Country;
}

export interface Institution {
  name: string;
  website?: string;
}

export interface Company {
  name: string;
  industry?: Industry;
  website?: string;
}

export interface Education {
  degree: Degree;
  field?: string;
  graduationYear?: number;
  institution: Institution;
}

export interface WorkExperience {
  company: Company;
  careerField?: string;
  title: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate: string | null;
}

export interface Publication {
  title: string;
  venue?: string;
  year?: number;
  link?: string;
  coAuthors?: string[];
}

// Not part of the shared DBML schema yet — kept optional so the Blogs tab
// can ship now and start rendering real posts as soon as this is wired up.
export interface Blog {
  title: string;
  link: string;
  publishedAt: string;
  excerpt?: string;
}

export interface Profile {
  id: string;
  name: string;
  regNo: string;
  batch: number;
  session: string;
  graduationDate?: Date;
  photo: string;
  bio?: string;
  gender?: Gender;
  bloodGroup?: BloodGroup;
  email?: string;
  facebook?: string;
  github?: string;
  linkedin?: string;
  googleScholar?: string;
  portfolio?: string;
  presentAddress?: Address;
  permanentAddress?: Address;
  educations: Education[];
  workExperience: WorkExperience[];
  publications: Publication[];
  blogs?: Blog[];
}
