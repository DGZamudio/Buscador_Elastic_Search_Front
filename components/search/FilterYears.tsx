import { FilterYearsProps } from "@/types/search"

function FilterYears({
    yearFrom,
    yearTo,
    onChangeyearFrom,
    onChangeyearTo
}:FilterYearsProps) {
    return (
        <div className="flex justify-between items-center mt-3">
            <label>
                Rango de años:
            </label>
            <input 
                value={yearFrom ?? ""}
                onChange={(e) => onChangeyearFrom(e.target.value === "" ? undefined : e.target.value)}
                placeholder="Año inicial"
                className="
                    border border-(--foreground)/10
                    rounded p-2 w-1/3
                    focus:outline-none
                    focus:ring-1 focus:ring-(--color-primary)
                    focus:border-(--color-primary)
                    transition
                    duration-200
                "
                type="number"
            />
            -
            <input 
                value={yearTo ?? ""}
                onChange={(e) => onChangeyearTo(e.target.value === "" ? undefined : e.target.value)}
                placeholder="Año final"
                className="
                    border border-(--foreground)/10
                    rounded p-2 w-1/3
                    focus:outline-none
                    focus:ring-1 focus:ring-(--color-primary)
                    focus:border-(--color-primary)
                    transition
                    duration-200
                "
                type="number"
            />
        </div>
    )
}

export default FilterYears