"use client"

import { InsertCoinDialog } from "@/app/(protected)/insert-coin/_components/insert-coin.dialog"
import { Device } from "@/common/types/device.type"
import { QueryKey } from "@/common/types/query-key.type"
import { DeviceCard } from "@/components/shared/device-card/device-card"
import { fetchDevices } from "@/services/device.service"
import { insertCoin } from "@/services/insert-coin.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "sonner"

export const DeviceList = () => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)

  const { data } = useQuery({
    queryKey: [QueryKey.Devices],
    queryFn: () => fetchDevices(),
  })

  const insertCoinMutation = useMutation({
    mutationFn: (device: Device) => insertCoin(device.id),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
    onSuccess: (_, device) => {
      setSelectedDevice(device)
    },
  })

  const handleClick = (device: Device) => {
    insertCoinMutation.mutate(device)
  }

  return (
    <div className="@container flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 @md:grid-cols-3 @lg:grid-cols-4">
        {data?.items
          .sort((a, b) => a.deviceNumber - b.deviceNumber)
          .map((device) => (
            <div key={device.id} onClick={() => handleClick(device)}>
              <DeviceCard device={device} />
            </div>
          ))}
      </div>
      <InsertCoinDialog
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
    </div>
  )
}
