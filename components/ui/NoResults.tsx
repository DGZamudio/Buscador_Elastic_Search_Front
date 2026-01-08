import { LoaderProps } from "@/types/search";

export default function NoResults({
    visible
}:LoaderProps) {
  return (
    <>
        {visible && (
            <div className="absolute top-full mt-2 flex items-center gap-1 text-sm text-stone-500 h-md">
                <p>
                    Sin resultados :(
                </p>
            </div>
        )}
    </>
  )
}