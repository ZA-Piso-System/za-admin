"use client"

import { QueryKey } from "@/common/types/query-key.type"
import { DeviceCard } from "@/components/shared/device-card/device-card"
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
      <div className="grid grid-cols-2 gap-4 @md:grid-cols-3 @lg:grid-cols-4">
        {data?.items
          .sort((a, b) => a.deviceNumber - b.deviceNumber)
          .map((device) => (
            <Link key={device.id} href={`/devices/${device.id}`}>
              <DeviceCard device={device} />
            </Link>
          ))}
      </div>
    </div>
  )
}
