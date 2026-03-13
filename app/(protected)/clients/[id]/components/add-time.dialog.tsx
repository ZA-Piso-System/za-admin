"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addTime } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PlusIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const AddTimeDialog = () => {
  const { id } = useParams<{ id: string }>()

  const [showDialog, setShowDialog] = useState<boolean>(false)

  const addTimeMutation = useMutation({
    mutationFn: (seconds: number) => addTime(id, seconds),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
    onSuccess: (response) => {
      toast.success(response.message)
    },
    onSettled: () => {
      setShowDialog(false)
    },
  })

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Add Time
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Time</DialogTitle>
          <DialogDescription>Description here</DialogDescription>
        </DialogHeader>
        <form
          className="flex w-full flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => addTimeMutation.mutate(60 * 4)}>
              +4 Minutes
            </Button>
            <Button onClick={() => addTimeMutation.mutate(60 * 20)}>
              +20 Minutes
            </Button>
            <Button onClick={() => addTimeMutation.mutate(60 * 40)}>
              +40 Minutes
            </Button>
            <Button onClick={() => addTimeMutation.mutate(60 * 60)}>
              +1 Hour
            </Button>
            <Button onClick={() => addTimeMutation.mutate(60 * 60 * 2)}>
              +2 Hours
            </Button>
            <Button onClick={() => addTimeMutation.mutate(60 * 60 * 5)}>
              +5 Hours
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
