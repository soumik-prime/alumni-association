export type MemberStatus = "alumni" | "current";

/* ---------- View models (what components receive) ---------- */

export type CommunityStats = {
  batches: number;
  students: number;
  current: number;
  alumni: number;
};

export type BatchSummary = {
  number: number;
  session: string;
  graduated: boolean;
  memberCount: number;
};

export type CommunitySample = {
  currentNames: string[];
  alumniNames: string[];
};

export type CommunityOverview = {
  stats: CommunityStats;
  batches: BatchSummary[];
  sample: CommunitySample;
};

export type FeaturedMember = {
  id: string;
  name: string;
  batch: number;
  session: string;
  status: MemberStatus;
  headline: string;
  location: string | null;
  bio: string | null;
  verified: boolean;
};

/* ---------- Repository rows (what data access returns) ---------- */

export type BatchGroupRow = {
  batch: number;
  session: string;
  total: number;
  graduatedCount: number;
};

/** Shape of one featuredProfile row joined with its profile. */
export type FeaturedProfileRow = {
  position: number;
  profile: {
    id: string;
    name: string;
    batch: number;
    session: string;
    graduationDate: Date | null;
    bio: string | null;
    user: { emailVerified: boolean };
    presentAddress: { city: string; country: { name: string } } | null;
    workExperiences: { title: string; endDate: Date | null; company: { name: string } }[];
    educations: { degree: string; graduationYear: number | null; institution: { name: string } }[];
  };
};
