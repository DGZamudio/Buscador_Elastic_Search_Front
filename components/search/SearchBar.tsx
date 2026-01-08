"use client"

import { SearchBarProps } from "@/types/search";
import { Funnel, FunnelPlus, Search } from "lucide-react";

function SearchBar({
    value,
    onChange,
    onSubmit,
    onOpenFilters,
    filterActive,
    placeholder = "Buscar en Atlas..."
}: SearchBarProps) {
  return (
    <form 
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
        }}
        className="
            relative w-full max-w-5xl
        "
    >
        <div
            className="
                flex items-stretch
                rounded-xl
                border border-white/10
                bg-black/40 backdrop-blur
                overflow-hidden
                transition
            "
        >
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="
                    flex-1
                    bg-transparent
                    px-5 py-4
                    outline-none
                    text-lg
                "
            />
            <button
                className="
                    flex items-center justify-center
                    px-5
                    hover:bg-[#7a1f1f] hover:text-white!
                    transition
                    border-l border-white/10
                    cursor-pointer
                "
                onClick={onOpenFilters}
            >
                {filterActive ? (
                    <FunnelPlus 
                        size="1.2em"
                        className="text-[#7a1f1f]"
                    />
                ) : (
                    <Funnel 
                        size="1.2em"
                        className="text-white"
                    />
                )}
            </button>
            <button
                className="
                    flex items-center justify-center
                    px-5
                    hover:bg-[#7a1f1f]
                    transition
                    border-l border-white/10
                    cursor-pointer
                "
                onClick={() => onSubmit?.()}
            >
                <Search
                    size="1.2em"
                    className="text-white"
                />
            </button>
        </div>
    </form>
  )
}

export default SearchBar