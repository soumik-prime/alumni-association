import { cache } from "react";
import { prisma } from "@/lib/prisma/prisma";

export type PermissionGrant = {
  key: string;
  direct: { grantedAt: Date; expireAt: Date | null } | null;
  groups: string[];
};

/**
 * Effective permissions for a user = non-revoked, non-expired direct grants
 * ∪ every permission of every group they belong to. Memoised per request.
 *
 * NOTE: if `getCurrentUserPermissionKeys()` in `@/lib/auth/permissions`
 * already does this, you can delegate `getPermissionKeys` to it for the
 * signed-in user — this file only needs to stay for the per-key detail.
 */
export const getPermissionGrants = cache(
  async (userId: string): Promise<Map<string, PermissionGrant>> => {
    const now = new Date();
    const [direct, groups] = await Promise.all([
      prisma.userPermission.findMany({
        where: {
          userId,
          revokedAt: null,
          OR: [{ expireAt: null }, { expireAt: { gt: now } }],
        },
        select: { permissionKey: true, grantedAt: true, expireAt: true },
      }),
      prisma.userPermissionGroup.findMany({
        where: { userId },
        select: {
          group: {
            select: { name: true, permissionItems: { select: { permissionKey: true } } },
          },
        },
      }),
    ]);

    const map = new Map<string, PermissionGrant>();
    const entry = (key: string) => {
      let e = map.get(key);
      if (!e) map.set(key, (e = { key, direct: null, groups: [] }));
      return e;
    };
    for (const d of direct) {
      entry(d.permissionKey).direct = { grantedAt: d.grantedAt, expireAt: d.expireAt };
    }
    for (const { group } of groups) {
      for (const item of group.permissionItems) entry(item.permissionKey).groups.push(group.name);
    }
    return map;
  },
);

export const getPermissionKeys = cache(
  async (userId: string): Promise<ReadonlySet<string>> =>
    new Set((await getPermissionGrants(userId)).keys()),
);

export type Access = {
  userId: string;
  keys: ReadonlySet<string>;
  /** True when the user holds at least one of the given permissions. */
  can: (...keys: string[]) => boolean;
};

export function makeAccess(userId: string, keys: ReadonlySet<string>): Access {
  return { userId, keys, can: (...wanted) => wanted.some((k) => keys.has(k)) };
}
