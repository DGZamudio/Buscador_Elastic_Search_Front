"use client"

import { SearchBarProps } from "@/types/search";
import { BrushCleaning, Funnel, FunnelPlus, Search } from "lucide-react";

function SearchBar({
    value,
    onChange,
    onSubmit,
    onOpenFilters,
    onCleanFilters,
    filterActive,
    placeholder = "Buscar en Atlas..."
}: SearchBarProps) {
    const handleSubmit = () => {
        if (!value || value == "") return

        onSubmit?.()
    }
  return (
    <form 
        onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
        }}
        className="
            relative w-full max-w-5xl
        "
    >
        <div
            className="
                flex items-stretch
                rounded-xl
                border border-(--foreground)/10
                bg-(--background)/40 backdrop-blur
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
            {filterActive && (
                <button
                    className="
                        flex items-center justify-center
                        px-5
                        hover:bg-(--color-primary) hover:text-(--foreground)!
                        transition
                        border-l border-(--foreground)/10
                        cursor-pointer
                        text-(--color-primary)
                    "
                    type="button"
                    onClick={onCleanFilters}
                >
                    <BrushCleaning size="1.2em"/>
                </button>
            )}
            <button
                className={`
                    flex items-center justify-center
                    px-5
                    hover:bg-(--color-primary) hover:text-(--foreground)!
                    transition
                    border-l border-(--foreground)/10
                    cursor-pointer
                    ${filterActive ? "text-(--color-primary)" : "text-(--foreground)"}
                `}
                type="button"
                onClick={onOpenFilters}
            >
                {filterActive ? (
                    <FunnelPlus size="1.2em"/>
                ) : (
                    <Funnel size="1.2em"/>
                )}
            </button>
            <button
                className="
                    flex items-center justify-center
                    px-5
                    hover:bg-(--color-primary)
                    transition
                    border-l border-(--foreground)/10
                    cursor-pointer
                "
                onClick={() => handleSubmit()}
            >
                <Search
                    size="1.2em"
                    className="text-(--foreground)"
                />
            </button>
        </div>
    </form>
  )
}

export default SearchBar