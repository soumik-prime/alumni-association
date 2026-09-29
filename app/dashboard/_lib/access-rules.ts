import { prisma } from "@/lib/prisma/prisma";
import { need } from "./guards";

/** A group can only be handed out by someone who already holds all of its permissions. */
export async function assertCanAssignGroups(held: ReadonlySet<string>, groupIds: string[]) {
  const groups = await prisma.permissionGroup.findMany({
    where: { id: { in: groupIds } },
    select: { name: true, permissionItems: { select: { permissionKey: true } } },
  });
  need(groups.length === groupIds.length, "One of the selected groups no longer exists.");
  for (const g of groups) {
    const missing = g.permissionItems.filter((i) => !held.has(i.permissionKey));
    need(missing.length === 0, `You can't assign "${g.name}" because it includes permissions you don't have yourself.`);
  }
}
