"use client"

import { Button } from "@/components/ui/button"
import { MaximizeIcon } from "lucide-react"
import { useState } from "react"

export const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  const toggleFullscreen = () => {
    setIsFullscreen(true)
    document.documentElement.requestFullscreen()
  }

  return !isFullscreen ? (
    <Button size="icon" onClick={toggleFullscreen}>
      <MaximizeIcon />
    </Button>
  ) : null
}
