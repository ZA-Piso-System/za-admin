"use client"

import { Device } from "@/common/types/device.type"
import { QueryKey } from "@/common/types/query-key.type"
import { CoinCounter } from "@/components/shared/coin-counter"
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
} from "@/services/coin-slot.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useMemo } from "react"

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

  const secondsToHMS = (): string => {
    const totalSeconds = (data?.total ?? 0) * 4 * 60
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const formatted = [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ].join(":")

    return formatted
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
            Add Time sa{" "}
            <span className="uppercase">{selectedDevice?.type}</span>{" "}
            {selectedDevice?.deviceNumber}
          </DialogTitle>
          <DialogDescription>
            Ihulog ang coins para madagdagan ang time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-1 text-4xl font-bold">
            ₱<CoinCounter totalCoins={data?.total ?? 0} />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{secondsToHMS()}</div>
            <div className="text-sm text-muted-foreground">Total Duration</div>
          </div>
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
