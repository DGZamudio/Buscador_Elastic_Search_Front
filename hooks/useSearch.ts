import { useEffect, useState } from "react";
import { regularSearch } from "@/services/search.service";
import { SearchFilters, SearchHit } from "@/types/search";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    must     : [],
    should   : [],
    yearFrom : "",
    yearTo   : ""
  });
  const [loading, setLoading] = useState(false);

  const hasActiveFilters =
    filters.must.length > 0 ||
    filters.should.length > 0 ||
    filters.yearFrom !== "" ||
    filters.yearTo !== ""


  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await regularSearch(query);
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    hasActiveFilters
  };
}
