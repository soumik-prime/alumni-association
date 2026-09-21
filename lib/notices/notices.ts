import { prisma } from "../prisma/prisma";

export type SiteNoticeTone = "INFO" | "SUCCESS" | "WARNING";

export interface SiteNotice {
  id: string;
  type: string;
  message: string;
  tone: SiteNoticeTone;
}

export async function getActiveSiteNotices(): Promise<SiteNotice[]> {
  const now = new Date();

  const notices = await prisma.siteNotice.findMany({
    where: {
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      type: true,
      message: true,
      tone: true,
    },
  });

  return notices;
}
