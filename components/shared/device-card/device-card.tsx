import { DeviceSessionStatus } from "@/common/types/device-session.type"
import { Device, DeviceStatus } from "@/common/types/device.type"
import { secondsToHMS } from "@/common/utils/number.util"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"

interface Props {
  device: Device
}

export const DeviceCard = ({ device }: Props) => {
  const [remaining, setRemaining] = useState<number>(0)

  const deviceSession = useMemo(() => {
    if (!device || device.deviceSessions.length <= 0) return null
    return device.deviceSessions[0]
  }, [device])

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(0)

      if (!deviceSession || !deviceSession.endAt) return

      const endAt = new Date(deviceSession.endAt).getTime()
      const remainingMs = Math.max(0, endAt - Date.now())
      const remainingSeconds = Math.ceil(remainingMs / 1000)
      setRemaining(remainingSeconds)

      if (remainingSeconds <= 0) {
        clearInterval(interval)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [deviceSession])

  const getBackgroundColor = () => {
    if (device.status === DeviceStatus.Offline) {
      if (deviceSession?.status === DeviceSessionStatus.Active) {
        return "bg-orange-500"
      }
      return "bg-card"
    }
    if (device.status === DeviceStatus.Starting) {
      return "bg-yellow-500"
    }
    if (device.status === DeviceStatus.Online) {
      if (deviceSession?.status === DeviceSessionStatus.Active) {
        return "bg-red-500"
      }
      return "bg-green-500"
    }
    return ""
  }

  const getDisplayStatus = () => {
    if (device.status === DeviceStatus.Offline) {
      if (deviceSession?.status === DeviceSessionStatus.Active) {
        return "Disconnected"
      }
    }
    if (device.status === DeviceStatus.Online) {
      if (deviceSession?.status === DeviceSessionStatus.Active) {
        return secondsToHMS(remaining)
      }
    }
    return device.status
  }

  return (
    <Card className={cn(getBackgroundColor(), "select-none")}>
      <CardHeader>
        <CardTitle className="text-center text-6xl font-bold">
          {device.deviceNumber}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-center font-mono font-medium uppercase">
        {getDisplayStatus()}
      </CardFooter>
    </Card>
  )
}
