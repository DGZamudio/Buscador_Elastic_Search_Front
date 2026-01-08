import { SearchFilters, SearchHit } from "@/types/search";

export async function regularSearch(
  query: string,
  filters: SearchFilters,
  hasActiveFilters: boolean
): Promise<SearchHit[]> {
  if (!query) return [];

  const params = new URLSearchParams();
  params.append("search_query", query);

  if (hasActiveFilters) {
    filters.must.forEach(value => {
      params.append("must", value);
    });

    filters.should.forEach(value => {
      params.append("should", value);
    });

    if (filters.yearFrom) {
      params.append("year_from", filters.yearFrom);
    }

    if (filters.yearTo) {
      params.append("year_to", filters.yearTo);
    }
  }

  const url = `http://127.0.0.1:8000/api/v1/regular_search/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error HTTP");
  }

  const data = await response.json();
  return data?.hits ?? [];
}

export async function semanticSearch(
  query: string,
  filters: SearchFilters,
  hasActiveFilters: boolean
): Promise<SearchHit[]> {
  if (!query) return [];

  const params = new URLSearchParams();
  params.append("search_query", query);

  if (hasActiveFilters) {
    filters.must.forEach(value => {
      params.append("must", value);
    });

    filters.should.forEach(value => {
      params.append("should", value);
    });

    if (filters.yearFrom) {
      params.append("year_from", filters.yearFrom);
    }

    if (filters.yearTo) {
      params.append("year_to", filters.yearTo);
    }
  }

  const url = `http://127.0.0.1:8000/api/v1/semantic_search/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error HTTP");
  }

  const data = await response.json();
  return data?.hits ?? [];
}