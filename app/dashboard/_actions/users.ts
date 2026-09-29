"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";
import { generateSecurePassword } from "@/lib/auth/generate-password";
import { prisma } from "@/lib/prisma/prisma";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { bool, optEmail, required, str } from "../_lib/form";
import { ActionError, actor, need, run } from "../_lib/guards";
import { deleteProfileCascade } from "../_lib/profile-cleanup";
import { readAcademic } from "../_lib/profile-fields";
import { assertCanAssignGroups } from "../_lib/access-rules";

const refresh = () => revalidatePath("/dashboard", "layout");

/**
 * Create an account (name + email — both permanent), optionally with a
 * profile and group memberships. The generated password is returned once.
 *
 * Writes the user + credential account directly (hashing with better-auth's
 * own hasher) instead of calling `signUpEmail`, so the new user is NOT signed
 * in on the admin's browser (the nextCookies plugin would swap their cookie).
 */
export async function registerUser(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.usersCreate));

    const name = required(str(fd, "name"), "Name", 100);
    const email = optEmail(str(fd, "email"), "Email");
    if (!email) throw new ActionError("Email is required.");

    const withProfile = bool(fd, "createProfile");
    const academic = withProfile ? readAcademic(fd) : null;
    const visible = me.can(P.profileVisibility) ? bool(fd, "visible") : true;

    const groupIds = me.can(P.groupsAssign) ? fd.getAll("groupId").map(String) : [];
    if (groupIds.length) await assertCanAssignGroups(me.keys, groupIds);

    if (await prisma.user.findUnique({ where: { email }, select: { id: true } })) {
      throw new ActionError("An account with that email already exists.");
    }
    if (academic && (await prisma.profile.findUnique({ where: { regNo: academic.regNo }, select: { id: true } }))) {
      throw new ActionError("A profile with that registration no. already exists.");
    }

    const password = generateSecurePassword();
    const passwordHash = await (await auth.$context).password.hash(password);
    const userId = randomUUID();

    // Same rows better-auth's signUpEmail writes (user + "credential" account),
    // plus the optional profile / groups, in one transaction.
    await prisma.$transaction(async (tx) => {
      await tx.user.create({ data: { id: userId, name, email, emailVerified: true } });
      await tx.account.create({
        data: { id: randomUUID(), accountId: userId, providerId: "credential", userId, password: passwordHash },
      });
      if (academic) await tx.profile.create({ data: { ...academic, name, userId, visible } });
      if (groupIds.length) {
        await tx.userPermissionGroup.createMany({ data: groupIds.map((groupId) => ({ userId, groupId })) });
      }
    });

    refresh();
    return { message: `Account created for ${email}.`, payload: { email, password, userId } };
  });
}

/** Permanently delete an account and everything attached to it. */
export async function deleteUser(userId: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.usersDelete));
    need(userId !== me.userId, "You can't delete your own account.");

    const target = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        profile: { select: { id: true, name: true } },
        userPermissionGroups: { select: { group: { select: { id: true, isSystem: true } } } },
      },
    });
    need(target !== null, "User not found.");

    // Never orphan a protected group (e.g. the last Super Admin).
    for (const { group } of target.userPermissionGroups) {
      if (group.isSystem) {
        const members = await prisma.userPermissionGroup.count({ where: { groupId: group.id } });
        need(members > 1, "This is the last member of a protected group, so the account can't be deleted.");
      }
    }

    await prisma.$transaction(async (tx) => {
      if (target.profile) await deleteProfileCascade(tx, target.profile);
      // These rows require an owner — hand them to whoever is deleting the account.
      await tx.publication.updateMany({ where: { addedById: userId }, data: { addedById: me.userId } });
      await tx.siteNotification.updateMany({ where: { createdBy: userId }, data: { createdBy: me.userId } });
      await tx.user.delete({ where: { id: userId } }); // sessions, accounts, grants cascade
    });

    refresh();
    return "Account deleted.";
  });
}
