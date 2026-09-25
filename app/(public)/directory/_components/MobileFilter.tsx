"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { CommunityType, FilterState } from "./Filter";

export interface MobileFilterProps {
  onFilterChange?: (filters: FilterState) => void;
  onReset?: () => void;
  batchOptions?: string[];
  sessionOptions?: string[];
  graduationYearOptions?: string[];
  genderOptions?: string[];
  bloodGroupOptions?: string[];
  cityOptions?: string[];
  countryOptions?: string[];
  degreeOptions?: string[];
  institutionOptions?: string[];
  jobIndustryOptions?: string[];
  companyOptions?: string[];
}

const DEFAULT_FILTERS: FilterState = {
  communityType: "all",
  batch: "All batches",
  session: "All sessions",
  graduationYear: "Any year",
  gender: "Any",
  bloodGroup: "Any",
  city: "Any city",
  country: "Any country",
  degree: "Any degree",
  institution: "Any institution",
  jobIndustry: "Any industry",
  company: "Any company",
};

const PARAM_KEYS: Record<keyof FilterState, string> = {
  communityType: "type",
  batch: "batch",
  session: "session",
  graduationYear: "gradYear",
  gender: "gender",
  bloodGroup: "bloodGroup",
  city: "city",
  country: "country",
  degree: "degree",
  institution: "institution",
  jobIndustry: "industry",
  company: "company",
};

export function MobileFilter({
  onFilterChange,
  onReset,
  batchOptions = ["All batches", "Batch 01", "Batch 02", "Batch 03"],
  sessionOptions = ["All sessions", "2020-21", "2021-22", "2022-23"],
  graduationYearOptions = ["Any year", "2023", "2024", "2025", "2026"],
  genderOptions = ["Any", "Male", "Female", "Other"],
  bloodGroupOptions = [
    "Any",
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ],
  cityOptions = ["Any city", "Netrokona", "Dhaka", "Chittagong", "Sylhet"],
  countryOptions = ["Any country", "Bangladesh", "Other"],
  degreeOptions = ["Any degree", "Diploma", "BSc", "MSc", "MBA", "PhD"],
  institutionOptions = ["Any institution", "BUET", "DU", "NSU", "BRAC"],
  jobIndustryOptions = [
    "Any industry",
    "Software / IT",
    "Telecom",
    "Finance / Banking",
    "Education",
    "Government",
    "Healthcare",
    "Research / Academia",
  ],
  companyOptions = [
    "Any company",
    "Google",
    "Microsoft",
    "Brain Station 23",
    "Therap BD",
    "Samsung R&D",
    "Other",
  ],
}: MobileFilterProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

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

  // Draft state so filters only hit the URL on "Apply" — reset explicitly
  // when the drawer opens (not via effect) to avoid a setState-in-effect
  // cascade.
  const [draft, setDraft] = useState<FilterState>(filters);

  const openDrawer = () => {
    setDraft(filters);
    setOpen(true);
  };

  const activeCount = (Object.keys(filters) as (keyof FilterState)[]).filter(
    (key) => filters[key] !== DEFAULT_FILTERS[key]
  ).length;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const setDraftField = (key: keyof FilterState, value: string) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const apply = () => {
    const params = new URLSearchParams(searchParams.toString());
    (Object.keys(draft) as (keyof FilterState)[]).forEach((key) => {
      const paramKey = PARAM_KEYS[key];
      if (draft[key] === DEFAULT_FILTERS[key]) params.delete(paramKey);
      else params.set(paramKey, draft[key]);
    });
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    onFilterChange?.(draft);
    close();
  };

  const handleReset = () => {
    setDraft(DEFAULT_FILTERS);
    router.push(pathname, { scroll: false });
    onReset?.();
    onFilterChange?.(DEFAULT_FILTERS);
    close();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openDrawer}
        aria-label="Open filters"
        aria-expanded={open}
        aria-controls="mobile-filter-panel"
        className="relative lg:hidden aspect-square h-full rounded-sm flex items-center justify-center text-gray-700 transition-colors hover:border-gray-600 hover:text-[#02644A]"
      >
        <SlidersHorizontal className="size-7" />
        {activeCount > 0 && (
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#02644A] px-1 text-[10px] font-semibold text-white">
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        id="mobile-filter-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[85vw] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#02644A]" />
            <span className="text-sm font-semibold text-gray-900">Filters</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close filters"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-[#eff6f5] hover:text-[#268b81]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500">
              Community type
            </label>
            <div className="flex rounded-xl bg-gray-50 p-1">
              {(["all", "students", "alumni"] as CommunityType[]).map(
                (type, i) => {
                  const active = draft.communityType === type;
                  return (
                    <button
                      key={type}
                      ref={i === 0 ? firstFieldRef : undefined}
                      type="button"
                      onClick={() => setDraftField("communityType", type)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${
                        active
                          ? "bg-[#02644A] text-white shadow-sm"
                          : "text-gray-500 hover:text-slate-700"
                      }`}
                    >
                      {type === "all" ? "All" : type}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <MobileFilterSelect
            label="Batch"
            value={draft.batch}
            options={batchOptions}
            onChange={(v) => setDraftField("batch", v)}
          />
          <MobileFilterSelect
            label="Session"
            value={draft.session}
            options={sessionOptions}
            onChange={(v) => setDraftField("session", v)}
          />
          <MobileFilterSelect
            label="Graduation year"
            value={draft.graduationYear}
            options={graduationYearOptions}
            onChange={(v) => setDraftField("graduationYear", v)}
          />
          <MobileFilterSelect
            label="Gender"
            value={draft.gender}
            options={genderOptions}
            onChange={(v) => setDraftField("gender", v)}
          />
          <MobileFilterSelect
            label="Blood group"
            value={draft.bloodGroup}
            options={bloodGroupOptions}
            onChange={(v) => setDraftField("bloodGroup", v)}
          />

          <div className="grid grid-cols-2 gap-2">
            <MobileFilterSelect
              label="City"
              value={draft.city}
              options={cityOptions}
              onChange={(v) => setDraftField("city", v)}
            />
            <MobileFilterSelect
              label="Country"
              value={draft.country}
              options={countryOptions}
              onChange={(v) => setDraftField("country", v)}
            />
          </div>

          <MobileFilterSelect
            label="Degree"
            value={draft.degree}
            options={degreeOptions}
            onChange={(v) => setDraftField("degree", v)}
          />
          <MobileFilterSelect
            label="Educational institution"
            value={draft.institution}
            options={institutionOptions}
            onChange={(v) => setDraftField("institution", v)}
          />
          <MobileFilterSelect
            label="Job industry"
            value={draft.jobIndustry}
            options={jobIndustryOptions}
            onChange={(v) => setDraftField("jobIndustry", v)}
          />
          <MobileFilterSelect
            label="Company"
            value={draft.company}
            options={companyOptions}
            onChange={(v) => setDraftField("company", v)}
          />
        </div>

        {/* Sticky footer — Reset stays available even when the field list scrolls */}
        <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 rounded-xl border border-[#02644A]/30 px-3.5 py-2.5 text-sm font-medium text-[#02644A] transition-colors hover:border-[#02644A] hover:bg-[#02644A]/5 active:scale-95"
          >
            Reset all
          </button>
          <button
            type="button"
            onClick={apply}
            className="flex-1 rounded-xl bg-[#02644A] px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00916A] active:scale-95"
          >
            Apply filters
          </button>
        </div>
      </div>
    </>
  );
}

function MobileFilterSelect({
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