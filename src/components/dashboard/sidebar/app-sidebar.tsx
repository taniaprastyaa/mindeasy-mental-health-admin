"use client"

import * as React from "react"
import {
  IconCategory,
  IconDashboard,
  IconPackage,
} from "@tabler/icons-react"

import { NavMain } from "@/components/dashboard/sidebar/nav-main"
import { NavUser } from "@/components/dashboard/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useSupabaseUser } from "@/hooks/use-supabase-user"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Kategori",
      url: "/dashboard/category",
      icon: IconCategory,
    },
    {
      title: "Produk",
      url: "/dashboard/product",
      icon: IconPackage,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSupabaseUser()
  const sidebarUser = {
    name: user?.user_metadata?.full_name || "User",
    email: user?.email || "no-email@example.com",
    avatar: user?.user_metadata?.avatar_url || "/avatar/avatar-default.png",
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="flex items-center">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="flex !size-8 items-center justify-center rounded-lg bg-main">
                      <img src="/img/logo-icon.svg" alt="Avara Logo" className="w-5 h-5 object-contain"/>
                    </div>
                    <span className="title-font text-2xl text-main">Avara</span>
                </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
