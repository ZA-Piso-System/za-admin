"use client"

import { columns } from "@/app/(protected)/dashboard/_components/columns"
import { userColumns } from "@/app/(protected)/dashboard/_components/user-columns"
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "@/common/constants/pagination.constant"
import { QueryKey } from "@/common/types/query-key.type"
import { DataTable } from "@/components/shared/data-table/data-table"
import { DataTablePagination } from "@/components/shared/data-table/data-table-pagination"
import { DataTableViewOptions } from "@/components/shared/data-table/data-table-view-options"
import { fetchUserCoinLogs } from "@/services/admin/dashboard.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { endOfDay, startOfDay } from "date-fns"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const UserCoinLogs = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const { isPending, data } = useQuery({
    queryKey: [QueryKey.UserCoinLogs, searchParams.toString()],
    queryFn: () =>
      fetchUserCoinLogs({
        from: startOfDay(new Date()).toISOString(),
        to: endOfDay(new Date()).toISOString(),
        page: searchParams.get("page") ?? undefined,
        page_size: searchParams.get("page_size") ?? undefined,
      }),
    placeholderData: keepPreviousData,
    refetchInterval: 10_000,
  })

  const handleOnPaginationChange = (
    updater: PaginationState | ((old: PaginationState) => PaginationState)
  ) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", (newPagination.pageIndex + 1).toString())
    params.set("page_size", newPagination.pageSize.toString())

    router.push(pathname + "?" + params.toString())
  }

  const handleOnColumnFiltersChange = (
    updater:
      | ColumnFiltersState
      | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => {
    const newFilters =
      typeof updater === "function" ? updater(columnFilters) : updater

    const params = new URLSearchParams(searchParams.toString())

    params.delete("status")

    newFilters.forEach((filter) => {
      if (Array.isArray(filter.value)) {
        params.set(filter.id, filter.value.join(","))
      } else {
        params.set(filter.id, filter.value as string)
      }
    })

    router.push(pathname + "?" + params.toString())
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data?.items ?? [],
    columns: userColumns,

    getCoreRowModel: getCoreRowModel(),

    manualPagination: true,
    pageCount: data?.metadata.total_pages,
    onPaginationChange: handleOnPaginationChange,

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    manualFiltering: true,
    onColumnFiltersChange: handleOnColumnFiltersChange,

    enableRowSelection: false,

    state: {
      pagination,
      sorting,
      columnFilters,
    },
  })

  useEffect(() => {
    const parsedPage = Number(searchParams.get("page") ?? DEFAULT_PAGE)
    const parsedPageSize = Number(
      searchParams.get("page_size") ?? DEFAULT_PAGE_SIZE
    )
    const statuses = searchParams.get("status")?.split(",") ?? []

    const pageIndex = isNaN(parsedPage) ? DEFAULT_PAGE_INDEX : parsedPage - 1
    const pageSize = isNaN(parsedPageSize) ? DEFAULT_PAGE_SIZE : parsedPageSize

    const newFilters: ColumnFiltersState = []

    if (statuses.length > 0) {
      newFilters.push({
        id: "status",
        value: statuses,
      })
    }

    setPagination({ pageIndex, pageSize })
    setColumnFilters(newFilters)
  }, [searchParams])

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">User Coin Logs</h2>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <DataTable table={table} isPending={isPending} />
      <DataTablePagination table={table} />
    </div>
  )
}
