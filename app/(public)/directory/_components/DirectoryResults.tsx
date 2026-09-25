import { Suspense } from "react";
import ListHeader from "./ListHeader";
import CardGrid from "./CardGrid";
import FilterChips from "./FilterChip";
import Pagination from "./Pagination";
import { getDirectoryProfiles } from "../_data/directory-service";
import type { DirectoryQueryParams } from "../_data/types";

export interface DirectoryResultsProps {
  query: DirectoryQueryParams;
}

// Server component — this is the "call the server function" seam for the
// results list. It awaits the query, then renders the (mostly client,
// URL-driven) pieces below it with the numbers they need.
export default async function DirectoryResults({
  query,
}: DirectoryResultsProps) {
  const { total, pageSize, profiles } = await getDirectoryProfiles(query);

  return (
    // flex-1 fills the min-height page.tsx reserves for this column (to
    // match the sticky filter sidebar); mt-auto below then pins Pagination
    // to the bottom instead of it trailing right under a short grid.
    <div className="flex flex-1 flex-col">
      <Suspense>
        <ListHeader total={total} pageSize={pageSize} />
      </Suspense>
      <Suspense
        fallback={
          <div className="mb-4 h-10 w-48 rounded-full bg-gray-100/80" />
        }
      >
        <FilterChips />
      </Suspense>
      <CardGrid profiles={profiles} />
      <div className="mt-auto">
        <Suspense fallback={null}>
          <Pagination total={total} pageSize={pageSize} />
        </Suspense>
      </div>
    </div>
  );
}
