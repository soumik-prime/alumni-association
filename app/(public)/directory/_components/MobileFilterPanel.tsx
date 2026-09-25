import { MobileFilter } from "./MobileFilter";
import { getFilterOptions } from "../_data/directory-service";

// Same idea as FilterPanel.tsx, for the mobile drawer.
export default async function MobileFilterPanel() {
  const options = await getFilterOptions();
  return <MobileFilter {...options} />;
}
