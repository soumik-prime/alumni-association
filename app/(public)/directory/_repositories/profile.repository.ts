import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma/prisma";

// The exact shape returned by findProfiles' `select`. Kept next to the query
// so the service layer can type its mapping function against it directly.
const PROFILE_LIST_SELECT = {
  id: true,
  regNo: true,
  name: true,
  photo: true,
  batch: true,
  session: true,
  graduationYear: true,
  gender: true,
  bloodGroup: true,
  presentAddress: {
    select: {
      city: true,
      country: { select: { name: true } },
    },
  },
  permanentAddress: {
    select: {
      city: true,
      country: { select: { name: true } },
    },
  },
} satisfies Prisma.ProfileSelect;

export type ProfileListRow = Prisma.ProfileGetPayload<{
  select: typeof PROFILE_LIST_SELECT;
}>;

export function countProfiles(
  where: Prisma.ProfileWhereInput,
): Promise<number> {
  return prisma.profile.count({ where });
}

export function findProfiles(params: {
  where: Prisma.ProfileWhereInput;
  skip: number;
  take: number;
}): Promise<ProfileListRow[]> {
  return prisma.profile.findMany({
    where: params.where,
    skip: params.skip,
    take: params.take,
    orderBy: { createdAt: "desc" },
    select: PROFILE_LIST_SELECT,
  });
}
