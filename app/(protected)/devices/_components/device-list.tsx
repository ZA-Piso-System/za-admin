"use client"

import { DeviceCard } from "@/app/(protected)/devices/_components/device-card"
import { QueryKey } from "@/common/types/query-key.type"
import { Button } from "@/components/ui/button"
import { fetchDevices } from "@/services/device.service"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export const DeviceList = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.Devices],
    queryFn: () => fetchDevices(),
  })

  return (
    <div className="@container flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href="/devices/create">Create</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 @md:grid-cols-3 @lg:grid-cols-4">
        {data?.items
          .sort((a, b) => a.deviceNumber - b.deviceNumber)
          .map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
      </div>
    </div>
  )
}
