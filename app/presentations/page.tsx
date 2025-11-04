"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type ConnectionStatus = "connecting" | "connected" | "disconnected"

export default function PresentationsGatewayPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting")

  const presentationsUrl = process.env.NEXT_PUBLIC_PRESENTATIONS_URL || "/presentations"

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 安全检查：只处理同源消息
      if (event.origin !== window.location.origin) return

      const { type, data } = event.data

      switch (type) {
        case "presentations:ready":
          // 子应用已准备就绪
          setConnectionStatus("connected")
          break

        case "presentations:request-token":
          // 子应用请求认证 token
          const token = getToken()
          if (token && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: "presentations:token", token }, window.location.origin)
          }
          break
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const getToken = useCallback(() => {
    return localStorage.getItem("token") || null
  }, [])

  const handleSyncToken = useCallback(() => {
    const token = getToken()

    if (!iframeRef.current?.contentWindow) {
      console.warn("[v0] iframe contentWindow 不可用")
      return
    }

    if (!token) {
      console.warn("[v0] 未找到 token")
      return
    }

    iframeRef.current.contentWindow.postMessage({ type: "presentations:token", token }, window.location.origin)

    console.log("[v0] Token 已同步到子应用")
  }, [getToken])

  const handleOpenInNewWindow = useCallback(() => {
    window.open(presentationsUrl, "_blank", "noopener,noreferrer")
  }, [presentationsUrl])

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "connecting":
        return {
          className: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
          text: "连接中...",
        }
      case "connected":
        return {
          className: "bg-green-500/20 text-green-700 dark:text-green-400",
          text: "已连接",
        }
      case "disconnected":
        return {
          className: "bg-red-500/20 text-red-700 dark:text-red-400",
          text: "未连接",
        }
    }
  }

  const statusBadge = getStatusBadge()

  return (
    <div className="flex h-screen flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between border-b bg-background px-4 py-2">
        {/* 左侧：连接状态 */}
        <Badge className={`text-xs font-medium ${statusBadge.className}`}>{statusBadge.text}</Badge>

        {/* 右侧：操作按钮 */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSyncToken} className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            同步登录
          </Button>

          <Button variant="outline" size="sm" onClick={handleOpenInNewWindow} className="gap-2 bg-transparent">
            <ExternalLink className="h-4 w-4" />
            新窗口打开
          </Button>
        </div>
      </div>

      {/* iframe 容器 */}
      <div className="flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={presentationsUrl}
          className="h-full w-full border-0"
          title="Presentations 子应用"
          allow="fullscreen"
        />
      </div>
    </div>
  )
}
