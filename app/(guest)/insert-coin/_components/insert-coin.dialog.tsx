"use client"

import { Device } from "@/common/types/device.type"
import { QueryKey } from "@/common/types/query-key.type"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getQueryClient } from "@/lib/react-query"
import {
  fetchTotalInsertedCoins,
  insertCoinDone,
} from "@/services/insert-coin.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"

interface Props {
  selectedDevice: Device | null
  setSelectedDevice: Dispatch<SetStateAction<Device | null>>
}

export const InsertCoinDialog = ({
  selectedDevice,
  setSelectedDevice,
}: Props) => {
  const queryClient = getQueryClient()

  const { data } = useQuery({
    queryKey: [QueryKey.CoinSlots],
    queryFn: () => fetchTotalInsertedCoins(),
    enabled: selectedDevice !== null,
    refetchInterval: 1_000,
  })

  const insertCoinDoneMutation = useMutation({
    mutationFn: (id: string) => insertCoinDone(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.Devices] })
      }, 1_000)
    },
  })

  const handleClose = () => {
    if (selectedDevice) {
      insertCoinDoneMutation.mutate(selectedDevice.id)
      setSelectedDevice(null)
    }
  }

  return (
    <Dialog
      open={selectedDevice !== null}
      onOpenChange={(open) => {
        if (!open) {
          handleClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Insert Coin for Device {selectedDevice?.deviceNumber}
          </DialogTitle>
          <DialogDescription>Please insert coin</DialogDescription>
        </DialogHeader>
        <div>
          <div className="font-bold">₱ {data?.total ?? "0.00"}</div>
          <div>Total Hours: 0</div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
