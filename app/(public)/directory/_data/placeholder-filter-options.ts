import type { FilterOptionSet } from "./types";

// Placeholder select-box options. Swap `getFilterOptions` in
// `directory-service.ts` for a real API call (e.g. distinct values from the
// Express backend) and this file can go away.
export const placeholderFilterOptions: FilterOptionSet = {
  batchOptions: ["All batches", "Batch 01", "Batch 02", "Batch 03", "Batch 04"],
  sessionOptions: ["All sessions", "2020-21", "2021-22", "2022-23", "2023-24"],
  graduationYearOptions: ["Any year", "2023", "2024", "2025", "2026"],
  genderOptions: ["Any", "Male", "Female", "Other"],
  bloodGroupOptions: ["Any", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  cityOptions: ["Any city", "Netrokona", "Dhaka", "Chittagong", "Sylhet"],
  countryOptions: ["Any country", "Bangladesh", "Other"],
  degreeOptions: ["Any degree", "Diploma", "BSc", "MSc", "MBA", "PhD"],
  institutionOptions: ["Any institution", "BUET", "DU", "NSU", "BRAC"],
  jobIndustryOptions: [
    "Any industry",
    "Software / IT",
    "Telecom",
    "Finance / Banking",
    "Education",
    "Government",
    "Healthcare",
    "Research / Academia",
  ],
  companyOptions: [
    "Any company",
    "Google",
    "Microsoft",
    "Brain Station 23",
    "Therap BD",
    "Samsung R&D",
    "Other",
  ],
};
