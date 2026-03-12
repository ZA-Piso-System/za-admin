"use client"

import { PackageIcon } from "lucide-react"
import Link from "next/link"

import { ModeToggle } from "@/components/shared/mode-toggle"
import { NavbarUser } from "@/components/shared/navbar/navbar-user"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export const Navbar = () => {
  const { data } = authClient.useSession()

  return (
    <header>
      <nav className="flex h-16 items-center justify-between">
        <Button size="icon" asChild>
          <Link href="/" className="flex items-center gap-2 font-medium">
            <PackageIcon />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          {data && (
            <NavbarUser
              user={{
                name: data.user.name ?? "",
                email: data.user.email ?? "",
                avatar: data.user.image ?? undefined,
              }}
            />
          )}
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
