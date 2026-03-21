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
import { Progress } from "@/components/ui/progress"
import { getQueryClient } from "@/lib/react-query"
import {
  fetchTotalInsertedCoins,
  insertCoinDone,
} from "@/services/coin-slot.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useEffect } from "react"

const COUNTDOWN = 30
const COOLDOWN = 5

interface Props {
  selectedDevice: Device | null
  setSelectedDevice: Dispatch<SetStateAction<Device | null>>
  countdown: number
  setCountdown: Dispatch<SetStateAction<number>>
  cooldown: number
  setCooldown: Dispatch<SetStateAction<number>>
}

export const InsertCoinDialog = ({
  selectedDevice,
  setSelectedDevice,
  countdown,
  setCountdown,
  cooldown,
  setCooldown,
}: Props) => {
  const queryClient = getQueryClient()

  const { data } = useQuery({
    initialData: { total: 0 },
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

  useEffect(() => {
    const total = data?.total ?? 0
    if (total > 0) {
      setCountdown(COUNTDOWN)
      setCooldown(COOLDOWN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.total])

  const handleClose = () => {
    if (selectedDevice && cooldown <= 0) {
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
        <Progress value={(countdown / COUNTDOWN) * 100} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={cooldown > 0}>
              Close
              {cooldown > 0 && <span>({cooldown}s)</span>}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
