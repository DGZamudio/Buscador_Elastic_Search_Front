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
                value={yearFrom}
                onChange={(e) => onChangeyearFrom(e.target.value)}
                placeholder="Año inicial"
                className="
                    border border-white/10
                    rounded p-2 w-1/3
                    focus:ring-1
                "
                type="number"
            />
            -
            <input 
                value={yearTo}
                onChange={(e) => onChangeyearTo(e.target.value)}
                placeholder="Año inicial"
                className="
                    border border-white/10
                    rounded p-2 w-1/3
                    focus:ring-1
                "
                type="number"
            />
        </div>
    )
}

export default FilterYears