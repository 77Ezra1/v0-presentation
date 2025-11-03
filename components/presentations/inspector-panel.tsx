"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Type, ImageIcon, Layout } from "lucide-react"

export function InspectorPanel() {
  return (
    <div className="w-80 border-l border-border bg-card overflow-y-auto">
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
          <TabsTrigger value="design">
            <Layout className="h-4 w-4 mr-1" />
            设计
          </TabsTrigger>
          <TabsTrigger value="text">
            <Type className="h-4 w-4 mr-1" />
            文本
          </TabsTrigger>
          <TabsTrigger value="media">
            <ImageIcon className="h-4 w-4 mr-1" />
            媒体
          </TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="p-4 space-y-6">
          <div className="space-y-3">
            <Label>背景颜色</Label>
            <div className="flex gap-2">
              {["#ffffff", "#f3f4f6", "#1f2937", "#3b82f6", "#8b5cf6"].map((color) => (
                <button
                  key={color}
                  className="w-10 h-10 rounded-lg border-2 border-border hover:border-primary transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>布局</Label>
            <div className="grid grid-cols-2 gap-2">
              {["标题", "标题+内容", "两栏", "图片+文字"].map((layout) => (
                <button
                  key={layout}
                  className="p-3 rounded-lg border border-border hover:border-primary hover:bg-accent transition-colors text-sm"
                >
                  {layout}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="text" className="p-4 space-y-6">
          <div className="space-y-3">
            <Label>字体大小</Label>
            <Slider defaultValue={[16]} min={12} max={72} step={1} />
          </div>

          <div className="space-y-3">
            <Label>行高</Label>
            <Slider defaultValue={[1.5]} min={1} max={3} step={0.1} />
          </div>

          <div className="space-y-3">
            <Label>文本颜色</Label>
            <Input type="color" defaultValue="#000000" />
          </div>
        </TabsContent>

        <TabsContent value="media" className="p-4 space-y-6">
          <div className="space-y-3">
            <Label>添加图片</Label>
            <button className="w-full p-8 rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-accent transition-colors">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">点击上传图片</p>
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
