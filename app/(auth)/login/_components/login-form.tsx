"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export const LoginForm = () => {
  const handleContinueWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/dashboard",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <Button onClick={handleContinueWithGoogle}>Continue with Google</Button>
    </div>
  )
}
