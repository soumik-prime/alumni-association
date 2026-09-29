import PageTitle, { PageContainer } from "../../_components/PageTitle";
import EducationManager from "../../_components/sections/EducationManager";
import NoProfile from "../../_components/sections/NoProfile";
import { P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { getInstitutions } from "../../_lib/queries";
import { prisma } from "@/lib/prisma/prisma";

export default async function EducationPage() {
  const me = await pageAccess();
  const [profile, institutions] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId: me.userId },
      select: {
        id: true,
        educations: {
          orderBy: [{ graduationYear: "desc" }, { createdAt: "desc" }],
          select: {
            id: true, degree: true, field: true, graduationYear: true,
            institution: { select: { id: true, name: true, website: true } },
          },
        },
      },
    }),
    getInstitutions(),
  ]);

  return (
    <PageContainer>
      <PageTitle title="Education History" />
      {profile ? (
        <EducationManager
          profileId={profile.id}
          rows={profile.educations}
          institutions={institutions}
          canEdit={me.can(P.eduOwn, P.eduAny)}
          canCreateInstitution={me.can(P.institutionsCreate)}
        />
      ) : (
        <NoProfile />
      )}
    </PageContainer>
  );
}
