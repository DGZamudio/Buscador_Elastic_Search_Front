import { FilterTextProps } from "@/types/search"
import { X } from "lucide-react"

function FilterText({
    value,
    onChange,
    clear,
    label
}:FilterTextProps) {
    return (
        <div className="flex w-full flex-col gap-2 justify-evenly items-center">
            <label>
                {label}
            </label>
            <div className="
                        border border-white/10
                        rounded 
                        flex justify-evenly
                        w-full
                        focus-within:outline-none
                        focus-within:ring-1 focus-within:ring-[#7a1f1f]
                        focus-within:border-[#7a1f1f]
                        transition
                        duration-200
                    ">
                <input 
                    value={value.join(" ")}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Ej: ley"
                    className="
                        focus:outline-none focus:ring-0
                        p-2 w-7/8
                    "
                    type="text"
                />
                {value.length > 0 && (
                    <button
                        onClick={() => clear()}
                    >
                        <X className="cursor-pointer"/>
                    </button>
                )}
            </div>
        </div>
    )
}

export default FilterText