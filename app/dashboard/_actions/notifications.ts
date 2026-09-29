"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { NOTIFICATION_TYPE_LABEL } from "../_constants/options";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { bool, optDateTime, pickEnum, required, str } from "../_lib/form";
import { ActionError, actor, need, run } from "../_lib/guards";

const refresh = () => revalidatePath("/dashboard", "layout");

function readContent(fd: FormData) {
  return {
    type: pickEnum(str(fd, "type"), NOTIFICATION_TYPE_LABEL, "type"),
    message: required(str(fd, "message"), "Message", 160),
  };
}

/** Going live / scheduling is the `publish` permission; everyone else only saves content. */
function readPublishing(fd: FormData) {
  const startsAt = optDateTime(str(fd, "startsAt"), "Start time");
  const expiresAt = optDateTime(str(fd, "expiresAt"), "Expiry time");
  if (startsAt && expiresAt && expiresAt <= startsAt) throw new ActionError("Expiry must be after the start time.");
  return { active: bool(fd, "active"), startsAt, expiresAt };
}

export async function createNotification(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.notifCreate));
    const publishing = me.can(P.notifPublish)
      ? readPublishing(fd)
      : { active: false, startsAt: null, expiresAt: null };
    await prisma.siteNotification.create({
      data: { ...readContent(fd), ...publishing, createdBy: me.userId },
    });
    refresh();
    return publishing.active ? "Notification published." : "Notification saved as inactive.";
  });
}

export async function updateNotification(id: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.notifEdit, P.notifPublish));
    const data = {
      ...(me.can(P.notifEdit) ? readContent(fd) : {}),
      ...(me.can(P.notifPublish) ? readPublishing(fd) : {}),
    };
    await prisma.siteNotification.update({ where: { id }, data });
    refresh();
    return "Notification updated.";
  });
}

export async function deleteNotification(id: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    need(me.can(P.notifDelete));
    await prisma.siteNotification.delete({ where: { id } });
    refresh();
    return "Notification deleted.";
  });
}
