import { LoaderProps } from "@/types/search";
import { Search } from "lucide-react";

export default function Loader({
    visible
}:LoaderProps) {
  return (
    <>
        {visible && (
            <div className="absolute top-full mt-2 flex items-center gap-1 text-sm text-stone-500 h-md">
                <p>
                    Buscando
                </p>
                <Search size={"1em"}/>
            </div>
        )}
    </>
  )
}