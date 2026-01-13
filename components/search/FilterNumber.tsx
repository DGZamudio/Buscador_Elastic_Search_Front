import { FilterNumberProps } from "@/types/search"

function FilterNumber({
    value,
    onChange,
    label,
    placeholder
}:FilterNumberProps) {

    return (
        <div className="flex w-full flex-col gap-2 justify-evenly items-center">
            <label>
                {label}
            </label>
            <div className="
                        border border-(--foreground)/10
                        rounded 
                        flex justify-evenly
                        w-full
                        focus-within:outline-none
                        focus-within:ring-1 focus-within:ring-(--color-primary)
                        focus-within:border-(--color-primary)
                        transition
                        duration-200
                    ">
                <input 
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    placeholder={placeholder}
                    className="
                        focus:outline-none focus:ring-0
                        p-2 w-7/8
                    "
                    type="number"
                />
            </div>
        </div>
    )
}

export default FilterNumber