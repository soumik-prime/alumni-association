"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { EMPLOYMENT_LABEL } from "../_constants/options";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { bool, maxLen, optDate, optStr, pickEnum, required, str } from "../_lib/form";
import { ActionError, need, run } from "../_lib/guards";
import { authorizeProfile } from "../_lib/profile-access";
import { resolveCompany } from "../_lib/reference";

const refresh = () => revalidatePath("/dashboard", "layout");

function readWork(fd: FormData) {
  const startDate = optDate(str(fd, "startDate"), "Start date");
  if (!startDate) throw new ActionError("Start date is required.");
  const endDate = bool(fd, "current") ? null : optDate(str(fd, "endDate"), "End date");
  if (endDate && endDate < startDate) throw new ActionError("End date can't be before the start date.");
  return {
    title: required(str(fd, "title"), "Job title", 255),
    employmentType: pickEnum(str(fd, "employmentType"), EMPLOYMENT_LABEL, "employment type"),
    careerField: maxLen(optStr(fd, "careerField"), "Career field", 100),
    startDate,
    endDate,
  };
}

export async function addWorkExperience(profileId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const { me } = await authorizeProfile(profileId, P.workOwn, P.workAny);
    const data = readWork(fd);
    const companyId = await resolveCompany(fd, me);
    await prisma.workExperience.create({ data: { ...data, companyId, studentId: profileId } });
    refresh();
    return "Work experience added.";
  });
}

export async function updateWorkExperience(
  profileId: string, workId: string, _prev: ActionState, fd: FormData,
): Promise<ActionState> {
  return run(async () => {
    const { me } = await authorizeProfile(profileId, P.workOwn, P.workAny);
    const data = readWork(fd);
    const companyId = await resolveCompany(fd, me);
    const { count } = await prisma.workExperience.updateMany({
      where: { id: workId, studentId: profileId },
      data: { ...data, companyId },
    });
    need(count === 1, "That record no longer exists.");
    refresh();
    return "Work experience updated.";
  });
}

export async function deleteWorkExperience(profileId: string, workId: string): Promise<ActionState> {
  return run(async () => {
    await authorizeProfile(profileId, P.workOwn, P.workAny);
    await prisma.workExperience.deleteMany({ where: { id: workId, studentId: profileId } });
    refresh();
    return "Work experience removed.";
  });
}
