import { getSession, requireSession } from "./session";
import { getPermissionKeys, makeAccess, type Access } from "./permissions";
import type { ActionState } from "./action-state";

/** A failure whose message is safe to show to the user. */
export class ActionError extends Error {}

export function need(ok: boolean, message = "You don't have permission to do that."): asserts ok {
  if (!ok) throw new ActionError(message);
}

/** Signed-in user + permissions for server actions (throws ActionError). */
export async function actor(): Promise<Access & { name: string }> {
  const session = await getSession();
  if (!session) throw new ActionError("Your session has expired. Please sign in again.");
  const keys = await getPermissionKeys(session.user.id);
  return { ...makeAccess(session.user.id, keys), name: session.user.name };
}

/** Signed-in user + permissions for pages (redirects to login). */
export async function pageAccess(): Promise<Access & { name: string; email: string }> {
  const session = await requireSession();
  const keys = await getPermissionKeys(session.user.id);
  return { ...makeAccess(session.user.id, keys), name: session.user.name, email: session.user.email };
}

type Done = string | { message: string; payload?: Record<string, string> };

/** Wrap an action body: returns success/error state instead of throwing. */
export async function run(body: () => Promise<Done>): Promise<ActionState> {
  try {
    const done = await body();
    const { message, payload } = typeof done === "string" ? { message: done, payload: undefined } : done;
    return { status: "success", message, payload, at: Date.now() };
  } catch (e) {
    return { status: "error", message: describeError(e), at: Date.now() };
  }
}

function describeError(e: unknown): string {
  if (e instanceof ActionError) return e.message;
  const err = e as { code?: string; body?: { message?: string }; meta?: { target?: unknown } };
  if (err?.code === "P2002") return "That value already exists.";
  if (err?.code === "P2003") return "This record is still in use, so it can't be changed or removed.";
  if (err?.code === "P2025") return "That record no longer exists.";
  // better-auth APIError
  if (err?.body?.message) return err.body.message;
  console.error(e);
  return "Something went wrong. Please try again.";
}
