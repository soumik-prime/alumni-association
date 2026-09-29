import { FEATURED_LIMIT } from "../_constants/home.constants";
import type { FeaturedProfileRow } from "../_types/home.types";

/**
 * MOCK. Replace the body with the real query once `FeaturedProfile` exists:
 *
 *   prisma.featuredProfile.findMany({
 *     where: { profile: { visible: true } },
 *     orderBy: { position: "asc" },
 *     take: limit,
 *     select: {
 *       position: true,
 *       profile: {
 *         select: {
 *           id: true, name: true, batch: true, session: true, graduationDate: true, bio: true,
 *           user: { select: { emailVerified: true } },
 *           presentAddress: { select: { city: true, country: { select: { name: true } } } },
 *           workExperiences: {
 *             orderBy: { startDate: "desc" }, take: 3,
 *             select: { title: true, endDate: true, company: { select: { name: true } } },
 *           },
 *           educations: {
 *             orderBy: { graduationYear: "desc" }, take: 3,
 *             select: { degree: true, graduationYear: true, institution: { select: { name: true } } },
 *           },
 *         },
 *       },
 *     },
 *   })
 */
export async function getFeaturedProfileRows(limit = FEATURED_LIMIT): Promise<FeaturedProfileRow[]> {
  return MOCK_ROWS.slice(0, limit);
}

const row = (
  position: number,
  p: Omit<FeaturedProfileRow["profile"], "user" | "workExperiences" | "educations"> &
    Partial<Pick<FeaturedProfileRow["profile"], "workExperiences" | "educations">>,
): FeaturedProfileRow => ({
  position,
  profile: { user: { emailVerified: true }, workExperiences: [], educations: [], ...p },
});

const MOCK_ROWS: FeaturedProfileRow[] = [
  row(1, {
    id: "mock-1", name: "Md. Rahim Hasan", batch: 8, session: "2021–22", graduationDate: new Date("2025-06-30"),
    presentAddress: { city: "Dhaka", country: { name: "Bangladesh" } },
    workExperiences: [{ title: "Software Engineer", endDate: null, company: { name: "Brightwave Software" } }],
    bio: "Builds web products for a Dhaka software team. Mentors juniors on portfolio projects and interview preparation, and stays close to the friends from Batch 8.",
  }),
  row(2, {
    id: "mock-2", name: "Nusrat Jahan", batch: 6, session: "2019–20", graduationDate: new Date("2023-06-30"),
    presentAddress: { city: "Berlin", country: { name: "Germany" } },
    educations: [{ degree: "MSC", graduationYear: 2027, institution: { name: "Lakeshore Institute of Technology" } }],
    bio: "MSc student working on language models for low-resource languages. Glad to talk through applications, references and funding for anyone planning to study abroad.",
  }),
  row(3, {
    id: "mock-3", name: "Tanvir Ahmed", batch: 4, session: "2017–18", graduationDate: new Date("2021-06-30"),
    presentAddress: { city: "Tokyo", country: { name: "Japan" } },
    educations: [{ degree: "PHD", graduationYear: null, institution: { name: "Riverbend University" } }],
    bio: "PhD candidate studying fault tolerance in large-scale systems. Started competitive programming in the department and still enjoys a good graph problem.",
  }),
  row(4, {
    id: "mock-4", name: "Sumaiya Akter", batch: 9, session: "2022–23", graduationDate: null,
    presentAddress: { city: "Netrokona", country: { name: "Bangladesh" } },
    bio: "Final-semester student who enjoys competitive programming and helping juniors with problem solving. Looking to hear from alumni about graduate school and first jobs.",
  }),
  row(5, {
    id: "mock-5", name: "Arif Chowdhury", batch: 3, session: "2016–17", graduationDate: new Date("2020-06-30"),
    presentAddress: { city: "Netrokona", country: { name: "Bangladesh" } },
    workExperiences: [{ title: "Lecturer", endDate: null, company: { name: "Riverside College" } }],
    bio: "Teaches programming and databases to college students back in Netrokona, and visits the department each year to talk with final-year students.",
  }),
  row(6, {
    id: "mock-6", name: "Farzana Sultana", batch: 7, session: "2020–21", graduationDate: new Date("2024-06-30"),
    presentAddress: { city: "Melbourne", country: { name: "Australia" } },
    workExperiences: [{ title: "Research Fellow", endDate: null, company: { name: "Cedar Valley University" } }],
    bio: "Research fellow applying machine learning to genomic data. Happy to share notes on fellowship applications and writing a first paper.",
  }),
  row(7, {
    id: "mock-7", name: "Md. Shahriar Hasan", batch: 5, session: "2018–19", graduationDate: new Date("2022-06-30"),
    presentAddress: { city: "Dhaka", country: { name: "Bangladesh" } },
    workExperiences: [{ title: "Software Engineer", endDate: null, company: { name: "Orbit Systems" } }],
    bio: "Software engineer working on web platforms and preparing for an MSc in Computer Science. Enjoys mentoring juniors from the department and sharing what worked for him.",
  }),
  row(8, {
    id: "mock-8", name: "Mehedi Islam", batch: 10, session: "2023–24", graduationDate: null,
    presentAddress: { city: "Mymensingh", country: { name: "Bangladesh" } },
    bio: "Sixth-semester student building full-stack projects for the department clubs. Curious about internships and how alumni moved into their first roles.",
  }),
];
