import Link from "next/link";
import type { ReactNode } from "react";
import PageTitle, { PageContainer } from "../../../_components/PageTitle";
import UserTabs, { type Tab } from "../../../_components/UserTabs";
import { AccessDenied, Badge } from "../../../_components/ui";
import { P, USERS_AREA } from "../../../_constants/permissions";
import { loadTarget } from "../../../_lib/target-user";

export default async function ManageUserLayout({
  children, params,
}: { children: ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, user, profile, isSelf } = await loadTarget(id);
  if (!me.can(...USERS_AREA)) return <AccessDenied />;

  const base = `/dashboard/users/${user.id}`;
  const tabs: Tab[] = [{ label: "Overview", href: base, exact: true }];
  if (profile && me.can(P.profileEditAny)) {
    tabs.push(
      { label: "Profile", href: `${base}/profile` },
      { label: "Social", href: `${base}/social` },
      { label: "Addresses", href: `${base}/addresses` },
    );
  }
  if (profile && me.can(P.eduAny)) tabs.push({ label: "Education", href: `${base}/education` });
  if (profile && me.can(P.workAny)) tabs.push({ label: "Work", href: `${base}/work-experience` });
  if (me.can(P.permGrant, P.groupsAssign)) tabs.push({ label: "Access", href: `${base}/access` });

  return (
    <PageContainer>
      <div className="space-y-3">
        <Link href="/dashboard/users" className="text-sm font-medium text-[var(--neu-green)]">← All users</Link>
        <PageTitle
          title={user.name}
          description={user.email}
          actions={isSelf ? <Badge tone="blue">This is you</Badge> : undefined}
        />
      </div>
      <UserTabs tabs={tabs} />
      <div className="space-y-6">{children}</div>
    </PageContainer>
  );
}
