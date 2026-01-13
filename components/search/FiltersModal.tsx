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
            className="absolute inset-0 bg-(--background)/60 backdrop-blur-sm"
            onClick={onClose}
        />

        <div className="relative mx-auto mt-32 w-full max-w-lg">
            <div className="
                rounded-2xl
                bg-background
                border border-(--foreground)/10
                shadow-2xl max-h-[80vh] overflow-y-auto
            ">
                <div className="flex items-center justify-between px-6 py-4 border-b border-(--foreground)/10">
                    <h2 className="text-lg font-semibold">
                        Filtros avanzados
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-(--foreground) transition cursor-pointer"
                    >
                        <X size="1.2em" />
                    </button>
                </div>

                <div className="flex flex-col gap-3 px-6 py-5">
                    {children}
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-(--foreground)/10">
                    <button
                        onClick={onCancel}
                        className="text-sm text-stone-400 hover:text-(--foreground) cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onSave}
                        className="
                            rounded-lg bg-(--color-primary)
                            px-4 py-2 text-sm font-medium
                            hover:bg-(--color-secondary)
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
