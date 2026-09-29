"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { PUBLICATION_STATUS_LABEL, PUBLICATION_TYPE_LABEL } from "../_constants/options";
import type { ActionState } from "../_lib/action-state";
import { maxLen, optInt, optStr, optUrl, pickEnum, required, str } from "../_lib/form";
import { ActionError, actor, need, run } from "../_lib/guards";

const refresh = () => revalidatePath("/dashboard", "layout");

function readPublication(fd: FormData) {
  const doi = optStr(fd, "doi");
  return {
    title: required(str(fd, "title"), "Title", 500),
    type: pickEnum(str(fd, "type"), PUBLICATION_TYPE_LABEL, "type"),
    status: pickEnum(str(fd, "status"), PUBLICATION_STATUS_LABEL, "status"),
    venue: maxLen(optStr(fd, "venue"), "Venue", 255),
    publishedYear: optInt(str(fd, "publishedYear"), "Year", 1950, new Date().getFullYear() + 1),
    doi: doi ? maxLen(doi, "DOI", 255) : null,
    externalUrl: optUrl(optStr(fd, "externalUrl"), "Publication link"),
    abstract: maxLen(optStr(fd, "abstract"), "Abstract", 5000),
  };
}

/**
 * Authors arrive as parallel lists (`authorRegNo[]`, `authorName[]`), one pair
 * per row. A reg no. links a member; otherwise the name is stored as-is.
 */
async function readAuthors(fd: FormData) {
  const regNos = fd.getAll("authorRegNo").map((v) => String(v).trim());
  const names = fd.getAll("authorName").map((v) => String(v).trim());
  const rows: { studentId: string | null; externalName: string | null }[] = [];

  for (let i = 0; i < Math.max(regNos.length, names.length); i++) {
    const regNo = regNos[i] ?? "";
    const name = names[i] ?? "";
    if (!regNo && !name) continue;
    if (regNo) {
      const profile = await prisma.profile.findUnique({ where: { regNo }, select: { id: true } });
      if (!profile) throw new ActionError(`No member with registration no. ${regNo}. Use the name field for outside co-authors.`);
      rows.push({ studentId: profile.id, externalName: null });
    } else {
      if (name.length > 150) throw new ActionError("Author names must be 150 characters or fewer.");
      rows.push({ studentId: null, externalName: name });
    }
  }
  if (rows.length === 0) throw new ActionError("Add at least one author.");
  const linked = rows.filter((r) => r.studentId).map((r) => r.studentId);
  if (new Set(linked).size !== linked.length) throw new ActionError("The same member is listed as an author twice.");
  return rows.map((r, i) => ({ ...r, authorOrder: i + 1 }));
}

export async function addPublication(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    const data = readPublication(fd);
    const authors = await readAuthors(fd);
    await prisma.publication.create({
      data: { ...data, addedById: me.userId, authors: { create: authors } },
    });
    refresh();
    return "Publication added.";
  });
}

export async function updatePublication(publicationId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    const data = readPublication(fd);
    const authors = await readAuthors(fd);
    const owned = await prisma.publication.findFirst({
      where: { id: publicationId, addedById: me.userId },
      select: { id: true },
    });
    need(owned !== null, "Only the person who added a publication can edit it.");
    await prisma.$transaction([
      prisma.publicationAuthor.deleteMany({ where: { publicationId } }),
      prisma.publication.update({
        where: { id: publicationId },
        data: { ...data, authors: { create: authors } },
      }),
    ]);
    refresh();
    return "Publication updated.";
  });
}

export async function deletePublication(publicationId: string): Promise<ActionState> {
  return run(async () => {
    const me = await actor();
    const owned = await prisma.publication.findFirst({
      where: { id: publicationId, addedById: me.userId },
      select: { id: true },
    });
    need(owned !== null, "Only the person who added a publication can delete it.");
    await prisma.$transaction([
      prisma.publicationAuthor.deleteMany({ where: { publicationId } }),
      prisma.publication.delete({ where: { id: publicationId } }),
    ]);
    refresh();
    return "Publication deleted.";
  });
}
