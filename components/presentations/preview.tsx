"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const slides = [
  { id: 1, title: "封面", content: "Q4 营销策略" },
  { id: 2, title: "目录", content: "1. 市场分析\n2. 产品策略\n3. 时间线" },
  { id: 3, title: "市场分析", content: "当前市场趋势与机会" },
  { id: 4, title: "产品策略", content: "核心产品定位与差异化" },
  { id: 5, title: "时间线", content: "Q4 关键里程碑" },
]

export function Preview() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showOverview, setShowOverview] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      } else if (e.key === "Escape") {
        router.push("/editor")
      } else if (e.key === "g" || e.key === "G") {
        setShowOverview(!showOverview)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, showOverview, router])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  if (showOverview) {
    return (
      <div className="h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">幻灯片概览</h2>
            <Button variant="outline" onClick={() => setShowOverview(false)}>
              返回演示
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "aspect-[16/9] rounded-lg border-2 cursor-pointer transition-all hover:border-primary",
                  currentSlide === index ? "border-primary" : "border-border",
                )}
                onClick={() => {
                  setCurrentSlide(index)
                  setShowOverview(false)
                }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg p-8 flex flex-col items-center justify-center">
                  <div className="text-xs font-medium text-muted-foreground mb-2">幻灯片 {index + 1}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">{slide.content}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowOverview(true)}
          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          <Grid3x3 className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push("/editor")}
          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Slide */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-6xl aspect-[16/9] bg-white dark:bg-gray-900 rounded-lg shadow-2xl flex items-center justify-center">
          <div className="text-center p-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{slides[currentSlide].content}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">{slides[currentSlide].title}</p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-white text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="bg-white/10 hover:bg-white/20 text-white border-white/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
