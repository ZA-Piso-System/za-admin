"use client"

import { Button } from "@/components/ui/button"
import { stopSession } from "@/services/device.service"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useParams } from "next/navigation"
import { toast } from "sonner"

export const StopSessionButton = () => {
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
    },
  })

  return (
    <Button onClick={() => stopSessionMutation.mutate()}>Stop Session</Button>
  )
}
