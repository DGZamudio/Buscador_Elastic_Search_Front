"use client"
import FilterText from "@/components/search/FilterText";
import FiltersModal from "@/components/search/FiltersModal";
import FilterYears from "@/components/search/FilterYears";
import SearchBar from "@/components/search/SearchBar";
import SearchResultsPanel from "@/components/search/SearchResultsPanel";
import { useSearch } from "@/hooks/useSearch";
import { BookSearch } from "lucide-react";
import { useState } from "react";
import ResultsModal from "@/components/search/SearchResultsModal";
import SearchResultsContent from "@/components/search/SearchResultsContent";
import Loader from "@/components/ui/Loader";
import NoResults from "@/components/ui/NoResults";
import FilterNumber from "@/components/search/FilterNumber";
import FragmentedFilters from "@/components/search/FragmentedFiltersPanel";

export default function Home() {
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    loading,
    hasActiveFilters,
    memoizedUseSemanticSearch,
    fragmentedFilters,
    loadingFragments,
    page,
    pages,
    isTyping,
    setPage
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
                    onCleanFilters={() => setFilters({})}
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
                    page={page}
                    pages={pages}
                    setPage={(delta) => 
                        setPage(prev => {
                            const next = (prev ?? 0) + delta;
                            if (next < 0) return 0;
                            if (next >= (pages ?? 0)) return (pages ?? 0) - 1;
                            return next;
                        })
                    }
                >
                    <div className="relative">
                        <div className="flex">
                            <FragmentedFilters 
                                fragments={fragmentedFilters}
                                onFilter={(year,entidad,tipo) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        entity: entidad,
                                        document_type: tipo,
                                        years: {
                                            ...prev.years,
                                            year_to: year,
                                            year_from: year
                                        }
                                    }))
                                }}
                                visible={(fragmentedFilters?.tipo?.buckets?.length ?? 0) > 0 && resultsOpen && query.length > 0}
                                loading={loadingFragments}
                            />
                            <SearchResultsContent 
                                results={results}
                                visible={resultsOpen && results.length > 0 && query.length > 0 && !loading}
                            />
                        </div>
                        
                        {isTyping && (
                            <div className="absolute top-full mt-2 flex items-center gap-1 text-sm text-stone-500 h-md">
                                <p>
                                    Escribiendo ...
                                </p>
                            </div>
                        )}

                        <Loader visible={loading}/>

                        <NoResults visible={!isTyping && !loading && query.length > 0 && results.length == 0} />
                    </div>
                </ResultsModal>

                <FiltersModal
                    open={filtersOpen}
                    onSave={() => {
                        setFiltersOpen(false)
                    }}
                    onClose={() => {
                        setFiltersOpen(false)
                    }}
                    onCancel={() => {
                        setFiltersOpen(false);
                        setFilters({})
                    }}
                >
                    <FilterText
                        value={filters.title}
                        onChange={(frase) => setFilters(prev => ({
                            ...prev,
                            title: frase.trim()
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            title: undefined
                        }))}
                        label="Debe contener esto en el titulo:"
                        placeholder="Ej: Resolución del 2008"
                    />
                    <FilterText
                        value={filters.phrase}
                        onChange={(frase) => setFilters(prev => ({
                            ...prev,
                            phrase: frase.trim()
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            phrase: undefined
                        }))}
                        label="Debe contener esta frase:"
                        placeholder="Ingrese la frase"
                    />
                    <FilterText
                        value={filters.not_include?.join(" ") ?? ""}
                        onChange={(palabras) => setFilters(prev => ({
                            ...prev,
                            not_include: palabras.split(" ")
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            not_include: undefined
                        }))}
                        label="NO debe contener estas palabras:"
                        placeholder="Separa las palabras con espacios"
                    />
                    <FilterText
                        value={filters.must?.join(" ") ?? ""}
                        onChange={(palabras) => setFilters(prev => ({
                            ...prev,
                            must: palabras.split(" ")
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            must: undefined
                        }))}
                        label="Debe contener estas palabras:"
                        placeholder="Separa las palabras con espacios"
                    />
                    <FilterText
                        value={filters.should?.join(" ") ?? ""}
                        onChange={(palabras) => setFilters(prev => ({
                            ...prev,
                            should: palabras.split(" ")
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            should: undefined
                        }))}
                        label="Puede contener estas palabras:"
                        placeholder="Separa las palabras con espacios"
                    />
                    <FilterText 
                        value={filters.document_type}
                        onChange={(tipo_doc) => setFilters(prev => ({
                            ...prev,
                            document_type: tipo_doc
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            document_type: undefined
                        }))}
                        label="Define el tipo de documento:"
                        placeholder="Ej: Leyes"
                    />
                    <FilterText 
                        value={filters.entity}
                        onChange={(entidad) => setFilters(prev => ({
                            ...prev,
                            entity: entidad
                        }))}
                        clear={() => setFilters(prev => ({
                            ...prev,
                            entity: undefined
                        }))}
                        label="Escribe la entidad que remite el documento:"
                        placeholder="Ej: Procuraduría General de la Nación"
                    />
                    <div className="flex justify-between items-center gap-3 text-center">
                        <FilterText 
                            value={filters.proximity?.query}
                            onChange={(frase) => setFilters(prev => ({
                                ...prev,
                                proximity: {
                                    ...prev.proximity,
                                    query: frase
                                }
                            }))}
                            clear={() => setFilters(prev => ({
                                ...prev,
                                proximity: {
                                    ...prev.proximity,
                                    query: undefined
                                }
                            }))}
                            label="Estas palabras deben estan cerca:"
                            placeholder="Ej: Ley resolución consejo"
                        />
                        <FilterNumber 
                            value={filters.proximity?.distance}
                            onChange={(numero) => setFilters(prev => ({
                                ...prev,
                                proximity: {
                                    ...prev.proximity,
                                    distance: numero
                                }
                            }))}
                            label="Distancia entre las palabras cercanas:"
                            placeholder="Por defecto 8"
                        />
                    </div>
                    <FilterYears
                        yearFrom={filters.years?.year_from}
                        yearTo={filters.years?.year_to}
                        onChangeyearFrom={(year) =>
                            setFilters(prev => ({
                                ...prev,
                                years: {
                                    ...prev.years,
                                    year_from: year
                                }
                            }))
                        }
                        onChangeyearTo={(year) =>
                            setFilters(prev => ({
                                ...prev,
                                years: {
                                    ...prev.years,
                                    year_to: year
                                }
                            }))
                        }
                    />
                </FiltersModal>
            </div>
        </main>
    </div>
  );
}
