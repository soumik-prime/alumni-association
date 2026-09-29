import Link from "next/link";
import PageTitle, { PageContainer } from "../../_components/PageTitle";
import { AccessDenied, Badge, Card, EmptyState, btnClass } from "../../_components/ui";
import { P, USERS_AREA } from "../../_constants/permissions";
import { fmtDate } from "../../_lib/format";
import { pageAccess } from "../../_lib/guards";
import { prisma } from "@/lib/prisma/prisma";
import type { Prisma } from "@/generated/prisma/client";

const PAGE_SIZE = 20;

export default async function UsersPage({
  searchParams,
}: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const me = await pageAccess();
  if (!me.can(...USERS_AREA)) return <AccessDenied />;

  const { q = "", page: pageParam } = await searchParams;
  const term = q.trim();
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

  const where: Prisma.UserWhereInput = term
    ? {
        OR: [
          { name: { contains: term, mode: "insensitive" } },
          { email: { contains: term, mode: "insensitive" } },
          { profile: { regNo: { contains: term, mode: "insensitive" } } },
        ],
      }
    : {};

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true, name: true, email: true, createdAt: true,
        profile: { select: { regNo: true, batch: true, visible: true } },
      },
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const link = (p: number) => `?${new URLSearchParams({ ...(term && { q: term }), page: String(p) })}`;

  return (
    <PageContainer>
      <PageTitle
        title="Users"
        description={`${total} account${total === 1 ? "" : "s"}`}
        actions={
          me.can(P.usersCreate) && (
            <Link href="/dashboard/users/new" className={btnClass("primary")}>Register member</Link>
          )
        }
      />

      <Card className="!p-0">
        <form className="flex gap-2 border-b border-[var(--neu-gray-100)] p-3">
          <input
            name="q"
            defaultValue={term}
            placeholder="Search by name, email or reg. no."
            className="block w-full rounded-[var(--neu-radius-md)] border border-[var(--neu-gray-200)] px-3 py-2 text-sm outline-none focus:border-[var(--neu-emerald)]"
          />
          <button className={btnClass("secondary")}>Search</button>
        </form>

        {users.length === 0 ? (
          <div className="p-4"><EmptyState>No users found.</EmptyState></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[var(--neu-gray-50)] text-xs uppercase tracking-wide text-[var(--neu-gray-500)]">
                <tr>
                  <th className="px-4 py-2 font-semibold">Member</th>
                  <th className="px-4 py-2 font-semibold">Reg. no. / batch</th>
                  <th className="px-4 py-2 font-semibold">Directory</th>
                  <th className="px-4 py-2 font-semibold">Joined</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--neu-gray-100)]">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-[var(--neu-gray-800)]">{u.name}</p>
                      <p className="text-xs text-[var(--neu-gray-500)]">{u.email}</p>
                    </td>
                    <td className="px-4 py-2.5 text-[var(--neu-gray-600)]">
                      {u.profile ? `${u.profile.regNo} · Batch ${u.profile.batch}` : "—"}
                    </td>
                    <td className="px-4 py-2.5">
                      {!u.profile ? <Badge>No profile</Badge> : <Badge tone={u.profile.visible ? "green" : "amber"}>{u.profile.visible ? "Visible" : "Hidden"}</Badge>}
                    </td>
                    <td className="px-4 py-2.5 text-[var(--neu-gray-600)]">{fmtDate(u.createdAt)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <Link href={`/dashboard/users/${u.id}`} className={btnClass("secondary", "sm")}>Manage</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div className="flex items-center justify-between border-t border-[var(--neu-gray-100)] p-3 text-sm text-[var(--neu-gray-500)]">
            <span>Page {page} of {pages}</span>
            <div className="flex gap-2">
              {page > 1 && <Link href={link(page - 1)} className={btnClass("secondary", "sm")}>Previous</Link>}
              {page < pages && <Link href={link(page + 1)} className={btnClass("secondary", "sm")}>Next</Link>}
            </div>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
