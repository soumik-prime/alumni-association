import type { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "./_components/SearchBar";
import CardGrid from "./_components/CardGrid";
import FilterChips from "./_components/FilterChip";
import Title from "../_components/Title";
import Filter from "./_components/Filter";
import { MobileFilter } from "./_components/MobileFilter";
import Pagination from "./_components/Pagination";
import ListHeader from "./_components/ListHeader";


export const metadata: Metadata = {
  title: "Directory",
  description:
    "Browse the alumni and student directory for the Department of CSE at Netrokona University.",
};

export default async function Page() {
  // { searchParams }: { searchParams: Promise<{ q?: string; batch?: string; session?: string; city?: string; page?: string }> }
  // const params = await searchParams;
  // const batch = params.batch ? Number(params.batch) : undefined;
  // const page = params.page ? Number(params.page) : 1;
  // const result = await getPublicProfiles({ query: params.q, batch: Number.isFinite(batch) ? batch : undefined, session: params.session, city: params.city, page });
  const bgColor = "bg-linear-to-r from-green-50/80 via-white to-emerald-50/80";
  const title = "Alumni & Student Directory";
  const description =
    "Find and explore alumni and student profiles, and connect with the wider CSE community.";
  const maxWidth = "w-full max-w-screen-2xl mx-auto";

  return (
    <main id="main-content" className={bgColor} aria-label="Main content">
      <Title {...{ title, description, maxWidth }} />

      <div className={`${maxWidth} px-2 md:px-6 pt-4 grid grid-cols-[1fr_auto] items-stretch gap-2 lg:flex lg:justify-center`}>
        <Suspense
          fallback={<div className="h-12 w-full rounded-2xl bg-gray-100/80" />}
        >
          <SearchBar />
        </Suspense>
        <Suspense>
          <MobileFilter />
        </Suspense>
      </div>

      <div
        className={`${maxWidth} w-full max-w-screen-2xl pt-6 md:pt-8 mx-auto lg:grid grid-cols-4 px-2 lg:px-6 pb-12 gap-10`}
      >
        <div
          className="col-span-1 hidden lg:block lg:sticky lg:top-16 lg:self-start"
          style={{ height: "calc(100vh - 5rem)" }}
        >
          <Suspense
            fallback={<div className="h-120 rounded-3xl bg-white/80" />}
          >
            <Filter />
          </Suspense>
        </div>
        <div className="md:col-span-3">
          <Suspense>
            <ListHeader  total={200} pageSize={12} />
          </Suspense>
          <Suspense
            fallback={
              <div className="mb-4 h-10 w-48 rounded-full bg-gray-100/80" />
            }
          >
            <FilterChips />
          </Suspense>
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 rounded-2xl bg-gray-100/80" />
                ))}
              </div>
            }
          >
            <CardGrid />
          </Suspense>
          <Suspense fallback={null}>
            <Pagination total={200} pageSize={12} />
          </Suspense>
        </div>
      </div>

      {/* <DirectoryView profiles={result.profiles} total={result.total} page={result.page} totalPages={result.totalPages} query={params.q} batch={Number.isFinite(batch) ? batch : undefined} session={params.session} city={params.city} /> */}
    </main>
  );
}