import { cache } from "react";
import { prisma } from "@/lib/prisma/prisma";

export const getOwnProfile = cache((userId: string) =>
  prisma.profile.findUnique({ where: { userId } }),
);

export const getProfileByUser = getOwnProfile;

export const getInstitutions = cache(() =>
  prisma.institution.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
);

export const getCompanies = cache(() =>
  prisma.company.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
);

export const getCountries = cache(() =>
  prisma.country.findMany({ orderBy: { name: "asc" }, select: { iso2: true, name: true, flag: true } }),
);
