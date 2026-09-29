import type { Metadata } from "next";
import { Suspense } from "react";
import { ClosingCard } from "./_components/closing-card";
import { CommunitySection } from "./_components/community-section";
import { FeaturedSection } from "./_components/featured-section";
import { HeroOrbit } from "./_components/hero-orbit";
import { HeroSection } from "./_components/hero-section";
import { StatStrip } from "./_components/stat-strip";
import { ClosingCardSkeleton } from "./_components/skeletons/closing-card-skeleton";
import { CommunitySectionSkeleton } from "./_components/skeletons/community-section-skeleton";
import { FeaturedSectionSkeleton } from "./_components/skeletons/featured-section-skeleton";
import { HeroOrbitSkeleton } from "./_components/skeletons/hero-orbit-skeleton";
import { StatStripSkeleton } from "./_components/skeletons/stat-strip-skeleton";
import { getCommunityOverview } from "./_services/community.service";
import { getFeaturedMembers } from "./_services/featured.service";

export const metadata: Metadata = {
  title: "CSE Alumni Association | Netrokona University",
  description:
    "Discover students, connect with alumni, and follow the academic, research, and career journeys that grow from CSE at Netrokona University.",
};


/* Thin async wrappers: call a service, hand the result to a presentational component. */
async function Orbit() {
  const { sample } = await getCommunityOverview();
  return <HeroOrbit sample={sample} />;
}

async function Stats() {
  const { stats } = await getCommunityOverview();
  return <StatStrip stats={stats} />;
}

async function Community() {
  const { batches, sample } = await getCommunityOverview();
  return <CommunitySection batches={batches} sample={sample} />;
}

async function Featured() {
  return <FeaturedSection members={await getFeaturedMembers()} />;
}

async function Closing() {
  const { stats, sample } = await getCommunityOverview();
  return <ClosingCard stats={stats} sample={sample} />;
}

export default function Page() {
  return (
    <main
      id="main-content"
      className="relative overflow-hidden bg-linear-to-b from-green-50/45 via-emerald-50/20 to-green-50/40"
      aria-label="Main content"
    >
      <div className="pointer-events-none absolute -left-20 -top-24 h-96 w-96 rounded-full bg-green-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-[28%] h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-[62%] h-96 w-96 rounded-full bg-green-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl" />

      <HeroSection>
        <Suspense fallback={<HeroOrbitSkeleton />}><Orbit /></Suspense>
      </HeroSection>
      <Suspense fallback={<StatStripSkeleton />}><Stats /></Suspense>
      <Suspense fallback={<CommunitySectionSkeleton />}><Community /></Suspense>
      <Suspense fallback={<FeaturedSectionSkeleton />}><Featured /></Suspense>
      <Suspense fallback={<ClosingCardSkeleton />}><Closing /></Suspense>
    </main>
  );
}
