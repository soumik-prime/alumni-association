"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export type CommunityType = "all" | "students" | "alumni";

export interface FilterState {
  communityType: CommunityType;
  batch: string;
  session: string;
  semester: string;
  graduationYear: string;
  gender: string;
  location: string;
  institution: string;
  sortBy: string;
}

export interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
  onReset?: () => void;
  batchOptions?: string[];
  sessionOptions?: string[];
  semesterOptions?: string[];
  graduationYearOptions?: string[];
  genderOptions?: string[];
  locationOptions?: string[];
  institutionOptions?: string[];
  sortOptions?: string[];
}

const DEFAULT_FILTERS: FilterState = {
  communityType: "all",
  batch: "All batches",
  session: "All sessions",
  semester: "Any semester",
  graduationYear: "Any year",
  gender: "Any",
  location: "Anywhere",
  institution: "Any institution",
  sortBy: "Newest",
};

const PARAM_KEYS: Record<keyof FilterState, string> = {
  communityType: "type",
  batch: "batch",
  session: "session",
  semester: "semester",
  graduationYear: "gradYear",
  gender: "gender",
  location: "location",
  institution: "institution",
  sortBy: "sort",
};

export default function Filter({
  onFilterChange,
  onReset,
  batchOptions = ["All batches", "Batch 01", "Batch 02", "Batch 03"],
  sessionOptions = ["All sessions", "2020-21", "2021-22", "2022-23"],
  semesterOptions = ["Any semester", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
  graduationYearOptions = ["Any year", "2023", "2024", "2025", "2026"],
  genderOptions = ["Any", "Male", "Female", "Other"],
  locationOptions = ["Anywhere", "Dhaka", "Chittagong", "Sylhet", "Remote"],
  institutionOptions = ["Any institution", "BUET", "DU", "NSU", "BRAC"],
  sortOptions = ["Newest", "Oldest", "Name (A-Z)", "Name (Z-A)"],
}: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters: FilterState = {
    communityType: (searchParams.get(PARAM_KEYS.communityType) as CommunityType) ?? DEFAULT_FILTERS.communityType,
    batch: searchParams.get(PARAM_KEYS.batch) ?? DEFAULT_FILTERS.batch,
    session: searchParams.get(PARAM_KEYS.session) ?? DEFAULT_FILTERS.session,
    semester: searchParams.get(PARAM_KEYS.semester) ?? DEFAULT_FILTERS.semester,
    graduationYear: searchParams.get(PARAM_KEYS.graduationYear) ?? DEFAULT_FILTERS.graduationYear,
    gender: searchParams.get(PARAM_KEYS.gender) ?? DEFAULT_FILTERS.gender,
    location: searchParams.get(PARAM_KEYS.location) ?? DEFAULT_FILTERS.location,
    institution: searchParams.get(PARAM_KEYS.institution) ?? DEFAULT_FILTERS.institution,
    sortBy: searchParams.get(PARAM_KEYS.sortBy) ?? DEFAULT_FILTERS.sortBy,
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
    <div className="w-full rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#02644A]" />
          <h2 className="text-lg font-bold text-slate-700">Filters</h2>
        </div>
        <button type="button" onClick={handleReset} className="rounded-xl border border-[#02644A]/30 px-3.5 py-1.5 text-xs font-medium text-[#02644A] transition-colors hover:border-[#02644A] hover:bg-[#02644A]/5 active:scale-95">
          Reset all
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-500">Community type</label>
          <div className="flex rounded-xl bg-gray-50 p-1">
            {(["all", "students", "alumni"] as CommunityType[]).map((type) => {
              const isActive = filters.communityType === type;
              return (
                <button key={type} type="button" onClick={() => handleSelectChange("communityType", type)} className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${isActive ? "bg-[#02644A] text-white shadow-sm" : "text-gray-500 hover:text-slate-700"}`}>
                  {type === "all" ? "All" : type}
                </button>
              );
            })}
          </div>
        </div>

        <FilterSelect label="Batch" value={filters.batch} options={batchOptions} onChange={(value) => handleSelectChange("batch", value)} />
        <FilterSelect label="Session" value={filters.session} options={sessionOptions} onChange={(value) => handleSelectChange("session", value)} />
        <FilterSelect label="Semester" value={filters.semester} options={semesterOptions} onChange={(value) => handleSelectChange("semester", value)} />
        <FilterSelect label="Graduation year" value={filters.graduationYear} options={graduationYearOptions} onChange={(value) => handleSelectChange("graduationYear", value)} />
        <FilterSelect label="Gender" value={filters.gender} options={genderOptions} onChange={(value) => handleSelectChange("gender", value)} />
        <FilterSelect label="Location" value={filters.location} options={locationOptions} onChange={(value) => handleSelectChange("location", value)} />
        <FilterSelect label="Institution / higher studies" value={filters.institution} options={institutionOptions} onChange={(value) => handleSelectChange("institution", value)} />
        <FilterSelect label="Sort by" value={filters.sortBy} options={sortOptions} onChange={(value) => handleSelectChange("sortBy", value)} />
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500">{label}</label>
      <div className="relative">
        <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-slate-700 outline-none transition-colors hover:border-[#00916A]/50 focus:border-[#02644A] focus:ring-1 focus:ring-[#02644A]">
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
