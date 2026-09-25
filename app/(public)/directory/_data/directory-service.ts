import type {
  DirectoryProfile,
  DirectoryQueryParams,
  DirectoryResult,
  FilterOptionSet,
} from "./types";
import { placeholderProfiles } from "./placeholder-profiles";
import { placeholderFilterOptions } from "./placeholder-filter-options";

export const DEFAULT_PAGE_SIZE = 12;

/**
 * Returns a page of directory profiles matching the given query.
 *
 * Placeholder implementation: filters/paginates the in-memory
 * `placeholderProfiles` array. Once the Express API is ready, replace the
 * body with a `fetch("/api/directory?...")` call — callers (page.tsx /
 * DirectoryResults) already await this as if it were a network call, so no
 * call site needs to change.
 */
export async function getDirectoryProfiles(
  params: DirectoryQueryParams = {},
): Promise<DirectoryResult> {
  const {
    search,
    type = "all",
    batch,
    session,
    gradYear,
    gender,
    bloodGroup,
    city,
    country,
    degree,
    institution,
    industry,
    company,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
  } = params;

  let results: DirectoryProfile[] = placeholderProfiles;

  if (search) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.batch.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q),
    );
  }
  if (type !== "all") {
    const status = type === "students" ? "student" : "alumni";
    results = results.filter((p) => p.status === status);
  }
  if (batch) results = results.filter((p) => p.batch === batch);
  if (session) results = results.filter((p) => p.session === session);
  if (gradYear) results = results.filter((p) => p.graduationYear === gradYear);
  if (gender) results = results.filter((p) => p.gender === gender);
  if (bloodGroup) results = results.filter((p) => p.bloodGroup === bloodGroup);
  if (city) results = results.filter((p) => p.city === city);
  if (country) results = results.filter((p) => p.country === country);
  if (degree) results = results.filter((p) => p.degree === degree);
  if (institution) results = results.filter((p) => p.institution === institution);
  if (industry) results = results.filter((p) => p.jobIndustry === industry);
  if (company) results = results.filter((p) => p.company === company);

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    profiles: results.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

/**
 * Returns the option lists for every filter dropdown.
 *
 * Placeholder implementation: returns a static set. Once ready, replace
 * with a call that fetches distinct values (batches, cities, companies...)
 * from the API.
 */
export async function getFilterOptions(): Promise<FilterOptionSet> {
  return placeholderFilterOptions;
}
