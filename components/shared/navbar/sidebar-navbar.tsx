"use client"

import { ModeToggle } from "@/components/shared/mode-toggle"
import { NavbarUser } from "@/components/shared/navbar/navbar-user"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

export const SidebarNavbar = () => {
  const { data } = authClient.useSession()

  return (
    <header>
      <nav className="flex h-16 items-center justify-between">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <NavbarUser
            user={{
              name: data?.user.name ?? "",
              email: data?.user.email ?? "",
              avatar: data?.user.image ?? undefined,
            }}
          />
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
