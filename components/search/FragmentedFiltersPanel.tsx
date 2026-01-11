import { FragmentedFiltersProps } from "@/types/search";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import Loader from "../ui/Loader";

export default function FragmentedFilters({
  fragments,
  visible,
  onFilter,
  loading
}: FragmentedFiltersProps) {
  const [openTipos, setOpenTipos] = useState<Set<string>>(new Set());
  const [openEntidades, setOpenEntidades] = useState<Set<string>>(new Set());

  function toggle(setter: typeof setOpenTipos | typeof setOpenEntidades, key: string) {
    setter((prev: Set<string>) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  if (!visible) return null;

  return (
    <div className="mt-3 max-w-2xl rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl">
        {loading ? (
            <Loader visible/>
        ) : (
            <>
                {fragments?.tipo.buckets.map(tipo => {
                    const tipoOpen = openTipos.has(tipo.key);

                    return (
                    <div key={tipo.key} className="border-b border-white/5 px-4 py-3">
                        <button
                            onClick={() => toggle(setOpenTipos, tipo.key)}
                            className="flex w-full items-center gap-2 text-left hover:text-white"
                        >
                            {tipoOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            <span className="font-semibold">{tipo.key}</span>
                            <span className="ml-auto text-xs text-white/50">
                                {tipo.doc_count}
                            </span>
                        </button>

                        {tipoOpen && (
                            <div className="mt-2 ml-4 space-y-2">
                                {tipo.entidad.buckets.map(entidad => {
                                    const entidadKey = `${tipo.key}-${entidad.key}`;
                                    const entidadOpen = openEntidades.has(entidadKey);

                                    return (
                                        <div key={entidadKey}>
                                            <button
                                                onClick={() => toggle(setOpenEntidades, entidadKey)}
                                                className="flex w-full items-center gap-2 text-sm hover:text-white"
                                            >
                                                {entidadOpen ? (
                                                    <ChevronDown size={14} />
                                                ) : (
                                                    <ChevronRight size={14} />
                                                )}
                                                <span>{entidad.key}</span>
                                                <span className="ml-auto text-xs text-white/40">
                                                    {entidad.doc_count}
                                                </span>
                                            </button>

                                            {entidadOpen && (
                                                <div className="mt-1 ml-6 space-y-1">
                                                    {entidad.year.buckets.map(year => (
                                                        <button
                                                            key={year.key}
                                                            className="block w-full text-left text-xs text-white/70 hover:text-white"
                                                            onClick={() => onFilter(year.key_as_string, entidad.key, tipo.key)}
                                                        >
                                                            {year.key_as_string} ({year.doc_count})
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                        )}
                    </div>
                    );
                })}
            </>
        )}
    </div>
  );
}
