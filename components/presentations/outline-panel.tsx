"use client"

import { Button } from "@/components/ui/button"
import { Plus, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface OutlinePanelProps {
  selectedSlide: number
  onSelectSlide: (slide: number) => void
}

const slides = [
  { id: 1, title: "封面", thumbnail: "/presentation-cover-slide.jpg" },
  { id: 2, title: "目录", thumbnail: "/table-of-contents-slide.jpg" },
  { id: 3, title: "市场分析", thumbnail: "/market-analysis-slide.jpg" },
  { id: 4, title: "产品策略", thumbnail: "/product-strategy-slide.jpg" },
  { id: 5, title: "时间线", thumbnail: "/timeline-slide.png" },
]

export function OutlinePanel({ selectedSlide, onSelectSlide }: OutlinePanelProps) {
  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-3 border-b border-border">
        <Button size="sm" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          新建幻灯片
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={cn(
              "group relative rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50",
              selectedSlide === slide.id ? "border-primary bg-primary/5" : "border-transparent hover:bg-accent",
            )}
            onClick={() => onSelectSlide(slide.id)}
          >
            <div className="flex items-start gap-2 p-2">
              <div className="flex-shrink-0 w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                {slide.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="aspect-[4/3] rounded overflow-hidden bg-muted mb-1">
                  <img
                    src={slide.thumbnail || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-foreground truncate">{slide.title}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <GripVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
