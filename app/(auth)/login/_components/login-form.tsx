"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { EyeIcon, EyeOffIcon, LucideLoader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import z from "zod/v4"

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const LoginForm = () => {
  const router = useRouter()

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signIn.email(value)
      if (data) {
        router.push("/dashboard")
      }
      if (error) {
        toast.error("Oops! An Error Occurred", {
          description: error.message,
        })
      }
    },
    validators: {
      onChange: SignInSchema,
    },
  })

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const handleContinueWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/dashboard",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <FieldGroup className="">
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                  Login
                </Button>
              )}
            </form.Subscribe>
            <Button
              variant="outline"
              type="button"
              onClick={handleContinueWithGoogle}
            >
              Login with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
