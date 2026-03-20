"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { data, isPending } = authClient.useSession()

  useEffect(() => {
    if (data === null && !isPending) {
      router.push("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isPending])

  return <main className="w-full p-4">{children}</main>
}
