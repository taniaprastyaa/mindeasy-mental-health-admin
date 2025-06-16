"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/category": "Halaman Kategori",
  "/dashboard/product": "Halaman Produk",
  "/dashboard/product/[id]": "Halaman Detail Produk",
  "/dashboard/product/[id]/update": "Halaman Update Produk",
}

function getDynamicTitle(pathname: string): string {
  if (/^\/dashboard\/product\/[^\/]+$/.test(pathname)) {
    return pageTitles["/dashboard/product/[id]"]
  }

  if (/^\/dashboard\/product\/[^\/]+\/update$/.test(pathname)) {
    return pageTitles["/dashboard/product/[id]/update"]
  }

  return pageTitles[pathname] ?? "Dashboard"
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = getDynamicTitle(pathname)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      </div>
    </header>
  )
}
