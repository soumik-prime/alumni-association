import PageTitle, { PageContainer } from "../../_components/PageTitle";
import PasswordForm from "../../_components/sections/PasswordForm";
import { Badge, Card, SectionHeader } from "../../_components/ui";
import ActionButton from "../../_components/ui/ActionButton";
import { signOutOtherSessions } from "../../_actions/security";
import { fmtDateTime } from "../../_lib/format";
import { pageAccess } from "../../_lib/guards";
import { getSession } from "../../_lib/session";
import { prisma } from "@/lib/prisma/prisma";

export default async function SecurityPage() {
  const me = await pageAccess();
  const current = await getSession();
  // `token` is deliberately not selected — it never leaves the server.
  const sessions = await prisma.session.findMany({
    where: { userId: me.userId, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    select: { id: true, ipAddress: true, userAgent: true, createdAt: true },
  });

  return (
    <PageContainer>
      <PageTitle title="Security" />
      <PasswordForm />

      <Card>
        <SectionHeader
          title="Active sessions"
          description="Devices currently signed in to your account."
          actions={
            sessions.length > 1 ? (
              <ActionButton confirm="Sign out of every other device?" action={signOutOtherSessions}>
                Sign out other devices
              </ActionButton>
            ) : undefined
          }
        />
        <ul className="divide-y divide-[var(--neu-gray-100)]">
          {sessions.map((s) => (
            <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm text-[var(--neu-gray-800)]">{s.userAgent ?? "Unknown device"}</p>
                <p className="text-xs text-[var(--neu-gray-500)]">{s.ipAddress ?? "Unknown IP"} · signed in {fmtDateTime(s.createdAt)}</p>
              </div>
              {s.id === current?.session.id && <Badge tone="green">This device</Badge>}
            </li>
          ))}
        </ul>
      </Card>
    </PageContainer>
  );
}
