import { DeviceSessionStatus } from "@/common/types/device-session.type"
import { Device } from "@/common/types/device.type"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
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

  const secondsToHMS = (): string => {
    const hours = Math.floor(remaining / 3600)
    const minutes = Math.floor((remaining % 3600) / 60)
    const seconds = remaining % 60

    const formatted = [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":")

    return formatted
  }

  return (
    <Link key={device.id} href={`/devices/${device.id}`}>
      <Card
        className={cn(
          device.deviceSessions.length > 0 &&
            device.deviceSessions[0].status === DeviceSessionStatus.Active &&
            "bg-red-500"
        )}
      >
        <CardHeader>
          <CardTitle className="text-center text-6xl font-bold">
            {device.deviceNumber}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-center font-mono">
          {secondsToHMS()}
        </CardFooter>
      </Card>
    </Link>
  )
}
