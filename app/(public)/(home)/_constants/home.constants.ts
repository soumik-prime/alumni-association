export const ROUTES = {
  directory: "/directory",
  batches: "/batches",
  statistics: "/statistics",
} as const;

export const FEATURED_LIMIT = 8;
export const SAMPLE_SIZE = 8;


/** Headline shown for alumni currently in higher study, keyed by Prisma `Degree` enum name. */
export const STUDY_HEADLINES: Partial<Record<string, string>> = {
  MSC: "Master's Student",
  MBA: "MBA Student",
  MPHIL: "MPhil Student",
  PHD: "PhD Candidate",
  POSTDOC: "Postdoctoral Researcher",
};

/** Decorative avatar rings for the hero (r, s are % of a square box). */
export const ORBIT_RINGS = [
  { r: 21, s: 17, source: "current", reverse: false, angles: [-70, 5, 80, 155, 230] },
  { r: 34, s: 14, source: "alumni", reverse: false, angles: [-100, -55, -10, 45, 100, 160, 215] },
  { r: 45, s: 11, source: "alumni", reverse: true, angles: [-75, -20, 40, 110, 200] },
] as const;
