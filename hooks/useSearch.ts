import { useCallback, useEffect, useMemo, useState } from "react";
import { regularSearch, semanticSearch } from "@/services/search.service";
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

    const memoizedFilters = useMemo(() => filters, [
        filters.must,
        filters.should,
        filters.yearFrom,
        filters.yearTo
    ])

    const memoizedUseSemanticSearch = useCallback(() => {
        if (!query) {
            setResults([]);
            return;
        }

        setLoading(true)
        semanticSearch(query, memoizedFilters, hasActiveFilters)
        .then((data) => setResults(data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [query, memoizedFilters, hasActiveFilters])

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await regularSearch(query, memoizedFilters, hasActiveFilters);
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query, hasActiveFilters, memoizedFilters]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    hasActiveFilters,
    memoizedUseSemanticSearch
  };
}
