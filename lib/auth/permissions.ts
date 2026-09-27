import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from "../prisma/prisma";

export async function getCurrentUserPermissionKeys(): Promise<string[]> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return [];
  }

  const now = new Date();
  const [directPermissions, permissionGroups] = await Promise.all([
    prisma.userPermission.findMany({
      where: {
        userId: session.user.id,
        OR: [{ expireAt: null }, { expireAt: { gt: now } }],
      },
      select: { permission: { select: { key: true } } },
    }),
    prisma.userPermissionGroup.findMany({
      where: { userId: session.user.id },
      select: {
        group: {
          select: {
            permissionItems: {
              select: { permission: { select: { key: true } } },
            },
          },
        },
      },
    }),
  ]);

  return Array.from(
    new Set([
      ...directPermissions.map(({ permission }) => permission.key),
      ...permissionGroups.flatMap(({ group }) =>
        group.permissionItems.map(({ permission }) => permission.key),
      ),
    ]),
  );
}
