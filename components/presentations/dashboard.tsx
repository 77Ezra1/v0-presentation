"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Grid3x3, List, Clock, Star } from "lucide-react"
import { ThemeCard } from "./theme-card"
import { RecentList } from "./recent-list"
import { CreateDialog } from "./create-dialog"
import { EmptyState } from "./empty-state"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

const themes = [
  {
    id: "1",
    name: "商务专业",
    preview: "/professional-business-presentation.jpg",
    color: "from-blue-500 to-blue-600",
    description: "适合企业汇报与商务场景",
  },
  {
    id: "2",
    name: "创意设计",
    preview: "/creative-colorful-presentation.jpg",
    color: "from-purple-500 to-pink-500",
    description: "展现创意与设计理念",
  },
  {
    id: "3",
    name: "简约现代",
    preview: "/minimal-modern-presentation.jpg",
    color: "from-gray-700 to-gray-900",
    description: "简洁优雅的现代风格",
  },
  {
    id: "4",
    name: "科技未来",
    preview: "/tech-futuristic-presentation.jpg",
    color: "from-cyan-500 to-blue-500",
    description: "科技感与未来主义",
  },
]

const recentPresentations = [
  {
    id: "1",
    title: "Q4 营销策略",
    slides: 12,
    lastEdited: "2小时前",
    thumbnail: "/marketing-strategy-brainstorm.png",
    status: "draft" as const,
  },
  {
    id: "2",
    title: "产品路线图 2024",
    slides: 8,
    lastEdited: "昨天",
    thumbnail: "/product-roadmap-visual.png",
    status: "published" as const,
  },
  {
    id: "3",
    title: "团队季度回顾",
    slides: 15,
    lastEdited: "3天前",
    thumbnail: "/team-review.jpg",
    status: "draft" as const,
  },
]

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterTab, setFilterTab] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredPresentations = recentPresentations.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">演示文稿</h1>
              <p className="text-sm text-muted-foreground">创建精美的 AI 驱动演示</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} size="lg" className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              新建演示
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="搜索演示文稿..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Tabs value={filterTab} onValueChange={setFilterTab} className="flex-1 sm:flex-none">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="text-xs sm:text-sm">
                  全部
                </TabsTrigger>
                <TabsTrigger value="recent" className="text-xs sm:text-sm gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  最近
                </TabsTrigger>
                <TabsTrigger value="starred" className="text-xs sm:text-sm gap-1">
                  <Star className="h-3.5 w-3.5" />
                  收藏
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none border-r border-border"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <section>
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <>
            {/* Templates Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">从模板开始</h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  查看全部
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {themes.map((theme) => (
                  <ThemeCard key={theme.id} theme={theme} />
                ))}
              </div>
            </section>

            {/* Recent Presentations */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">最近的演示</h2>
                {filteredPresentations.length > 0 && (
                  <span className="text-sm text-muted-foreground">{filteredPresentations.length} 个演示文稿</span>
                )}
              </div>
              {filteredPresentations.length === 0 ? (
                <EmptyState
                  title="未找到演示文稿"
                  description={searchQuery ? "尝试使用不同的搜索词" : "开始创建您的第一个演示文稿"}
                  action={
                    <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      新建演示
                    </Button>
                  }
                />
              ) : (
                <RecentList presentations={filteredPresentations} viewMode={viewMode} />
              )}
            </section>
          </>
        )}
      </div>

      <CreateDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
