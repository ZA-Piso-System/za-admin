"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { setPassword } from "@/services/account.service"
import { useForm } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { EyeIcon, EyeOffIcon, LucideLoader } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import z from "zod/v4"

const SetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const SetPassword = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const mutation = useMutation({
    mutationFn: setPassword,
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
    onSuccess: (response) => {
      toast.success(response.message)
    },
  })

  const form = useForm({
    defaultValues: {
      password: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value)
    },
    validators: {
      onChange: SetPasswordSchema,
    },
  })

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Set Password</FieldLabel>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOffIcon size={16} aria-hidden="true" />
                  ) : (
                    <EyeIcon size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
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
                Update
              </Button>
            )}
          </form.Subscribe>
        </Field>
      </FieldGroup>
    </form>
  )
}
