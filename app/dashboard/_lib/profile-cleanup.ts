import type { Prisma } from "@/generated/prisma/client";

/**
 * Removes a profile and everything hanging off it. Educations / work
 * experience go with it; publication authorship is kept but turned into a
 * plain-text co-author so the publication itself isn't damaged.
 */
export async function deleteProfileCascade(
  tx: Prisma.TransactionClient,
  profile: { id: string; name: string },
) {
  await tx.education.deleteMany({ where: { studentId: profile.id } });
  await tx.workExperience.deleteMany({ where: { studentId: profile.id } });
  await tx.publicationAuthor.updateMany({
    where: { studentId: profile.id },
    data: { studentId: null, externalName: profile.name },
  });
  await tx.profile.delete({ where: { id: profile.id } });
}
