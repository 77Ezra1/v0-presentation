"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Grid3x3, List, Clock, Star } from "lucide-react"
import { ThemeCard } from "./theme-card"
import { RecentList } from "./recent-list"
import { CreateDialog } from "./create-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const themes = [
  { id: "1", name: "商务专业", preview: "/professional-business-presentation-template.jpg", color: "from-blue-500 to-blue-600" },
  { id: "2", name: "创意设计", preview: "/creative-colorful-presentation-template.png", color: "from-purple-500 to-pink-500" },
  { id: "3", name: "简约现代", preview: "/minimal-modern-presentation-template.jpg", color: "from-gray-700 to-gray-900" },
  { id: "4", name: "科技未来", preview: "/tech-futuristic-presentation-template.jpg", color: "from-cyan-500 to-blue-500" },
]

const recentPresentations = [
  { id: "1", title: "Q4 营销策略", slides: 12, lastEdited: "2小时前", thumbnail: "/marketing-strategy-presentation.png" },
  { id: "2", title: "产品路线图 2024", slides: 8, lastEdited: "昨天", thumbnail: "/product-roadmap-presentation.png" },
  { id: "3", title: "团队季度回顾", slides: 15, lastEdited: "3天前", thumbnail: "/team-review-presentation.jpg" },
]

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterTab, setFilterTab] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">演示文稿</h1>
              <p className="text-sm text-muted-foreground mt-1">创建精美的 AI 驱动演示</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              新建演示
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索演示文稿..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={filterTab} onValueChange={setFilterTab}>
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="recent">
                  <Clock className="h-4 w-4 mr-1" />
                  最近
                </TabsTrigger>
                <TabsTrigger value="starred">
                  <Star className="h-4 w-4 mr-1" />
                  收藏
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">从模板开始</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </div>
        </section>

        {/* Recent Presentations */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">最近的演示</h2>
          <RecentList presentations={recentPresentations} viewMode={viewMode} />
        </section>
      </div>

      <CreateDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
