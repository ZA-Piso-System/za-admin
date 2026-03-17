"use client"

import { QueryKey } from "@/common/types/query-key.type"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { getQueryClient } from "@/lib/react-query"
import { stopSession } from "@/services/device.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { StopCircleIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export const StopSessionDialog = () => {
  const queryClient = getQueryClient()

  const { id } = useParams<{ id: string }>()

  const stopSessionMutation = useMutation({
    mutationFn: () => stopSession(id),
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
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <StopCircleIcon />
          Stop Session
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => stopSessionMutation.mutate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
