"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface Presentation {
  id: string
  title: string
  slides: number
  lastEdited: string
  thumbnail: string
  status?: "draft" | "published"
}

interface RecentListProps {
  presentations: Presentation[]
  viewMode: "grid" | "list"
}

export function RecentList({ presentations, viewMode }: RecentListProps) {
  const router = useRouter()

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {presentations.map((presentation) => (
          <Card
            key={presentation.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer border-border"
            onClick={() => router.push("/editor")}
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-muted">
              <Image
                src={presentation.thumbnail || "/placeholder.svg"}
                alt={presentation.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-foreground truncate mb-1">{presentation.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{presentation.slides} 张</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {presentation.lastEdited}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>打开</DropdownMenuItem>
                    <DropdownMenuItem>重命名</DropdownMenuItem>
                    <DropdownMenuItem>复制</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {presentation.status && (
                <Badge variant={presentation.status === "published" ? "default" : "secondary"} className="text-xs">
                  {presentation.status === "published" ? "已发布" : "草稿"}
                </Badge>
              )}
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
          className="group p-4 hover:bg-accent/50 transition-colors cursor-pointer border-border"
          onClick={() => router.push("/editor")}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={presentation.thumbnail || "/placeholder.svg"}
                alt={presentation.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base text-foreground truncate">{presentation.title}</h3>
                {presentation.status && (
                  <Badge variant={presentation.status === "published" ? "default" : "secondary"} className="text-xs">
                    {presentation.status === "published" ? "已发布" : "草稿"}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{presentation.slides} 张幻灯片</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {presentation.lastEdited}
                </span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>打开</DropdownMenuItem>
                <DropdownMenuItem>重命名</DropdownMenuItem>
                <DropdownMenuItem>复制</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}
    </div>
  )
}
