import "server-only";

import type { Industry } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma/prisma";

export function findDistinctBatches() {
  return prisma.profile.findMany({
    select: { batch: true },
    distinct: ["batch"],
    orderBy: { batch: "asc" },
  });
}

export function findDistinctSessions() {
  return prisma.profile.findMany({
    select: { session: true },
    distinct: ["session"],
    orderBy: { session: "asc" },
  });
}

export function findDistinctGraduationYears() {
  return prisma.profile.findMany({
    select: { graduationYear: true },
    distinct: ["graduationYear"],
    orderBy: { graduationYear: "asc" },
  });
}

export function findCountries() {
  return prisma.country.findMany({
    select: { iso2: true, name: true },
    orderBy: { name: "asc" },
  });
}

export function findCities(iso2?: string) {
  return prisma.address.findMany({
    where: iso2 ? { iso2 } : undefined,
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
}

export function findInstitutions() {
  return prisma.institution.findMany({
    select: { name: true },
    orderBy: { name: "asc" },
  });
}

export function findCompanies(industry?: Industry) {
  return prisma.company.findMany({
    where: industry ? { industry } : undefined,
    select: { name: true },
    orderBy: { name: "asc" },
  });
}
