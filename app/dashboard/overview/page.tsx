import Link from "next/link";
import PageTitle, { PageContainer } from "../_components/PageTitle";
import { Badge, Card, SectionHeader } from "../_components/ui";
import { DASHBOARD_BASE_PATH } from "../_constants/navigation";
import { P, USERS_AREA } from "../_constants/permissions";
import { pageAccess } from "../_lib/guards";
import { prisma } from "@/lib/prisma/prisma";

const PROFILE_FIELDS = ["photo", "bio", "gender", "bloodGroup", "email", "linkedin", "github", "portfolio", "presentAddressId"] as const;

function Stat({ label, value, href }: { label: string; value: number | string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-[var(--neu-radius-lg)] border border-[var(--neu-gray-200)] bg-white p-4 shadow-sm transition-colors hover:border-[var(--neu-emerald)]"
    >
      <p className="text-2xl font-bold text-[var(--neu-gray-800)]">{value}</p>
      <p className="mt-0.5 text-sm text-[var(--neu-gray-500)]">{label}</p>
    </Link>
  );
}

export default async function OverviewPage() {
  const me = await pageAccess();
  const base = DASHBOARD_BASE_PATH;

  const [profile, publications, adminCounts] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId: me.userId },
      include: { _count: { select: { educations: true, workExperiences: true } } },
    }),
    prisma.publication.count({ where: { addedById: me.userId } }),
    me.can(...USERS_AREA)
      ? Promise.all([
          prisma.user.count(),
          prisma.profile.count({ where: { visible: false } }),
          prisma.siteNotification.count({ where: { active: true } }),
        ])
      : null,
  ]);

  const filled = profile ? PROFILE_FIELDS.filter((f) => profile[f]).length : 0;
  const completeness = Math.round((filled / PROFILE_FIELDS.length) * 100);

  return (
    <PageContainer>
      <PageTitle title={`Welcome, ${me.name.split(" ")[0]}`} description="Here's where your alumni profile stands." />

      {!profile ? (
        <Card>
          <SectionHeader title="Create your profile" description="You have an account but no alumni profile yet." />
          {me.can(P.profileCreate) ? (
            <Link href={`${base}/profile`} className="inline-flex rounded-[var(--neu-radius-md)] bg-[var(--neu-green)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--neu-green-hover)]">
              Create profile
            </Link>
          ) : (
            <p className="text-sm text-[var(--neu-gray-500)]">Ask an administrator to set up your profile.</p>
          )}
        </Card>
      ) : (
        <>
          <Card>
            <SectionHeader
              title={profile.name}
              description={`Reg. no. ${profile.regNo} · Batch ${profile.batch} · Session ${profile.session}`}
              actions={<Badge tone={profile.visible ? "green" : "amber"}>{profile.visible ? "Visible in directory" : "Hidden from directory"}</Badge>}
            />
            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--neu-gray-100)]">
                <div className="h-full rounded-full bg-[var(--neu-emerald)]" style={{ width: `${completeness}%` }} />
              </div>
              <span className="text-sm font-semibold text-[var(--neu-gray-700)]">{completeness}% complete</span>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Education records" value={profile._count.educations} href={`${base}/education`} />
            <Stat label="Work experiences" value={profile._count.workExperiences} href={`${base}/work-experience`} />
            <Stat label="Publications added" value={publications} href={`${base}/publications`} />
          </div>
        </>
      )}

      {adminCounts && (
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--neu-gray-500)]">Site</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Accounts" value={adminCounts[0]} href={`${base}/users`} />
            <Stat label="Hidden profiles" value={adminCounts[1]} href={`${base}/users`} />
            <Stat label="Live notifications" value={adminCounts[2]} href={`${base}/notifications`} />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
