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
  }
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const router = useRouter()

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image
          src={theme.preview || "/placeholder.svg"}
          alt={theme.name}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-20`} />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground mb-2">{theme.name}</h3>
        <Button size="sm" className="w-full" onClick={() => router.push("/editor")}>
          使用模板
        </Button>
      </div>
    </Card>
  )
}
