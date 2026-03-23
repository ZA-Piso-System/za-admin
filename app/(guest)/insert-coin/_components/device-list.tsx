"use client"

import { InsertCoinDialog } from "@/app/(guest)/insert-coin/_components/insert-coin.dialog"
import { Device } from "@/common/types/device.type"
import { QueryKey } from "@/common/types/query-key.type"
import { DeviceCard } from "@/components/shared/device-card/device-card"
import { getQueryClient } from "@/lib/react-query"
import { insertCoin } from "@/services/coin-slot.service"
import { fetchDevices } from "@/services/device.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const COUNTDOWN = 30
const COOLDOWN = 5

export const DeviceList = () => {
  const queryClient = getQueryClient()

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)

  const [countdown, setCountdown] = useState<number>(COUNTDOWN)
  const [cooldown, setCooldown] = useState<number>(COOLDOWN)

  const { data } = useQuery({
    queryKey: [QueryKey.Devices],
    queryFn: fetchDevices,
    refetchInterval: 15_000,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          setSelectedDevice(null)
          queryClient.invalidateQueries({ queryKey: [QueryKey.CoinSlots] })
          return 0
        }
        return prev - 1
      })

      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCountdown(COUNTDOWN)
    setCooldown(COOLDOWN)
  }, [selectedDevice])

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
        countdown={countdown}
        setCountdown={setCountdown}
        cooldown={cooldown}
        setCooldown={setCooldown}
      />
    </div>
  )
}
