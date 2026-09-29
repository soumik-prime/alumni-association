import PageTitle, { PageContainer } from "../../_components/PageTitle";
import GroupsManager from "../../_components/sections/GroupsManager";
import { AccessDenied } from "../../_components/ui";
import { ACCESS_CONTROL_AREA, P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { prisma } from "@/lib/prisma/prisma";

export default async function PermissionGroupsPage() {
  const me = await pageAccess();
  if (!me.can(...ACCESS_CONTROL_AREA)) return <AccessDenied />;

  const [groups, permissions] = await Promise.all([
    prisma.permissionGroup.findMany({
      orderBy: [{ isSystem: "desc" }, { name: "asc" }],
      include: {
        permissionItems: { select: { permissionKey: true }, orderBy: { permissionKey: "asc" } },
        _count: { select: { userGroups: true } },
      },
    }),
    prisma.permission.findMany({ orderBy: [{ category: "asc" }, { key: "asc" }] }),
  ]);

  return (
    <PageContainer>
      <PageTitle title="Permission Groups" description="Reusable bundles of permissions." />
      <GroupsManager
        canManage={me.can(P.groupsManage)}
        permissions={permissions}
        groups={groups.map((g) => ({
          id: g.id, name: g.name, description: g.description, isSystem: g.isSystem,
          memberCount: g._count.userGroups, keys: g.permissionItems.map((i) => i.permissionKey),
        }))}
      />
    </PageContainer>
  );
}
