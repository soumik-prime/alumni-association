"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { actor, need, run } from "../_lib/guards";
import { authorizeProfile } from "../_lib/profile-access";
import { deleteProfileCascade } from "../_lib/profile-cleanup";
import { readIdentity, readSocial } from "../_lib/profile-fields";

const refresh = () => revalidatePath("/dashboard", "layout");

/** Signed-in user creates their own profile (self only). */
export async function createOwnProfile(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.profileCreate), "You don't have permission to create a profile.");
    const existing = await prisma.profile.findUnique({ where: { userId: me.userId }, select: { id: true } });
    need(existing === null, "You already have a profile.");
    await prisma.profile.create({ data: { ...readIdentity(fd), userId: me.userId } });
    refresh();
    return "Profile created.";
  });
}

export async function updateProfile(profileId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    await authorizeProfile(profileId, P.profileEditOwn, P.profileEditAny);
    await prisma.profile.update({ where: { id: profileId }, data: readIdentity(fd) });
    refresh();
    return "Profile saved.";
  });
}

export async function updateSocial(profileId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    await authorizeProfile(profileId, P.profileEditOwn, P.profileEditAny);
    await prisma.profile.update({ where: { id: profileId }, data: readSocial(fd) });
    refresh();
    return "Social & contact details saved.";
  });
}

/** Directory visibility — only for people who may manage users. */
export async function setVisibility(profileId: string, visible: boolean): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.profileVisibility));
    await prisma.profile.update({ where: { id: profileId }, data: { visible } });
    refresh();
    return visible ? "Profile is now visible in the directory." : "Profile is now hidden from the directory.";
  });
}

/** Delete somebody else's profile (self-delete is always blocked). */
export async function deleteProfile(profileId: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.profileDelete));
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { id: true, name: true, userId: true },
    });
    need(profile !== null, "Profile not found.");
    need(profile.userId !== me.userId, "You can't delete your own profile.");
    await prisma.$transaction((tx) => deleteProfileCascade(tx, profile));
    refresh();
    return "Profile deleted.";
  });
}
