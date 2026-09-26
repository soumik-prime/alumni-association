import type { Prisma } from "@/generated/prisma/client";

import { enumMappings } from "../_constants/enum-mapping";
import { DEFAULT_PAGE_SIZE } from "../_constants/filter-defaults";
import {
  countProfiles,
  findProfiles,
  type ProfileListRow,
} from "../_repositories/profile.repository";
import type { DirectoryResult, Profile } from "../_types/profile.types";
import type { QueryParams } from "../_types/query-params.types";

/** Translates user-facing filter values into a Prisma where-clause. */
function buildProfileWhere(query: QueryParams, currentYear: number) {
  const conditions: Prisma.ProfileWhereInput[] = [];
  conditions.push({ visible: true });

  const search = query.search?.trim();
  const session = query.session?.trim();
  const city = query.city?.trim();
  const country = query.country?.trim();
  const institution = query.institution?.trim();
  const company = query.company?.trim();

  if (search) {
    conditions.push({
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { regNo: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  if (query.batch) {
    conditions.push({ batch: query.batch });
  }

  if (session) {
    conditions.push({ session });
  }

  if (query.gradYear) {
    conditions.push({ graduationYear: query.gradYear });
  }

  if (query.gender) {
    conditions.push({ gender: enumMappings.gender[query.gender] });
  }

  if (query.bloodGroup) {
    conditions.push({ bloodGroup: enumMappings.bloodGroup[query.bloodGroup] });
  }

  if (query.type && query.type !== "all") {
    conditions.push(
      query.type === "students"
        ? {
            OR: [
              { graduationYear: null },
              { graduationYear: { gte: currentYear } },
            ],
          }
        : { graduationYear: { lt: currentYear } },
    );
  }

  if (city) {
    conditions.push({
      OR: [
        { permanentAddress: { city: { contains: city, mode: "insensitive" } } },
        { presentAddress: { city: { contains: city, mode: "insensitive" } } },
      ],
    });
  }

  if (country) {
    conditions.push({
      OR: [
        {
          permanentAddress: {
            country: { name: { contains: country, mode: "insensitive" } },
          },
        },
        {
          presentAddress: {
            country: { name: { contains: country, mode: "insensitive" } },
          },
        },
      ],
    });
  }

  if (query.degree) {
    conditions.push({
      educations: { some: { degree: enumMappings.degree[query.degree] } },
    });
  }

  if (institution) {
    conditions.push({
      educations: {
        some: {
          institution: { name: { contains: institution, mode: "insensitive" } },
        },
      },
    });
  }

  if (query.industry) {
    conditions.push({
      workExperiences: {
        some: {
          company: { industry: enumMappings.jobIndustry[query.industry] },
        },
      },
    });
  }

  if (company) {
    conditions.push({
      workExperiences: {
        some: { company: { name: { contains: company, mode: "insensitive" } } },
      },
    });
  }

  return { AND: conditions } satisfies Prisma.ProfileWhereInput;
}

/** Maps a raw DB row to the DTO the UI is built around. */
function toProfileDTO(row: ProfileListRow, currentYear: number): Profile {
  const status: Profile["status"] =
    row.graduationYear === null || row.graduationYear >= currentYear
      ? "student"
      : "alumni";

  return {
    id: row.id,
    regNo: row.regNo,
    name: row.name,
    photoUrl: row.photo ?? "/placeholder.webp",
    status,
    session: row.session,
    batch: String(row.batch),
    graduationYear: row.graduationYear ? String(row.graduationYear) : undefined,
    gender: row.gender ?? undefined,
    bloodGroup: row.bloodGroup ?? undefined,
    city: row.presentAddress?.city ?? row.permanentAddress?.city ?? "Unknown",
    country:
      row.presentAddress?.country?.name ??
      row.permanentAddress?.country?.name ??
      "Unknown",
  };
}

/**
 * Single entry point the directory route calls. Reads only, so it's called
 * straight from a Server Component — no "use server" needed here (that's
 * reserved for the _actions layer once mutations are added).
 */
export async function getDirectoryProfiles(
  query: QueryParams = {},
): Promise<DirectoryResult> {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;
  const currentYear = new Date().getFullYear();

  const where = buildProfileWhere(query, currentYear);

  const [total, rows] = await Promise.all([
    countProfiles(where),
    findProfiles({ where, skip: (page - 1) * pageSize, take: pageSize }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  return {
    profiles: rows.map((row) => toProfileDTO(row, currentYear)),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}
