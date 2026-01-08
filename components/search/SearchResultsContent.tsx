import { SearchResultsProps } from "@/types/search";
import Link from "next/link";

export default function SearchResultsContent({
  results,
  visible,
}: SearchResultsProps) {
  return (
    <>
        {visible && (
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
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"}
                `}
            >
                {results.map((hit, index) => (
                    <Link
                        key={index}
                        className="
                            block
                            px-4 py-3 cursor-pointer
                            hover:bg-white/25 transition
                        "
                        href={`https://www.medellin.gov.co/normograma/docs/astrea/docs/${hit._source.Numero}.htm`}
                    >
                        <p className="font-medium">
                            {hit._source.title}
                        </p>
                        <p className="text-white/50">
                            {hit._source.Epigrafe}
                        </p>
                        <p className="text-sm">
                            {hit._source.Entidad} · {hit._source.Year}
                        </p>
                    </Link>
                ))}
            </div>
        )}
    </>
  );
}
