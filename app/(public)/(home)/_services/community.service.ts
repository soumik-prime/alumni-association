import { cache } from "react";
import { SAMPLE_SIZE } from "../_constants/home.constants";
import { getBatchGroups, getMemberNames } from "../_repositories/profile.repository";
import type { CommunityOverview } from "../_types/home.types";

/** Cached per request so several sections can call it without repeating queries. */
export const getCommunityOverview = cache(async (): Promise<CommunityOverview> => {
  const [groups, currentNames, alumniNames] = await Promise.all([
    getBatchGroups(),
    getMemberNames("current", SAMPLE_SIZE),
    getMemberNames("alumni", SAMPLE_SIZE),
  ]);

  const students = groups.reduce((sum, g) => sum + g.total, 0);
  const alumni = groups.reduce((sum, g) => sum + g.graduatedCount, 0);

  return {
    stats: { batches: groups.length, students, current: students - alumni, alumni },
    batches: groups.map((g) => ({
      number: g.batch,
      session: g.session,
      graduated: g.graduatedCount === g.total,
      memberCount: g.total,
    })),
    sample: { currentNames, alumniNames },
  };
});
