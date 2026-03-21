"use client"

import { Button } from "@/components/ui/button"
import { MaximizeIcon, MinimizeIcon } from "lucide-react"
import { useState } from "react"

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    }
  }

  return (
    <Button size="icon" onClick={toggleFullscreen}>
      {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
    </Button>
  )
}
