"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Play, Download, Share2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { OutlinePanel } from "./outline-panel"
import { Canvas } from "./canvas"
import { InspectorPanel } from "./inspector-panel"

export function Editor() {
  const router = useRouter()
  const [selectedSlide, setSelectedSlide] = useState(1)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Toolbar */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <div className="h-6 w-px bg-border" />
          <h1 className="text-sm font-medium text-foreground">Q4 营销策略</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            AI 助手
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" className="gap-2" onClick={() => router.push("/preview")}>
            <Play className="h-4 w-4" />
            演示
          </Button>
        </div>
      </header>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Outline */}
        <OutlinePanel selectedSlide={selectedSlide} onSelectSlide={setSelectedSlide} />

        {/* Center - Canvas */}
        <Canvas slideNumber={selectedSlide} />

        {/* Right Sidebar - Inspector */}
        <InspectorPanel />
      </div>
    </div>
  )
}
