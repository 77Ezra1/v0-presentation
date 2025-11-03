"use client"

import { Card } from "@/components/ui/card"

interface CanvasProps {
  slideNumber: number
}

export function Canvas({ slideNumber }: CanvasProps) {
  return (
    <div className="flex-1 bg-muted/30 p-8 overflow-auto">
      <div className="max-w-5xl mx-auto">
        <Card className="aspect-[16/9] bg-white dark:bg-gray-900 shadow-2xl flex items-center justify-center">
          <div className="text-center p-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">幻灯片 {slideNumber}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">在此编辑您的内容</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
