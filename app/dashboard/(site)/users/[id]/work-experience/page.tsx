import { notFound } from "next/navigation";
import WorkManager from "../../../../_components/sections/WorkManager";
import { AccessDenied } from "../../../../_components/ui";
import { P } from "../../../../_constants/permissions";
import { getCompanies } from "../../../../_lib/queries";
import { loadTarget } from "../../../../_lib/target-user";
import { prisma } from "@/lib/prisma/prisma";

export default async function ManageUserWork({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, profile } = await loadTarget(id);
  if (!profile) notFound();
  if (!me.can(P.workAny)) return <AccessDenied />;

  const [rows, companies] = await Promise.all([
    prisma.workExperience.findMany({
      where: { studentId: profile.id },
      orderBy: { startDate: "desc" },
      select: {
        id: true, title: true, careerField: true, employmentType: true, startDate: true, endDate: true,
        company: { select: { id: true, name: true, industry: true } },
      },
    }),
    getCompanies(),
  ]);

  return (
    <WorkManager
      profileId={profile.id}
      rows={rows.map((w) => ({ ...w, startDate: w.startDate.toISOString(), endDate: w.endDate?.toISOString() ?? null }))}
      companies={companies}
      canEdit
      canCreateCompany={me.can(P.companiesCreate)}
    />
  );
}
