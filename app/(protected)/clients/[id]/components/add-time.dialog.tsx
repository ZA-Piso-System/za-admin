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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setTime(5)}
                >
                  +5 Minutes
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setTime(15)}
                >
                  +15 Minutes
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setTime(30)}
                >
                  +30 Minutes
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setTime(60)}
                >
                  +1 Hour
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setTime(120)}
                >
                  +2 Hours
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setTime(180)}
                >
                  +3 Hours
                </Button>
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
