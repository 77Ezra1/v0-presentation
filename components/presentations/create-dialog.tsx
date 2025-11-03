"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, FileText } from "lucide-react"

interface CreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateDialog({ open, onOpenChange }: CreateDialogProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"ai" | "blank">("ai")
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")

  const handleCreate = () => {
    onOpenChange(false)
    router.push("/editor")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>创建新演示</DialogTitle>
          <DialogDescription>选择创建方式开始制作演示文稿</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 my-4">
          <Button
            variant={mode === "ai" ? "default" : "outline"}
            className="h-auto py-4 flex-col gap-2"
            onClick={() => setMode("ai")}
          >
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">AI 生成</span>
            <span className="text-xs text-muted-foreground">描述主题自动生成</span>
          </Button>
          <Button
            variant={mode === "blank" ? "default" : "outline"}
            className="h-auto py-4 flex-col gap-2"
            onClick={() => setMode("blank")}
          >
            <FileText className="h-5 w-5" />
            <span className="font-medium">空白演示</span>
            <span className="text-xs text-muted-foreground">从头开始创建</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">演示标题</Label>
            <Input id="title" placeholder="输入演示标题..." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {mode === "ai" && (
            <div className="space-y-2">
              <Label htmlFor="prompt">描述您的演示内容</Label>
              <Textarea
                id="prompt"
                placeholder="例如：介绍我们公司2024年的产品路线图，包括新功能、市场策略和时间线..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none overflow-y-auto min-h-[100px] max-h-[200px]"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button onClick={handleCreate} disabled={!title}>
              {mode === "ai" ? "生成演示" : "创建演示"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
