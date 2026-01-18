import { getInitialFilters } from "@/services/search.service";
import SearchClient from "./SearchClient";

export default async function Home() {
  const initialFilters = await getInitialFilters();

  return (
    <SearchClient initialFilters={initialFilters} />
  );
}
