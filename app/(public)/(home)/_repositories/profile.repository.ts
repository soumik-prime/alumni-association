import { prisma } from "@/lib/prisma/prisma";
import type { BatchGroupRow, MemberStatus } from "../_types/home.types";

/** One query: per-batch totals + graduated (non-null graduationDate) counts. */
export async function getBatchGroups(): Promise<BatchGroupRow[]> {
  const groups = await prisma.profile.groupBy({
    by: ["batch"],
    where: { visible: true },
    _count: { _all: true, graduationDate: true },
    _min: { session: true },
    orderBy: { batch: "asc" },
  });

  return groups.map((g) => ({
    batch: g.batch,
    session: g._min.session ?? "",
    total: g._count._all,
    graduatedCount: g._count.graduationDate,
  }));
}

export async function getMemberNames(status: MemberStatus, take: number): Promise<string[]> {
  const rows = await prisma.profile.findMany({
    where: { visible: true, graduationDate: status === "alumni" ? { not: null } : null },
    orderBy: { createdAt: "desc" },
    take,
    select: { name: true },
  });
  return rows.map((r) => r.name);
}
