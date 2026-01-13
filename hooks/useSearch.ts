import { useCallback, useEffect, useMemo, useState } from "react";
import { fragmentFilters, regularSearch, semanticSearch } from "@/services/search.service";
import { FragmentedFilters, SearchFilters, SearchHit, searchType } from "@/types/search";

export function useSearch() {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<SearchHit[]>([]);
    const [searchType, setSearchType] = useState<searchType>("regular");
    const [page, setPage] = useState<number>(0);
    const [pages, setPages] = useState<number>(0);
    const [filters, setFilters] = useState<SearchFilters>({});
    const [fragmentedFilters, setFragmentedFilters] = useState<FragmentedFilters | null>();
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingFragments, setLoadingFragments] = useState<boolean>(false);

    const normalizedFilters = useMemo(
        () => normalizeFilters(filters),
        [filters]
    )

    const hasActiveFilters = useMemo(
        () => Object.keys(normalizedFilters).length > 0,
        [normalizedFilters]
    )

    function normalizeFilters(filters: SearchFilters): SearchFilters {
        const normalized = { ...filters }

        if (
            !filters.proximity?.query &&
            !filters.proximity?.distance
        ) {
            delete normalized.proximity
        }

        if (
            !filters.years?.year_from &&
            !filters.years?.year_to
        ) {
            delete normalized.years
        }

        return normalized
    }

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        if (searchType !== "semantic") return

        setLoading(true)
        semanticSearch(query, normalizedFilters, hasActiveFilters, page)
        .then((data) => {
            setResults(data?.hits ?? [])
            setPages(data?.max_pages)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [query, page, normalizedFilters, hasActiveFilters, searchType])

    const memoizedUseGetFragmentedFilters = useCallback(() => {
        if (!query) {
            setFragmentedFilters(undefined);
            return;
        }

        setLoadingFragments(true)
        fragmentFilters(query, normalizedFilters, hasActiveFilters)
        .then((data) => setFragmentedFilters(data))
        .catch(console.error)
        .finally(() => setLoadingFragments(false))
    }, [query, normalizedFilters, hasActiveFilters])

    useEffect(() => {
        setPage(0);
    }, [query, normalizedFilters]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        if (searchType !== "regular") return

        const delay = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await regularSearch(query, normalizedFilters, hasActiveFilters, page);
                setResults(data?.hits ?? []);
                setPages(data.max_pages);
                setSearchType("regular")
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, 300); // debounce

        return () => clearTimeout(delay);
    }, [query, page, normalizedFilters, hasActiveFilters]);

    useEffect(() => {
        if (!query) {
            setFragmentedFilters(null)
            return
        }

        memoizedUseGetFragmentedFilters()

    }, [query])

    return {
        query,
        setQuery,
        filters,
        setFilters,
        results,
        loading,
        hasActiveFilters,
        fragmentedFilters,
        memoizedUseGetFragmentedFilters,
        loadingFragments,
        pages,
        page,
        setPage,
        searchType,
        setSearchType
    };
}
