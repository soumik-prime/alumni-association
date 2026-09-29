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

  const notices = await prisma.siteNotification.findMany({
    where: {
      active: true,
      AND: [{ OR: [{ startsAt: null }, { startsAt: { lte: now } }] }],
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      type: true,
      message: true,
    },
  });

  return notices.map((notice) => ({
    id: notice.id,
    type: notice.type ?? "INFO",
    message: notice.message,
    tone: (notice.type ?? "INFO") as SiteNoticeTone,
  }));
}
