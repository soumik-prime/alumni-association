import { enumMappings } from "../_constants/enum-mapping";

export interface QueryParams {
  search?: string;
  type?: "all" | "students" | "alumni";
  batch?: number;
  session?: string;
  gradYear?: number;
  gender?: keyof typeof enumMappings.gender;
  bloodGroup?: keyof typeof enumMappings.bloodGroup;
  city?: string;
  country?: string;
  degree?: keyof typeof enumMappings.degree;
  institution?: string;
  industry?: keyof typeof enumMappings.jobIndustry;
  company?: string;
  page?: number;
  pageSize?: number;
}

export type DirectoryQueryParams = QueryParams & {
  page: number;
  pageSize: number;
};
