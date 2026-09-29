import AccessManager, { type DirectGrant } from "../../../../_components/sections/AccessManager";
import { AccessDenied } from "../../../../_components/ui";
import { P } from "../../../../_constants/permissions";
import { loadTarget } from "../../../../_lib/target-user";
import { prisma } from "@/lib/prisma/prisma";

export default async function ManageUserAccess({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, user } = await loadTarget(id);
  if (!me.can(P.permGrant, P.groupsAssign)) return <AccessDenied />;

  const now = new Date();
  const [grants, memberships, allGroups, allPermissions] = await Promise.all([
    prisma.userPermission.findMany({
      where: { userId: user.id },
      orderBy: { grantedAt: "desc" },
      include: { permission: { select: { description: true } }, grantedBy: { select: { name: true } } },
    }),
    prisma.userPermissionGroup.findMany({
      where: { userId: user.id },
      include: { group: true },
      orderBy: { group: { name: "asc" } },
    }),
    prisma.permissionGroup.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    prisma.permission.findMany({ orderBy: { key: "asc" }, select: { key: true, category: true } }),
  ]);

  const rows: DirectGrant[] = grants.map((g) => ({
    id: g.id,
    key: g.permissionKey,
    description: g.permission.description,
    grantedAt: g.grantedAt,
    expireAt: g.expireAt,
    grantedByName: g.grantedBy?.name ?? null,
    state: g.revokedAt ? "revoked" : g.expireAt && g.expireAt <= now ? "expired" : "active",
  }));

  return (
    <AccessManager
      userId={user.id}
      grants={rows}
      memberships={memberships.map((m) => ({
        groupId: m.groupId, name: m.group.name, description: m.group.description, isSystem: m.group.isSystem,
      }))}
      allGroups={allGroups}
      allPermissions={allPermissions}
      canGrant={me.can(P.permGrant)}
      canAssign={me.can(P.groupsAssign)}
      heldKeys={[...me.keys]}
    />
  );
}
