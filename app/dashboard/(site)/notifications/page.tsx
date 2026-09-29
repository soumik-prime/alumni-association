import PageTitle, { PageContainer } from "../../_components/PageTitle";
import NotificationsManager, { type NotificationRow } from "../../_components/sections/NotificationsManager";
import { AccessDenied } from "../../_components/ui";
import { NOTIFICATIONS_AREA, P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { prisma } from "@/lib/prisma/prisma";

export default async function NotificationsPage() {
  const me = await pageAccess();
  if (!me.can(...NOTIFICATIONS_AREA)) return <AccessDenied />;

  const now = new Date();
  const items = await prisma.siteNotification.findMany({
    orderBy: { createdAt: "desc" },
    include: { createdByUser: { select: { name: true } } },
  });

  const rows: NotificationRow[] = items.map((n) => ({
    id: n.id,
    type: n.type,
    message: n.message,
    active: n.active,
    startsAt: n.startsAt?.toISOString() ?? null,
    expiresAt: n.expiresAt?.toISOString() ?? null,
    createdAt: n.createdAt.toISOString(),
    createdByName: n.createdByUser.name,
    state: !n.active
      ? "inactive"
      : n.expiresAt && n.expiresAt <= now
        ? "expired"
        : n.startsAt && n.startsAt > now
          ? "scheduled"
          : "live",
  }));

  return (
    <PageContainer>
      <PageTitle title="Notifications" description="Announcements shown across the alumni site." />
      <NotificationsManager
        rows={rows}
        caps={{
          create: me.can(P.notifCreate),
          edit: me.can(P.notifEdit),
          delete: me.can(P.notifDelete),
          publish: me.can(P.notifPublish),
        }}
      />
    </PageContainer>
  );
}
