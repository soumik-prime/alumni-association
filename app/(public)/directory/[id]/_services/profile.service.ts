import { findProfileByReg } from "../_repositories/profile.repository";
import type { Profile } from "../_types/profile.types";

type DatabaseProfile = NonNullable<
  Awaited<ReturnType<typeof findProfileByReg>>
>;

function toProfile(row: DatabaseProfile): Profile {
  return {
    id: row.id,
    name: row.name,
    regNo: row.regNo,
    batch: row.batch,
    session: row.session,
    graduationDate: row.graduationDate ?? undefined,
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

export async function getProfileByRegNo(
  regNo: string,
): Promise<Profile | null> {
  const row = await findProfileByReg(regNo);
  return row ? toProfile(row) : null;
}
