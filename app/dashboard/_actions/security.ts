"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import type { ActionState } from "../_lib/action-state";
import { bool, str } from "../_lib/form";
import { ActionError, actor, run } from "../_lib/guards";

export async function changePassword(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    await actor();
    const currentPassword = str(fd, "currentPassword");
    const newPassword = str(fd, "newPassword");
    if (!currentPassword) throw new ActionError("Enter your current password.");
    if (newPassword.length < 8) throw new ActionError("New password must be at least 8 characters.");
    if (newPassword.length > 128) throw new ActionError("New password must be 128 characters or fewer.");
    if (newPassword !== str(fd, "confirmPassword")) throw new ActionError("The new passwords don't match.");
    if (newPassword === currentPassword) throw new ActionError("Choose a password you haven't used just now.");

    await auth.api.changePassword({
      body: { currentPassword, newPassword, revokeOtherSessions: bool(fd, "revokeOthers") },
      headers: await headers(),
    });
    return "Password changed.";
  });
}

export async function signOutOtherSessions(): Promise<ActionState> {
  return run(async () => {
    await actor();
    await auth.api.revokeOtherSessions({ headers: await headers() });
    return "Signed out of all other devices.";
  });
}
