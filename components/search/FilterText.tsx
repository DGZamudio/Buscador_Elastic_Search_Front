import { FilterTextProps } from "@/types/search"
import { X } from "lucide-react"

function FilterText({
    value,
    onChange,
    clear,
    label,
    placeholder
}:FilterTextProps) {

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
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="
                        focus:outline-none focus:ring-0
                        p-2 w-7/8
                    "
                    type="text"
                />
                {(value ?? "") !== "" && (
                    <button onClick={clear}>
                        <X className="cursor-pointer" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default FilterText