"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { assertCanAssignGroups } from "../_lib/access-rules";
import { optDateTime, optStr, required, str } from "../_lib/form";
import { ActionError, actor, need, run } from "../_lib/guards";

const refresh = () => revalidatePath("/dashboard", "layout");

/* ---------- direct permission grants on a user ---------- */

export async function grantPermission(userId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.permGrant));
    const key = required(str(fd, "permissionKey"), "Permission");
    need(me.keys.has(key), "You can only grant permissions you hold yourself.");

    const exists = await prisma.permission.findUnique({ where: { key }, select: { key: true } });
    need(exists !== null, "That permission doesn't exist.");

    const expireAt = optDateTime(optStr(fd, "expireAt") ?? "", "Expiry");
    if (expireAt && expireAt <= new Date()) throw new ActionError("Expiry must be in the future.");

    const active = await prisma.userPermission.findFirst({
      where: { userId, permissionKey: key, revokedAt: null, OR: [{ expireAt: null }, { expireAt: { gt: new Date() } }] },
      select: { id: true },
    });
    need(active === null, "That permission is already granted directly. Revoke it first to change the expiry.");

    await prisma.userPermission.create({
      data: { userId, permissionKey: key, grantedById: me.userId, expireAt },
    });
    refresh();
    return "Permission granted.";
  });
}

export async function revokePermission(userId: string, grantId: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.permGrant));
    const { count } = await prisma.userPermission.updateMany({
      where: { id: grantId, userId, revokedAt: null },
      data: { revokedAt: new Date(), revokedById: me.userId },
    });
    need(count === 1, "That grant is already revoked.");
    refresh();
    return "Permission revoked.";
  });
}

/* ---------- group membership ---------- */

export async function addToGroup(userId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.groupsAssign));
    const groupId = required(str(fd, "groupId"), "Group");
    await assertCanAssignGroups(me.keys, [groupId]);
    const already = await prisma.userPermissionGroup.findUnique({
      where: { userId_groupId: { userId, groupId } },
      select: { userId: true },
    });
    need(already === null, "They're already in that group.");
    await prisma.userPermissionGroup.create({ data: { userId, groupId } });
    refresh();
    return "Added to group.";
  });
}

export async function removeFromGroup(userId: string, groupId: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.groupsAssign));
    const group = await prisma.permissionGroup.findUnique({ where: { id: groupId }, select: { isSystem: true } });
    if (group?.isSystem) {
      const members = await prisma.userPermissionGroup.count({ where: { groupId } });
      need(members > 1, "This is the last member of a protected group, so they can't be removed.");
    }
    await prisma.userPermissionGroup.deleteMany({ where: { userId, groupId } });
    refresh();
    return "Removed from group.";
  });
}

/* ---------- group definitions ---------- */

async function readGroup(fd: FormData) {
  const name = required(str(fd, "name"), "Group name", 100);
  const description = required(str(fd, "description"), "Description", 160);
  const keys = [...new Set(fd.getAll("permissionKey").map(String))];
  if (keys.length) {
    const found = await prisma.permission.count({ where: { key: { in: keys } } });
    need(found === keys.length, "One of the selected permissions doesn't exist.");
  }
  return { name, description, keys };
}

export async function createGroup(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.groupsManage));
    const { keys, ...data } = await readGroup(fd);
    await prisma.permissionGroup.create({
      data: { ...data, permissionItems: { create: keys.map((permissionKey) => ({ permissionKey })) } },
    });
    refresh();
    return "Group created.";
  });
}

export async function updateGroup(groupId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.groupsManage));
    const group = await prisma.permissionGroup.findUnique({ where: { id: groupId }, select: { isSystem: true } });
    need(group !== null, "Group not found.");
    need(!group.isSystem, "Protected groups can't be edited.");
    const { keys, ...data } = await readGroup(fd);
    await prisma.$transaction([
      prisma.permissionGroupItem.deleteMany({ where: { groupId } }),
      prisma.permissionGroup.update({
        where: { id: groupId },
        data: { ...data, permissionItems: { create: keys.map((permissionKey) => ({ permissionKey })) } },
      }),
    ]);
    refresh();
    return "Group updated.";
  });
}

export async function deleteGroup(groupId: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.groupsManage));
    const group = await prisma.permissionGroup.findUnique({ where: { id: groupId }, select: { isSystem: true } });
    need(group !== null, "Group not found.");
    need(!group.isSystem, "Protected groups can't be deleted.");
    await prisma.permissionGroup.delete({ where: { id: groupId } }); // memberships + items cascade
    refresh();
    return "Group deleted.";
  });
}
