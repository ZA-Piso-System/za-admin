"use client"

import { AddTimeDialog } from "@/app/(protected)/devices/[id]/components/add-time.dialog"
import { StopSessionDialog } from "@/app/(protected)/devices/[id]/components/stop-session.dialog"
import { DeviceSessionStatus } from "@/common/types/device-session.type"
import { QueryKey } from "@/common/types/query-key.type"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { fetchDeviceById } from "@/services/device.service"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export default function ViewDevice() {
  const { id } = useParams<{ id: string }>()

  const [remaining, setRemaining] = useState<number>(0)

  const { data } = useQuery({
    queryKey: [QueryKey.Devices, id],
    queryFn: () => fetchDeviceById(id),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(0)

      if (!data || data.deviceSessions.length <= 0) return

      const deviceSession = data.deviceSessions[0]

      if (!deviceSession.endAt) return

      const endAt = new Date(deviceSession.endAt).getTime()
      const remainingMs = Math.max(0, endAt - Date.now())
      const remainingSeconds = Math.ceil(remainingMs / 1000)
      setRemaining(remainingSeconds)

      if (remainingSeconds <= 0) {
        clearInterval(interval)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [data])

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

  const { startAt, endAt } = useMemo(() => {
    if (!data || data.deviceSessions.length <= 0) {
      return { startAt: "-", endAt: "-" }
    }

    const deviceSession = data.deviceSessions[0]
    if (!deviceSession.startAt || !deviceSession.endAt) {
      return { startAt: "-", endAt: "-" }
    }

    const startAt = deviceSession.startAt
      ? format(new Date(deviceSession.startAt), "MMM dd, yyyy, hh:mm:ss a")
      : "-"

    const endAt = deviceSession.endAt
      ? format(new Date(deviceSession.endAt), "MMM dd, yyyy, hh:mm:ss a")
      : "-"

    return { startAt, endAt }
  }, [data])

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <ItemGroup className="grid grid-cols-1 sm:grid-cols-2">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>ID</ItemTitle>
            <ItemDescription>{data?.id}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Device Number</ItemTitle>
            <ItemDescription>{data?.deviceNumber}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>MAC Address</ItemTitle>
            <ItemDescription>{data?.macAddress}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Type</ItemTitle>
            <ItemDescription>{data?.type}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Registration Token</ItemTitle>
            <ItemDescription>{data?.registrationToken}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Status</ItemTitle>
            <ItemDescription>{data?.status}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Current Time</ItemTitle>
            <ItemDescription>{secondsToHMS()}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Start At</ItemTitle>
            <ItemDescription>{startAt}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>End At</ItemTitle>
            <ItemDescription>{endAt}</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
      <div className="flex w-full flex-col gap-2">
        <AddTimeDialog />
        <Button>Update Time</Button>
        <Button>Pause Session</Button>
        {data &&
          data.deviceSessions.length > 0 &&
          data?.deviceSessions[0].status === DeviceSessionStatus.Active && (
            <StopSessionDialog />
          )}
      </div>
    </div>
  )
}
