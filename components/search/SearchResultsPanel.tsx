import { SearchResultsProps } from "@/types/search";

export default function SearchResultsPanel({
  results,
  visible,
}: SearchResultsProps) {
    //href={`https://www.medellin.gov.co/normograma/docs/astrea/docs/${hit._source.Nombre}`}
  return (
    <div
        className={`
            mt-3 w-full
            bg-black/70 backdrop-blur-xl
            border border-white/10
            rounded-xl
            shadow-xl shadow-black/50
            overflow-hidden
            transition-all duration-200 ease-out
            ${visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"}
        `}
    >
        {results.slice(0,6).map((hit, index) => (
            <div
                key={index}
                className="
                    px-4 py-3 cursor-pointer
                    hover:bg-white/5 transition
                "
            >
                <p className="font-medium">
                    {hit._source.title}
                </p>
                <p className="text-sm">
                    {hit._source.Entidad} · {hit._source.Year}
                </p>
            </div>
        ))}
    </div>
  );
}
