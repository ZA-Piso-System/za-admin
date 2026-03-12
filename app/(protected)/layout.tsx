"use client"

import { Navbar } from "@/components/shared/navbar/navbar"
import { AppSidebar } from "@/components/shared/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedLayout({
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
  }, [data, isPending])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-2 pb-2">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}
