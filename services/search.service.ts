import { SearchHit } from "@/types/search";

export async function regularSearch(
  query: string
): Promise<SearchHit[]> {
  if (!query) return [];

  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/regular_search/?search_query=${query}`
  );

  if (!response.ok) {
    throw new Error("Error HTTP");
  }

  const data = await response.json();
  return data.hits;
}
