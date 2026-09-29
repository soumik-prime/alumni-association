import PageTitle, { PageContainer } from "../../_components/PageTitle";
import { Badge, Card, EmptyState, SectionHeader } from "../../_components/ui";
import { CATEGORY_LABEL } from "../../_constants/options";
import { fmtDateTime } from "../../_lib/format";
import { pageAccess } from "../../_lib/guards";
import { getPermissionGrants } from "../../_lib/permissions";
import { prisma } from "@/lib/prisma/prisma";

export default async function PermissionsPage() {
  const me = await pageAccess();
  const grants = await getPermissionGrants(me.userId);
  const defs = await prisma.permission.findMany({
    where: { key: { in: [...grants.keys()] } },
    orderBy: { key: "asc" },
  });

  const byCategory = new Map<string, typeof defs>();
  for (const d of defs) {
    const c = CATEGORY_LABEL[d.category ?? ""] ?? "Other";
    byCategory.set(c, [...(byCategory.get(c) ?? []), d]);
  }

  return (
    <PageContainer>
      <PageTitle title="Permissions" description="What you're currently allowed to do, and where it comes from." />
      {defs.length === 0 ? (
        <EmptyState>You haven&apos;t been granted any permissions yet.</EmptyState>
      ) : (
        [...byCategory.entries()].map(([category, items]) => (
          <Card key={category}>
            <SectionHeader title={category} />
            <ul className="divide-y divide-[var(--neu-gray-100)]">
              {items.map((d) => {
                const g = grants.get(d.key)!;
                return (
                  <li key={d.key} className="flex flex-wrap items-start justify-between gap-2 py-2.5 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="font-mono text-[13px] font-semibold text-[var(--neu-gray-800)]">{d.key}</p>
                      <p className="text-xs text-[var(--neu-gray-500)]">{d.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {g.direct && (
                        <Badge tone="green">
                          Direct{g.direct.expireAt ? ` · until ${fmtDateTime(g.direct.expireAt)}` : ""}
                        </Badge>
                      )}
                      {g.groups.map((name) => <Badge key={name} tone="blue">{name}</Badge>)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))
      )}
    </PageContainer>
  );
}
