import { notFound } from "next/navigation";
import EducationManager from "../../../../_components/sections/EducationManager";
import { AccessDenied } from "../../../../_components/ui";
import { P } from "../../../../_constants/permissions";
import { getInstitutions } from "../../../../_lib/queries";
import { loadTarget } from "../../../../_lib/target-user";
import { prisma } from "@/lib/prisma/prisma";

export default async function ManageUserEducation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, profile } = await loadTarget(id);
  if (!profile) notFound();
  if (!me.can(P.eduAny)) return <AccessDenied />;

  const [rows, institutions] = await Promise.all([
    prisma.education.findMany({
      where: { studentId: profile.id },
      orderBy: [{ graduationYear: "desc" }, { createdAt: "desc" }],
      select: {
        id: true, degree: true, field: true, graduationYear: true,
        institution: { select: { id: true, name: true, website: true } },
      },
    }),
    getInstitutions(),
  ]);

  return (
    <EducationManager
      profileId={profile.id}
      rows={rows}
      institutions={institutions}
      canEdit
      canCreateInstitution={me.can(P.institutionsCreate)}
    />
  );
}
