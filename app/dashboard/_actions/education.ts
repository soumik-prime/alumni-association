"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { DEGREE_LABEL } from "../_constants/options";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { optInt, optStr, maxLen, pickEnum, str } from "../_lib/form";
import { need, run } from "../_lib/guards";
import { authorizeProfile } from "../_lib/profile-access";
import { resolveInstitution } from "../_lib/reference";

const refresh = () => revalidatePath("/dashboard", "layout");

function readEducation(fd: FormData) {
  return {
    degree: pickEnum(str(fd, "degree"), DEGREE_LABEL, "degree"),
    field: maxLen(optStr(fd, "field"), "Field of study", 50),
    graduationYear: optInt(str(fd, "graduationYear"), "Graduation year", 1950, new Date().getFullYear() + 10),
  };
}

export async function addEducation(profileId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const { me } = await authorizeProfile(profileId, P.eduOwn, P.eduAny);
    const data = readEducation(fd);
    const institutionId = await resolveInstitution(fd, me);
    await prisma.education.create({ data: { ...data, institutionId, studentId: profileId } });
    refresh();
    return "Education added.";
  });
}

export async function updateEducation(
  profileId: string, educationId: string, _prev: ActionState, fd: FormData,
): Promise<ActionState> {
  return run(async () => {
    const { me } = await authorizeProfile(profileId, P.eduOwn, P.eduAny);
    const data = readEducation(fd);
    const institutionId = await resolveInstitution(fd, me);
    const { count } = await prisma.education.updateMany({
      where: { id: educationId, studentId: profileId },
      data: { ...data, institutionId },
    });
    need(count === 1, "That record no longer exists.");
    refresh();
    return "Education updated.";
  });
}

export async function deleteEducation(profileId: string, educationId: string): Promise<ActionState> {
  return run(async () => {
    await authorizeProfile(profileId, P.eduOwn, P.eduAny);
    await prisma.education.deleteMany({ where: { id: educationId, studentId: profileId } });
    refresh();
    return "Education removed.";
  });
}
