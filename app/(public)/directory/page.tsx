import type { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "./_components/SearchBar";
import DirectoryResults from "./_components/DirectoryResults";
import Title from "../_components/Title";
import FilterPanel from "./_components/FilterPanel";
import MobileFilterPanel from "./_components/MobileFilterPanel";
import SearchBarSkeleton from "./_components/skeletons/SearchBarSkeleton";
import FilterSkeleton from "./_components/skeletons/FilterSkeleton";
import MobileFilterSkeleton from "./_components/skeletons/MobileFilterSkeleton";
import DirectoryResultsSkeleton from "./_components/skeletons/DirectoryResultsSkeleton";
import { DEFAULT_PAGE_SIZE } from "./_constants/filter-defaults";
import type { DirectoryQueryParams } from "./_types/query-params.types";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Browse the alumni and student directory for the Department of CSE at Netrokona University.",
};

interface PageSearchParams {
  search?: string;
  type?: string;
  batch?: string;
  session?: string;
  gradYear?: string;
  gender?: string;
  bloodGroup?: string;
  city?: string;
  country?: string;
  degree?: string;
  institution?: string;
  industry?: string;
  company?: string;
  page?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<PageSearchParams>;
}) {
  const params = await searchParams;

  const toEnumKey = <T extends Record<string, string>>(
    value: string | undefined,
    mapping: T,
  ): keyof T | undefined => {
    if (!value) return undefined;
    return Object.prototype.hasOwnProperty.call(mapping, value)
      ? (value as keyof T)
      : undefined;
  };

  const query: DirectoryQueryParams = {
    search: params.search,
    type:
      params.type === "students" || params.type === "alumni"
        ? params.type
        : "all",
    batch: params.batch ? Number(params.batch) : undefined,
    session: params.session,
    gradYear: params.gradYear ? Number(params.gradYear) : undefined,
    gender: toEnumKey(params.gender, {
      Male: "Male",
      Female: "Female",
    }),
    bloodGroup: toEnumKey(params.bloodGroup, {
      "A+": "A+",
      "A-": "A-",
      "B+": "B+",
      "B-": "B-",
      "O+": "O+",
      "O-": "O-",
      "AB+": "AB+",
      "AB-": "AB-",
    }),
    city: params.city,
    country: params.country,
    degree: toEnumKey(params.degree, {
      MSc: "MSc",
      MBA: "MBA",
      MPhil: "MPhil",
      PhD: "PhD",
      PostDoc: "PostDoc",
      Other: "Other",
    }),
    institution: params.institution,
    industry: toEnumKey(params.industry, {
      "Software & IT Services": "Software & IT Services",
      "Artificial Intelligence": "Artificial Intelligence",
      Cybersecurity: "Cybersecurity",
      "Cloud Computing": "Cloud Computing",
      "Blockchain / Web3": "Blockchain / Web3",
      "Game Development": "Game Development",
      "Embedded / IoT": "Embedded / IoT",
      "Robotics & Automation": "Robotics & Automation",
      Telecom: "Telecom",
      Fintech: "Fintech",
      "Banking & Finance": "Banking & Finance",
      "E-commerce": "E-commerce",
      Education: "Education",
      "Research & Academia": "Research & Academia",
      Government: "Government",
      Healthcare: "Healthcare",
      Consulting: "Consulting",
      Startup: "Startup",
      Manufacturing: "Manufacturing",
      Other: "Other",
    }),
    company: params.company,
    page: params.page ? Number(params.page) || 1 : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  const bgColor = "bg-linear-to-r from-green-50/80 via-white to-emerald-50/80";
  const title = "Alumni & Student Directory";
  const description =
    "Find and explore alumni and student profiles, and connect with the wider CSE community.";
  const maxWidth = "w-full max-w-screen-2xl mx-auto";

  return (
    <main id="main-content" className={bgColor} aria-label="Main content">
      <Title {...{ title, description, maxWidth }} />

      <div className={`${maxWidth} px-2 md:px-6 pt-4 grid grid-cols-[1fr_auto] items-stretch gap-2 lg:flex lg:justify-center`}>
        <Suspense fallback={<SearchBarSkeleton />}>
          <SearchBar />
        </Suspense>
        <Suspense fallback={<MobileFilterSkeleton />}>
          <MobileFilterPanel />
        </Suspense>
      </div>

      <div
        className={`${maxWidth} w-full max-w-screen-2xl pt-6 md:pt-8 mx-auto lg:grid grid-cols-4 px-2 lg:px-6 pb-12 gap-10`}
      >
        <div
          className="col-span-1 hidden lg:block lg:sticky lg:top-16 lg:self-start"
          style={{ height: "calc(100vh - 5rem)" }}
        >
          <Suspense fallback={<FilterSkeleton />}>
            <FilterPanel />
          </Suspense>
        </div>
        <div className="md:col-span-3 flex flex-col lg:min-h-[calc(100vh-5rem)]">
          <Suspense fallback={<DirectoryResultsSkeleton />}>
            <DirectoryResults query={query} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
