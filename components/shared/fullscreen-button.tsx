"use client"

import { Button } from "@/components/ui/button"
import { MaximizeIcon } from "lucide-react"
import { useEffect, useState } from "react"

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const update = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    update()
    document.addEventListener("fullscreenchange", update)
    return () => {
      document.removeEventListener("fullscreenchange", update)
    }
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  return !isFullscreen ? (
    <Button size="icon" onClick={toggleFullscreen}>
      <MaximizeIcon />
    </Button>
  ) : null
}
