import PageTitle, { PageContainer } from "../../_components/PageTitle";
import PublicationsManager from "../../_components/sections/PublicationsManager";
import { pageAccess } from "../../_lib/guards";
import { prisma } from "@/lib/prisma/prisma";

export default async function PublicationsPage() {
  const me = await pageAccess();
  const profile = await prisma.profile.findUnique({ where: { userId: me.userId }, select: { id: true } });

  const publications = await prisma.publication.findMany({
    where: {
      OR: [
        { addedById: me.userId },
        ...(profile ? [{ authors: { some: { studentId: profile.id } } }] : []),
      ],
    },
    orderBy: [{ publishedYear: "desc" }, { createdAt: "desc" }],
    include: {
      authors: {
        orderBy: { authorOrder: "asc" },
        include: { student: { select: { name: true, regNo: true } } },
      },
    },
  });

  return (
    <PageContainer>
      <PageTitle title="Publications" />
      <PublicationsManager
        canAdd={!!profile}
        rows={publications.map((p) => ({
          id: p.id, title: p.title, abstract: p.abstract, type: p.type, venue: p.venue, doi: p.doi,
          externalUrl: p.externalUrl, publishedYear: p.publishedYear, status: p.status,
          mine: p.addedById === me.userId,
          authors: p.authors.map((a) => ({
            order: a.authorOrder,
            regNo: a.student?.regNo ?? null,
            name: a.student?.name ?? a.externalName ?? "Unknown",
          })),
        }))}
      />
    </PageContainer>
  );
}
