import { prisma } from "@/lib/prisma/prisma";
import { INDUSTRY_LABEL, NEW_OPTION } from "../_constants/options";
import { P } from "../_constants/permissions";
import { optEnum, optStr, optUrl, required, str } from "./form";
import { need } from "./guards";
import type { Access } from "./permissions";

/** Existing institution by id, or (with permission) find-or-create by name. */
export async function resolveInstitution(fd: FormData, me: Access): Promise<string> {
  const choice = required(str(fd, "institutionId"), "Institution");
  if (choice !== NEW_OPTION) {
    const found = await prisma.institution.findUnique({ where: { id: choice }, select: { id: true } });
    need(found !== null, "That institution no longer exists.");
    return found.id;
  }
  need(me.can(P.institutionsCreate), "You can only pick from the existing institutions. Ask an administrator to add a new one.");
  const name = required(str(fd, "newInstitutionName"), "Institution name", 200);
  const website = optUrl(optStr(fd, "newInstitutionWebsite"), "Institution website");
  const existing = await prisma.institution.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
    select: { id: true },
  });
  if (existing) return existing.id;
  return (await prisma.institution.create({ data: { name, website }, select: { id: true } })).id;
}

/** Existing company by id, or (with permission) find-or-create by name. */
export async function resolveCompany(fd: FormData, me: Access): Promise<string> {
  const choice = required(str(fd, "companyId"), "Company");
  if (choice !== NEW_OPTION) {
    const found = await prisma.company.findUnique({ where: { id: choice }, select: { id: true } });
    need(found !== null, "That company no longer exists.");
    return found.id;
  }
  need(me.can(P.companiesCreate), "You can only pick from the existing companies. Ask an administrator to add a new one.");
  const name = required(str(fd, "newCompanyName"), "Company name", 200);
  const industry = optEnum(str(fd, "newCompanyIndustry"), INDUSTRY_LABEL, "industry");
  const website = optUrl(optStr(fd, "newCompanyWebsite"), "Company website");
  const existing = await prisma.company.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
    select: { id: true },
  });
  if (existing) return existing.id;
  return (await prisma.company.create({ data: { name, industry, website }, select: { id: true } })).id;
}
