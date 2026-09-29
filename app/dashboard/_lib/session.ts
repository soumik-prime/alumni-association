import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export const LOGIN_PATH = "/auth/login";

/** Current better-auth session (memoised per request). */
export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

/** For pages/layouts: redirect to login when signed out. */
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect(LOGIN_PATH);
  return session;
}
