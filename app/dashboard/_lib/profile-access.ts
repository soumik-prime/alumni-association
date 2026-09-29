import { prisma } from "@/lib/prisma/prisma";
import { actor, need } from "./guards";

/**
 * Loads a profile and checks the caller may act on it:
 * - their own profile  -> needs `ownKey` (or `anyKey`)
 * - someone else's     -> needs `anyKey`
 */
export async function authorizeProfile(profileId: string, ownKey: string, anyKey: string) {
  const me = await actor();
  const profile = await prisma.profile.findUnique({
    where: { id: profileId },
    select: { id: true, userId: true, name: true },
  });
  need(profile !== null, "Profile not found.");
  need(me.can(anyKey) || (profile.userId === me.userId && me.can(ownKey)));
  return { me, profile };
}
