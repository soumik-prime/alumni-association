import { getFilterOptions } from "../_services/filter.service";
import Filter from "./Filter";


export default async function FilterPanel() {
  const options = await getFilterOptions();
  return <Filter {...options} />;
}
