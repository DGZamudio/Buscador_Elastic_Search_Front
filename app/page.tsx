"use client"
import FilterText from "@/components/search/FilterText";
import FiltersModal from "@/components/search/FiltersModal";
import FilterYears from "@/components/search/FilterYears";
import SearchBar from "@/components/search/SearchBar";
import SearchResultsPanel from "@/components/search/SearchResultsPanel";
import { useSearch } from "@/hooks/useSearch";
import { BookSearch, Search } from "lucide-react";
import { useState } from "react";
import ResultsModal from "@/components/search/SearchResultsModal";
import SearchResultsContent from "@/components/search/SearchResultsContent";
import Loader from "@/components/ui/Loader";
import NoResults from "@/components/ui/NoResults";

export default function Home() {
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    hasActiveFilters,
    memoizedUseSemanticSearch
  } = useSearch();

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const [resultsOpen, setResultsOpen] = useState<boolean>(false)

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-gradient-to-t from-[#7a1f1f] to-[#0f0f0f] to-50%">
        <main className="flex flex-col gap-8 items-center w-full">
            <div className="flex gap-10 items-center justify-between text-5xl font-semibold">
                <BookSearch className="w-[1.5em] h-[1.5em]"/>
                <h1>
                    <span className="text-[#7a1f1f]">Atlas</span> Search
                </h1>
            </div>

            <div className="relative flex flex-col items-center w-full">
                <SearchBar
                    value={query}
                    onChange={setQuery}
                    onOpenFilters={() => setFiltersOpen(true)}
                    onSubmit={() => setResultsOpen(true)}
                    filterActive={hasActiveFilters}
                />

                <Loader visible={loading}/>

                <NoResults visible={!loading && query.length > 0 && results.length == 0} />

                <div className="absolute top-full mt-10 w-full max-w-5xl flex justify-center">
                    <SearchResultsPanel 
                        results={results}
                        visible={!resultsOpen && results.length > 0 && query.length > 0}
                    />
                </div>

                <ResultsModal
                    open={resultsOpen}
                    onRender={memoizedUseSemanticSearch}
                    onClose={() => setResultsOpen(false)}
                >
                    <div className="relative">
                        <SearchResultsContent 
                            results={results}
                            visible={resultsOpen && results.length > 0 && query.length > 0 && !loading}
                        />
                        
                        <Loader visible={loading}/>

                        <NoResults visible={!loading && query.length > 0 && results.length == 0} />
                    </div>
                </ResultsModal>

                <FiltersModal
                    open={filtersOpen}
                    onSave={() => {
                        setFiltersOpen(false)
                    }}
                    onCancel={() => {
                        setFiltersOpen(false);
                        setFilters({
                            must: [],
                            should: [],
                            yearFrom:"",
                            yearTo:""
                        })
                    }}
                >
                    <FilterText
                        value={filters.must}
                        onChange={(palabras) => setFilters(prev => ({
                            ...prev,
                            must: palabras.split(" ")
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            must: []
                        }))}
                        label="Debe contener estas palabras (separadas por espacios):"
                    />
                    <FilterText
                        value={filters.should}
                        onChange={(palabras) => setFilters(prev => ({
                            ...prev,
                            should: palabras.split(" ")
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            should: []
                        }))}
                        label="Puede contener estas palabras (separadas por espacios):"
                    />
                    <FilterYears
                        yearFrom={filters.yearFrom}
                        yearTo={filters.yearTo}
                        onChangeyearFrom={(year) => setFilters(prev => ({
                            ...prev,
                            yearFrom: year
                        }))}
                        onChangeyearTo={(year) => setFilters(prev => ({
                            ...prev,
                            yearTo: year
                        }))}
                    />
                </FiltersModal>
            </div>
        </main>
    </div>
  );
}
