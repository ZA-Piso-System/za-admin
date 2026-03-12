"use client"

import {
  BoxIcon,
  LifeBuoyIcon,
  PackageIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { NavMenu } from "@/components/shared/sidebar/nav-menu"
import { SidebarUser } from "@/components/shared/sidebar/sidebar-user"

const adminNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BoxIcon,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
  {
    title: "Support",
    url: "#",
    icon: LifeBuoyIcon,
  },
  {
    title: "Feedback",
    url: "#",
    icon: SendIcon,
  },
]

export const AppSidebar = () => {
  const { data } = authClient.useSession()

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <PackageIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">E-commerce App</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenu label="Admin" items={adminNav} />
        <NavMenu items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          user={{
            name: data?.user.name ?? "",
            email: data?.user.email ?? "",
            avatar: data?.user.image ?? undefined,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
