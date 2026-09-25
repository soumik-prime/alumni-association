"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DEFAULT_FILTERS,
  PARAM_KEYS,
  type CommunityType,
  type FilterState,
} from "../_data/filter-config";
import { placeholderFilterOptions } from "../_data/placeholder-filter-options";
import type { FilterOptionSet } from "../_data/types";

export type { CommunityType, FilterState };

export interface FilterPanelProps extends Partial<FilterOptionSet> {
  onFilterChange?: (filters: FilterState) => void;
  onReset?: () => void;
}

export default function Filter({
  onFilterChange,
  onReset,
  batchOptions = placeholderFilterOptions.batchOptions,
  sessionOptions = placeholderFilterOptions.sessionOptions,
  graduationYearOptions = placeholderFilterOptions.graduationYearOptions,
  genderOptions = placeholderFilterOptions.genderOptions,
  bloodGroupOptions = placeholderFilterOptions.bloodGroupOptions,
  cityOptions = placeholderFilterOptions.cityOptions,
  countryOptions = placeholderFilterOptions.countryOptions,
  degreeOptions = placeholderFilterOptions.degreeOptions,
  institutionOptions = placeholderFilterOptions.institutionOptions,
  jobIndustryOptions = placeholderFilterOptions.jobIndustryOptions,
  companyOptions = placeholderFilterOptions.companyOptions,
}: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters: FilterState = {
    communityType:
      (searchParams.get(PARAM_KEYS.communityType) as CommunityType) ??
      DEFAULT_FILTERS.communityType,
    batch: searchParams.get(PARAM_KEYS.batch) ?? DEFAULT_FILTERS.batch,
    session: searchParams.get(PARAM_KEYS.session) ?? DEFAULT_FILTERS.session,
    graduationYear:
      searchParams.get(PARAM_KEYS.graduationYear) ??
      DEFAULT_FILTERS.graduationYear,
    gender: searchParams.get(PARAM_KEYS.gender) ?? DEFAULT_FILTERS.gender,
    bloodGroup:
      searchParams.get(PARAM_KEYS.bloodGroup) ?? DEFAULT_FILTERS.bloodGroup,
    city: searchParams.get(PARAM_KEYS.city) ?? DEFAULT_FILTERS.city,
    country: searchParams.get(PARAM_KEYS.country) ?? DEFAULT_FILTERS.country,
    degree: searchParams.get(PARAM_KEYS.degree) ?? DEFAULT_FILTERS.degree,
    institution:
      searchParams.get(PARAM_KEYS.institution) ?? DEFAULT_FILTERS.institution,
    jobIndustry:
      searchParams.get(PARAM_KEYS.jobIndustry) ?? DEFAULT_FILTERS.jobIndustry,
    company: searchParams.get(PARAM_KEYS.company) ?? DEFAULT_FILTERS.company,
  };

  const pushParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleSelectChange = (key: keyof FilterState, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const paramKey = PARAM_KEYS[key];
    if (value === DEFAULT_FILTERS[key]) params.delete(paramKey);
    else params.set(paramKey, value);
    params.delete("page");
    pushParams(params);
    onFilterChange?.({ ...filters, [key]: value });
  };

  const handleReset = () => {
    pushParams(new URLSearchParams());
    onReset?.();
    onFilterChange?.(DEFAULT_FILTERS);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-3xl border border-gray-100 bg-white shadow-sm">
      <div className="flex shrink-0 items-center justify-between p-5 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#02644A]" />
          <h2 className="text-lg font-bold text-slate-700">Filters</h2>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-[#02644A]/30 px-3.5 py-1.5 text-xs font-medium text-[#02644A] transition-colors hover:border-[#02644A] hover:bg-[#02644A]/5 active:scale-95"
        >
          Reset all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-5 scrollbar-none">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500">
              Community type
            </label>
            <div className="flex rounded-xl bg-gray-50 p-1">
              {(["all", "students", "alumni"] as CommunityType[]).map(
                (type) => {
                  const isActive = filters.communityType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSelectChange("communityType", type)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${isActive ? "bg-[#02644A] text-white shadow-sm" : "text-gray-500 hover:text-slate-700"}`}
                    >
                      {type === "all" ? "All" : type}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <FilterSelect
            label="Batch"
            value={filters.batch}
            options={batchOptions}
            onChange={(value) => handleSelectChange("batch", value)}
          />
          <FilterSelect
            label="Session"
            value={filters.session}
            options={sessionOptions}
            onChange={(value) => handleSelectChange("session", value)}
          />
          <FilterSelect
            label="Graduation year"
            value={filters.graduationYear}
            options={graduationYearOptions}
            onChange={(value) => handleSelectChange("graduationYear", value)}
          />
          <FilterSelect
            label="Gender"
            value={filters.gender}
            options={genderOptions}
            onChange={(value) => handleSelectChange("gender", value)}
          />
          <FilterSelect
            label="Blood group"
            value={filters.bloodGroup}
            options={bloodGroupOptions}
            onChange={(value) => handleSelectChange("bloodGroup", value)}
          />

          <div className="grid grid-cols-2 gap-2">
            <FilterSelect
              label="City"
              value={filters.city}
              options={cityOptions}
              onChange={(value) => handleSelectChange("city", value)}
            />
            <FilterSelect
              label="Country"
              value={filters.country}
              options={countryOptions}
              onChange={(value) => handleSelectChange("country", value)}
            />
          </div>

          <FilterSelect
            label="Degree"
            value={filters.degree}
            options={degreeOptions}
            onChange={(value) => handleSelectChange("degree", value)}
          />
          <FilterSelect
            label="Educational institution"
            value={filters.institution}
            options={institutionOptions}
            onChange={(value) => handleSelectChange("institution", value)}
          />
          <FilterSelect
            label="Job industry"
            value={filters.jobIndustry}
            options={jobIndustryOptions}
            onChange={(value) => handleSelectChange("jobIndustry", value)}
          />

          <FilterSelect
            label="Company"
            value={filters.company}
            options={companyOptions}
            onChange={(value) => handleSelectChange("company", value)}
          />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors hover:border-[#00916A]/50 focus:border-[#02644A] focus:ring-1 focus:ring-[#02644A]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
