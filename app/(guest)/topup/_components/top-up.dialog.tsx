"use client"

import { QueryKey } from "@/common/types/query-key.type"
import { User } from "@/common/types/user.type"
import { secondsToHMS } from "@/common/utils/number.util"
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
  selectedUser: User | null
  setSelectedUser: Dispatch<SetStateAction<User | null>>
  countdown: number
  setCountdown: Dispatch<SetStateAction<number>>
  cooldown: number
  setCooldown: Dispatch<SetStateAction<number>>
}

export const TopUpDialog = ({
  selectedUser,
  setSelectedUser,
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
    enabled: selectedUser !== null,
    refetchInterval: 1_000,
  })

  const insertCoinDoneMutation = useMutation({
    mutationFn: (id: string) => insertCoinDone(id),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.resetQueries({ queryKey: [QueryKey.CoinSlots] })
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

  const totalDuration = secondsToHMS((data.total ?? 0) * 4 * 60)

  const handleClose = () => {
    if (selectedUser && cooldown <= 0) {
      insertCoinDoneMutation.mutate(selectedUser.id)
      setSelectedUser(null)
    }
  }

  return (
    <Dialog
      open={selectedUser !== null}
      onOpenChange={(open) => {
        if (!open) {
          handleClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Top Up for {selectedUser?.username}</DialogTitle>
          <DialogDescription>
            Ihulog ang coins para madagdagan ang time.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-1 text-4xl font-bold">
            ₱<CoinCounter totalCoins={data?.total ?? 0} />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{totalDuration}</div>
            <div className="text-sm text-muted-foreground">Total Duration</div>
          </div>
        </div>
        <Progress value={(countdown / COUNTDOWN) * 100} />
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button variant="outline" size="lg" disabled={cooldown > 0}>
              Done
              {cooldown > 0 && <span>({cooldown}s)</span>}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
