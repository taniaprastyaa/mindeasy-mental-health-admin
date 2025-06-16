"use client";

import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { DataTable } from "@/components/dashboard/datatable/datatable";
import { DataTablePagination } from "@/components/dashboard/datatable/datatable-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useStatisticStore } from "@/stores/statisticStore";
import { getLatestProductColumns } from "@/components/dashboard/datatable/columns/latest-product";
import { TableSearch } from "./datatable/table-search";

export default function LatestProductDatatable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const { latestProducts, fetchLatestProducts, loading} = useStatisticStore();

  useEffect(() => {
    const getLatestProduct = async () => {
      try {
        await fetchLatestProducts();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An error occurred while retrieving order overview");
        }
      }
    };
    getLatestProduct();
  }, [fetchLatestProducts]);

  const table = useReactTable({
    data: latestProducts,
    columns: getLatestProductColumns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });  

  return (
    <div className="px-4 lg:px-6">
      <Card>
        <CardHeader>
            <CardTitle>Produk Terbaru</CardTitle>
            <div className="flex gap-5 items-center mt-2">
                <TableSearch value={globalFilter} onChange={setGlobalFilter} />
            </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>menyimpan...</p>
          ) : (
            <>
              <DataTable table={table} columnsLength={getLatestProductColumns().length} />
              <DataTablePagination table={table} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}