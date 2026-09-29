import { enumMappings } from "../_constants/enum-mapping";
import {
  findCities,
  findCompanies,
  findCountries,
  findDistinctBatches,
  findGraduationDates,
  findDistinctSessions,
  findInstitutions,
} from "../_repositories/filter.repository";
import type { FilterOptionSet } from "../_types/filter.types";

export async function getFilterOptions(): Promise<FilterOptionSet> {
  const [
    batches,
    sessions,
    graduationDates,
    countries,
    cities,
    institutions,
    companies,
  ] = await Promise.all([
    findDistinctBatches(),
    findDistinctSessions(),
    findGraduationDates(),
    findCountries(),
    findCities(),
    findInstitutions(),
    findCompanies(),
  ]);



  const graduationYears = [
    ...new Set(
      graduationDates.map(({ graduationDate }) => graduationDate?.getFullYear()).filter(Boolean),
    ),
  ];

  return {
    batchOptions: ["All batches", ...batches.map(({ batch }) => `${String(batch)}`)],
    sessionOptions: ["All sessions", ...sessions.map(({ session }) => session)],
    graduationYearOptions: [
      "Any year",
      ...graduationYears.map(String),
    ],
    genderOptions: ["Any", "Male", "Female"],
    bloodGroupOptions: ["Any", ...Object.keys(enumMappings.bloodGroup)],
    cityOptions: ["Any city", ...cities.map(({ city }) => city)],
    countryOptions: ["Any country", ...countries.map(({ name }) => name)],
    degreeOptions: ["Any degree", ...Object.keys(enumMappings.degree)],
    institutionOptions: ["Any institution", ...institutions.map(({ name }) => name)],
    jobIndustryOptions: ["Any industry", ...Object.keys(enumMappings.jobIndustry)],
    companyOptions: ["Any company", ...companies.map(({ name }) => name)],
  };
}
