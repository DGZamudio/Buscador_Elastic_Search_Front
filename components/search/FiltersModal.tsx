"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { ModalProps } from "@/types/search"

export default function FiltersModal({
  open,
  onClose,
  onCancel,
  onSave,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
        <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        />

        <div className="relative mx-auto mt-32 w-full max-w-lg">
            <div className="
                rounded-2xl
                bg-[#0f0f0f]
                border border-white/10
                shadow-2xl
            ">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold">
                        Filtros avanzados
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-white transition cursor-pointer"
                    >
                        <X size="1.2em" />
                    </button>
                </div>

                <div className="flex flex-col gap-3 px-6 py-5">
                    {children}
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10">
                    <button
                        onClick={onCancel}
                        className="text-sm text-stone-400 hover:text-white cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onSave}
                        className="
                            rounded-lg bg-[#7a1f1f]
                            px-4 py-2 text-sm font-medium
                            hover:bg-[#8c2a2a]
                            cursor-pointer
                        "
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
