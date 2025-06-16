"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { LatestProductView } from "@/types";

export function getLatestProductColumns(): ColumnDef<LatestProductView>[] {
  return [
    {
      accessorKey: "product_name",
      header: "Nama Produk",
    },

    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => (
        <div className="font-medium">
          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(row.getValue("price"))}
        </div>
      ),
    },
    {
      accessorKey: "created_at_formatted",
      header: "Dibuat Pada",
    },
    {
      accessorKey: "category_name",
      header: "Kategori",
    },
    {
      accessorKey: "feature_list",
      header: "Fitur",
    },
  ]
}
