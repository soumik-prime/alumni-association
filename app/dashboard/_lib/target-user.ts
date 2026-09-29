import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma/prisma";
import { pageAccess } from "./guards";

/** Loads the account being managed at /dashboard/users/[id] (404 if missing). */
export async function loadTarget(userId: string) {
  const [me, user] = await Promise.all([
    pageAccess(),
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, emailVerified: true, createdAt: true, profile: true },
    }),
  ]);
  if (!user) notFound();
  return { me, user, profile: user.profile, isSelf: user.id === me.userId };
}
