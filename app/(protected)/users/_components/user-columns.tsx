"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { User } from "@/common/types/user.type"
import { secondsToHMS } from "@/common/utils/number.util"
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header"

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Username" />
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("username")}</div>
    },
    meta: {
      label: "Username",
    },
  },
  {
    accessorKey: "balanceSeconds",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Balance Seconds" />
    },
    cell: ({ row }) => {
      const balanceSeconds: number = row.getValue("balanceSeconds")
      return <div className="font-medium">{secondsToHMS(balanceSeconds)}</div>
    },
    meta: {
      label: "Balance Seconds",
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Points" />
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("points")}</div>
    },
    meta: {
      label: "Points",
    },
  },
]
