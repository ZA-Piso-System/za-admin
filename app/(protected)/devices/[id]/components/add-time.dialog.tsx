"use client"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getQueryClient } from "@/lib/react-query"
import { addTime } from "@/services/device.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PlusIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface Rate {
  label: string
  value: number
}

const rates: Rate[] = [
  {
    label: "+20 mins",
    value: 20,
  },
  {
    label: "+40 min",
    value: 40,
  },
  {
    label: "+1 hr",
    value: 60,
  },
  {
    label: "+1 hr & 20 mins",
    value: 80,
  },
  {
    label: "+1 hr & 40 mins",
    value: 100,
  },
  {
    label: "+2 hrs",
    value: 120,
  },
  {
    label: "+2 hrs & 20 mins",
    value: 140,
  },
  {
    label: "+2 hrs & 40 mins",
    value: 160,
  },
  {
    label: "+3 hrs",
    value: 180,
  },
]

export const AddTimeDialog = () => {
  const queryClient = getQueryClient()

  const { id } = useParams<{ id: string }>()

  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [time, setTime] = useState<number | null>(null)

  const addTimeMutation = useMutation({
    mutationFn: (seconds: number) => addTime(id, seconds),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
    onSuccess: (response) => {
      toast.success(response.message)
      queryClient.invalidateQueries({ queryKey: [QueryKey.Devices] })
      queryClient.invalidateQueries({ queryKey: [QueryKey.Devices, id] })
    },
    onSettled: () => {
      setShowDialog(false)
    },
  })

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full">
            <PlusIcon className="size-4" />
            Add Time
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Time</DialogTitle>
            <DialogDescription>
              Select how many minutes to add to this client.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {rates.map((rate, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    type="button"
                    onClick={() => setTime(rate.value)}
                  >
                    {rate.label}
                  </Button>
                ))}
              </div>
            </Field>
            <Field>
              <FieldLabel htmlFor="time">Custom Minutes</FieldLabel>
              <Input
                id="time"
                name="time"
                value={time ?? ""}
                onChange={(e) =>
                  setTime(e.target.value === "" ? null : Number(e.target.value))
                }
                type="number"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                if (time) {
                  addTimeMutation.mutate(time * 60)
                }
              }}
              type="submit"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
