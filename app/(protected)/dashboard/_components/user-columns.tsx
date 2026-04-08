"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { UserCoinLog } from "@/common/types/user-coin-log.type"
import { User } from "@/common/types/user.type"
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header"
import { format } from "date-fns"

export const userColumns: ColumnDef<UserCoinLog>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User" />
    },
    cell: ({ row }) => {
      const user = row.getValue("user") as User
      return <div className="font-medium">{user.username}</div>
    },
    meta: {
      label: "User",
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Amount" />
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("amount")}</div>
    },
    meta: {
      label: "Amount",
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string
      return (
        <div className="font-medium">
          {format(new Date(createdAt), "MMM dd, yyyy hh:mm a")}
        </div>
      )
    },
    meta: {
      label: "Created At",
    },
  },
]
