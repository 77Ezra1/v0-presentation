"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Presentation {
  id: string
  title: string
  slides: number
  lastEdited: string
  thumbnail: string
}

interface RecentListProps {
  presentations: Presentation[]
  viewMode: "grid" | "list"
}

export function RecentList({ presentations, viewMode }: RecentListProps) {
  const router = useRouter()

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presentations.map((presentation) => (
          <Card
            key={presentation.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => router.push("/editor")}
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-muted">
              <Image
                src={presentation.thumbnail || "/placeholder.svg"}
                alt={presentation.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{presentation.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {presentation.slides} 张幻灯片 · {presentation.lastEdited}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>重命名</DropdownMenuItem>
                    <DropdownMenuItem>复制</DropdownMenuItem>
                    <DropdownMenuItem>移动到</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {presentations.map((presentation) => (
        <Card
          key={presentation.id}
          className="p-4 hover:bg-accent transition-colors cursor-pointer"
          onClick={() => router.push("/editor")}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-16 rounded overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={presentation.thumbnail || "/placeholder.svg"}
                alt={presentation.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{presentation.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {presentation.slides} 张幻灯片 · {presentation.lastEdited}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>重命名</DropdownMenuItem>
                <DropdownMenuItem>复制</DropdownMenuItem>
                <DropdownMenuItem>移动到</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}
    </div>
  )
}
