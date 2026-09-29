import { getFeaturedProfileRows } from "../_repositories/featured-profile.repository";
import { buildHeadline, getMemberStatus } from "../_lib/member";
import type { FeaturedMember } from "../_types/home.types";

export async function getFeaturedMembers(): Promise<FeaturedMember[]> {
  const rows = await getFeaturedProfileRows();

  return rows.map(({ profile: p }) => ({
    id: p.id,
    name: p.name,
    batch: p.batch,
    session: p.session,
    status: getMemberStatus(p.graduationDate),
    headline: buildHeadline(p),
    location: p.presentAddress ? `${p.presentAddress.city}, ${p.presentAddress.country.name}` : null,
    bio: p.bio,
    verified: p.user.emailVerified,
  }));
}
