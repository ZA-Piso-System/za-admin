import { Client } from "@/common/types/client.type"
import { Status } from "@/common/types/status.type"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Props {
  client: Client
}
export const ClientCard = ({ client }: Props) => {
  const [remaining, setRemaining] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!client.endAt) return

      const remainingMs = Math.max(0, client.endAt - Date.now())
      const remainingSeconds = Math.ceil(remainingMs / 1000)
      setRemaining(remainingSeconds)

      if (remainingSeconds <= 0) {
        clearInterval(interval)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [client])

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
    <Link key={client.deviceId} href={`/clients/${client.deviceId}`}>
      <Card
        className={cn(
          client.status === Status.Idle && "bg-green-500",
          client.status === Status.Active && "bg-red-500"
        )}
      >
        <CardHeader>
          <CardTitle className="text-center text-6xl font-bold">
            {client.pcNo}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-center font-mono">
          {secondsToHMS()}
        </CardFooter>
      </Card>
    </Link>
  )
}
