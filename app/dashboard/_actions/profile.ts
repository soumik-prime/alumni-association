"use server";

import { revalidatePath } from "next/cache";
import { profilePhotoPath, putProfilePhoto } from "@/lib/aws/s3";
import { prisma } from "@/lib/prisma/prisma";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { actor, need, run } from "../_lib/guards";
import { authorizeProfile } from "../_lib/profile-access";
import { deleteProfileCascade } from "../_lib/profile-cleanup";
import { readIdentity, readSocial } from "../_lib/profile-fields";

const refresh = () => revalidatePath("/dashboard", "layout");

const MAX_PROFILE_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_CONTENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

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

/** Upload a profile photo to the private S3 bucket and expose it through the app. */
export async function uploadProfilePhoto(profileId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    await authorizeProfile(profileId, P.profileEditOwn, P.profileEditAny);
    const file = fd.get("photo");
    need(file instanceof File && file.size > 0, "Choose an image to upload.");
    need(PHOTO_CONTENT_TYPES.has(file.type), "Use a JPEG, PNG, WebP, or GIF image.");
    need(file.size <= MAX_PROFILE_PHOTO_BYTES, "Profile photos must be 5 MB or smaller.");

    await putProfilePhoto(profileId, new Uint8Array(await file.arrayBuffer()), file.type);
    await prisma.profile.update({ where: { id: profileId }, data: { photo: profilePhotoPath(profileId) } });
    refresh();
    return "Profile photo uploaded.";
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
