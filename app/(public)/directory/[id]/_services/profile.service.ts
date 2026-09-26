import {
  BloodGroup,
  Degree,
  EmploymentType,
  Gender,
  Industry,
} from "@/generated/prisma/enums";
import { findProfileByReg } from "../_repositories/profile.repository";
import type { Profile } from "../_types/profile.types";

type DatabaseProfile = NonNullable<Awaited<ReturnType<typeof findProfileByReg>>>;

function toProfile(row: DatabaseProfile): Profile {
  return {
    id: row.id,
    name: row.name,
    regNo: row.regNo,
    batch: row.batch,
    session: row.session,
    graduationYear: row.graduationYear ?? undefined,
    photo: row.photo ?? "/placeholder.webp",
    bio: row.bio ?? undefined,
    gender: row.gender ?? undefined,
    bloodGroup: row.bloodGroup ?? undefined,
    email: row.email ?? undefined,
    facebook: row.facebook ?? undefined,
    github: row.github ?? undefined,
    linkedin: row.linkedin ?? undefined,
    googleScholar: row.googleScholar ?? undefined,
    portfolio: row.portfolio ?? undefined,
    presentAddress: row.presentAddress
      ? {
          city: row.presentAddress.city,
          country: { name: row.presentAddress.country.name },
        }
      : undefined,
    permanentAddress: row.permanentAddress
      ? {
          city: row.permanentAddress.city,
          country: { name: row.permanentAddress.country.name },
        }
      : undefined,
    educations: row.educations.map((education) => ({
      degree: education.degree,
      field: education.field ?? undefined,
      graduationYear: education.graduationYear ?? undefined,
      institution: {
        name: education.institution.name,
        website: education.institution.website ?? undefined,
      },
    })),
    workExperience: row.workExperiences.map((experience) => ({
      company: {
        name: experience.company.name,
        industry: experience.company.industry ?? undefined,
        website: experience.company.website ?? undefined,
      },
      careerField: experience.careerField ?? undefined,
      title: experience.title,
      employmentType: experience.employmentType,
      startDate: experience.startDate.toISOString(),
      endDate: experience.endDate?.toISOString() ?? null,
    })),
    publications: row.publicationAuthors.map(({ publication }) => {
      const coAuthors = publication.authors
        .filter((author) => author.studentId !== row.id)
        .map((author) => author.externalName ?? author.student?.name)
        .filter((name): name is string => Boolean(name));

      return {
        title: publication.title,
        venue: publication.venue ?? undefined,
        year: publication.publishedYear ?? undefined,
        link:
          publication.externalUrl ??
          (publication.doi ? `https://doi.org/${publication.doi}` : undefined),
        coAuthors: coAuthors.length > 0 ? coAuthors : undefined,
      };
    }),
  };
}

export async function getProfileByRegNo(regNo: string): Promise<Profile | null> {
  const row = await findProfileByReg(regNo);
  return row ? toProfile(row) : null;
}

export function getDemoProfile(): Profile {
  const profile: Profile = {
    id: "202204023",
    name: "Md. Samiul Islam Soumik",
    regNo: "202204023",
    batch: 4,
    session: "2022-23",
    graduationYear: 2028,
    photo: "/placeholder.webp",
    bio: "Competitive Programmer | MERN Stack Developer",
    gender: Gender.MALE,
    bloodGroup: BloodGroup.A_POSITIVE,
    email: "soumik.shu@gmail.com",
    facebook: "https://www.facebook.com/soumik.primee",
    github: "https://github.com/soumik-prime",
    linkedin: "https://www.linkedin.com/in/soumik-prime",
    googleScholar: "https://scholar.google.com",
    portfolio: "https://www.facebook.com/soumik.primee",
    presentAddress: {
      city: "Netrokona",
      country: {
        name: "Bangladesh",
      },
    },
    permanentAddress: {
      city: "Thakurgaon",
      country: {
        name: "Bangladesh",
      },
    },
    educations: [
      {
        degree: Degree.SSC,
        graduationYear: 2020,
        field: "Science",
        institution: {
          name: "Thakurgaon Govt. Boys' High School, Thakurgaon",
          website: "https://www.tgbhs.edu.bd/",
        },
      },
      {
        degree: Degree.HSC,
        institution: {
          name: "Carmichael College, Rangpur",
        },
      },
      {
        degree: Degree.PHD,
        field: "Computer Science & Engineering",
        graduationYear: 2030,
        institution: {
          name: "MIT",
        },
      },
    ],
    workExperience: [
      {
        company: {
          name: "Brain Station 23",
          industry: Industry.SOFTWARE_IT,
          website: "https://brainstation-23.com",
        },
        careerField: "Backend Development",
        title: "Software Engineer",
        employmentType: EmploymentType.FULL_TIME,
        startDate: "2025-01-15T00:00:00.000Z",
        endDate: null,
      },
      {
        company: {
          name: "Therap (BD) Ltd.",
          industry: Industry.SOFTWARE_IT,
          website: "https://therapservices.net",
        },
        careerField: "Web Development",
        title: "Software Engineering Intern",
        employmentType: EmploymentType.INTERNSHIP,
        startDate: "2024-06-01T00:00:00.000Z",
        endDate: "2024-12-15T00:00:00.000Z",
      },
    ],
    publications: [
      {
        title:
          "Optimizing Query Response Time in Sparse Graph Databases Using Bitmask DP",
        venue:
          "International Conference on Computer & Information Technology (ICCIT)",
        year: 2027,
        link: "https://scholar.google.com",
        coAuthors: ["Dr. A. Rahman", "T. Chowdhury"],
      },
      {
        title: "A Lightweight Approach to Offline-First Alumni Directories",
        venue: "NEU Journal of Computer Science, Vol. 3",
        year: 2028,
        link: "https://scholar.google.com",
      },
    ],
  };

  return profile;
}
