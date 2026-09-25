import { getFilterOptions } from "../_services/filter.service";
import { MobileFilter } from "./MobileFilter";

// Same idea as FilterPanel.tsx, for the mobile drawer.
export default async function MobileFilterPanel() {
  const options = await getFilterOptions();
  return <MobileFilter {...options} />;
}