import Link from "next/link";
import PageTitle, { PageContainer } from "../../../_components/PageTitle";
import RegisterUserForm from "../../../_components/sections/RegisterUserForm";
import { AccessDenied } from "../../../_components/ui";
import { P } from "../../../_constants/permissions";
import { pageAccess } from "../../../_lib/guards";
import { prisma } from "@/lib/prisma/prisma";

export default async function RegisterUserPage() {
  const me = await pageAccess();
  if (!me.can(P.usersCreate)) return <AccessDenied />;

  const canAssign = me.can(P.groupsAssign);
  const groups = canAssign
    ? await prisma.permissionGroup.findMany({
        orderBy: { name: "asc" },
        select: { id: true, name: true, description: true },
      })
    : [];

  return (
    <PageContainer>
      <PageTitle
        title="Register member"
        actions={<Link href="/dashboard/users" className="text-sm font-medium text-[var(--neu-green)]">← All users</Link>}
      />
      <RegisterUserForm groups={groups} canAssignGroups={canAssign} canSetVisibility={me.can(P.profileVisibility)} />
    </PageContainer>
  );
}
