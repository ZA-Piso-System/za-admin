"use client"

import { CreateDevice } from "@/common/types/device.type"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createDevice } from "@/services/device.service"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { LucideLoader } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod/v4"

const DeviceFormSchema = z.object({
  deviceNumber: z.number().nullable(),
  type: z.string(),
})

const defaultValues: CreateDevice = {
  deviceNumber: null,
  type: "",
}

export const DeviceForm = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: createDevice,
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
    onSuccess: (response) => {
      toast.success(response.message)
      router.push("/devices")
      form.reset()
    },
  })

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => mutation.mutate(value),
    validators: {
      onChange: DeviceFormSchema,
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="deviceNumber">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Device Number</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                type="number"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>
        <form.Field name="type">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Type</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="string"
              />
              <FieldError errors={field.state.meta.errors} />
            </Field>
          )}
        </form.Field>
        <Field>
          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isDirty,
              state.isSubmitting,
            ]}
          >
            {([canSubmit, isDirty, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || !isDirty}>
                {isSubmitting && <LucideLoader className="animate-spin" />}
                Create
              </Button>
            )}
          </form.Subscribe>
        </Field>
      </FieldGroup>
    </form>
  )
}
