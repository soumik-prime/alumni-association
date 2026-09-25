import { Suspense } from "react";
import ListHeader from "./ListHeader";
import CardGrid from "./CardGrid";
import FilterChips from "./FilterChip";
import Pagination from "./Pagination";
import { getDirectoryProfiles } from "../_services/profile.service";
import { QueryParams } from "../_types/query-params.types";

export interface DirectoryResultsProps {
  query: QueryParams;
}

export default async function DirectoryResults({
  query,
}: DirectoryResultsProps) {
  const { total, pageSize, profiles } = await getDirectoryProfiles(query);

  return (
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
