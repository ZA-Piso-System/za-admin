"use client"

import { AddTimeDialog } from "@/app/(protected)/clients/[id]/components/add-time.dialog"
import { StopSessionDialog } from "@/app/(protected)/clients/[id]/components/stop-session.dialog"
import { Status } from "@/common/types/status.type"
import { Button } from "@/components/ui/button"
import { fetchClientById } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

export default function ViewClient() {
  const { id } = useParams<{ id: string }>()

  const [remaining, setRemaining] = useState<number>(0)

  const { data } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => fetchClientById(id),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (!data || !data.endAt) return

      const remainingMs = Math.max(0, data.endAt - Date.now())
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
    const startAt = data?.startAt
      ? format(new Date(data.startAt), "MMM dd, yyyy, hh:mm:ss a")
      : "-"

    const endAt = data?.endAt
      ? format(new Date(data.endAt), "MMM dd, yyyy, hh:mm:ss a")
      : "-"

    return { startAt, endAt }
  }, [data])

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <ItemGroup className="grid grid-cols-1 sm:grid-cols-2">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Device ID</ItemTitle>
            <ItemDescription>{data?.deviceId}</ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>PC No</ItemTitle>
            <ItemDescription>{data?.pcNo}</ItemDescription>
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
        {data?.status === Status.Active && <StopSessionDialog />}
      </div>
    </div>
  )
}
