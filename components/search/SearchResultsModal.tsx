"use client"

import { useEffect } from "react"
import { StepBack, StepForward, X } from "lucide-react"
import { ResultsModalProps } from "@/types/search"

export default function ResultsModal({
  open,
  onClose,
  onRender,
  children,
  page,
  pages,
  setPage
}: ResultsModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    onRender()
  }, [open, page, onRender])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        />

        <div className="relative w-full max-w-7xl mx-4 rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[80vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">Esto encontramos:</h2>
                    <p className="text-white/50 text-sm sm:text-base">
                        Resultados mejorados usando búsqueda semántica
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="text-stone-400 hover:text-white transition cursor-pointer"
                >
                    <X size="1.2em" />
                </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-2">
                {children}
            </div>

            <div className="px-6 py-3 border-t border-white/10 flex justify-between items-center bg-[#0f0f0f]">
                <button onClick={() => setPage(-1)} className="flex items-center justify-between gap-1 px-3 py-1 bg-stone-800 rounded hover:bg-stone-700 transition">
                    <StepBack 
                        size={"1em"}
                    />
                    Anterior
                </button>
                <p>
                    {(page ?? 0) + 1} - {pages}
                </p>
                <button onClick={() => setPage(1)} className="flex items-center justify-between gap-1 px-3 py-1 bg-stone-800 rounded hover:bg-stone-700 transition">
                    Siguiente
                    <StepForward 
                        size={"1em"}
                    />
                </button>
            </div>
        </div>
    </div>
  )
}
