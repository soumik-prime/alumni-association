import PageTitle, { PageContainer } from "../../_components/PageTitle";
import NoProfile from "../../_components/sections/NoProfile";
import WorkManager from "../../_components/sections/WorkManager";
import { P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { getCompanies } from "../../_lib/queries";
import { prisma } from "@/lib/prisma/prisma";

export default async function WorkExperiencePage() {
  const me = await pageAccess();
  const [profile, companies] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId: me.userId },
      select: {
        id: true,
        workExperiences: {
          orderBy: { startDate: "desc" },
          select: {
            id: true, title: true, careerField: true, employmentType: true, startDate: true, endDate: true,
            company: { select: { id: true, name: true, industry: true } },
          },
        },
      },
    }),
    getCompanies(),
  ]);

  return (
    <PageContainer>
      <PageTitle title="Work Experience" />
      {profile ? (
        <WorkManager
          profileId={profile.id}
          rows={profile.workExperiences.map((w) => ({
            ...w,
            startDate: w.startDate.toISOString(),
            endDate: w.endDate?.toISOString() ?? null,
          }))}
          companies={companies}
          canEdit={me.can(P.workOwn, P.workAny)}
          canCreateCompany={me.can(P.companiesCreate)}
        />
      ) : (
        <NoProfile />
      )}
    </PageContainer>
  );
}
