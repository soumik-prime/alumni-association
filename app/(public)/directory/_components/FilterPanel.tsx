import Filter from "./Filter";
import { getFilterOptions } from "../_data/directory-service";

// Server component — this is the "call the server function" seam for the
// desktop filter panel. Filter.tsx itself stays a client component (it
// needs useSearchParams), so the data fetch happens here and gets passed
// down as props.
export default async function FilterPanel() {
  const options = await getFilterOptions();
  return <Filter {...options} />;
}
