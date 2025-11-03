"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface ThemeCardProps {
  theme: {
    id: string
    name: string
    preview: string
    color: string
    description?: string
  }
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const router = useRouter()

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-border">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted" onClick={() => router.push("/editor")}>
        <Image
          src={theme.preview || "/placeholder.svg"}
          alt={theme.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-10 group-hover:opacity-20 transition-opacity duration-200`}
        />
      </div>
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-foreground">{theme.name}</h3>
          {theme.description && <p className="text-xs text-muted-foreground line-clamp-1">{theme.description}</p>}
        </div>
        <Button
          size="sm"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation()
            router.push("/editor")
          }}
        >
          使用模板
        </Button>
      </div>
    </Card>
  )
}
