"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { CoinLog } from "@/common/types/coin-log.type"
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header"
import { Device } from "@/common/types/device.type"
import { format } from "date-fns"

export const deviceColumns: ColumnDef<CoinLog>[] = [
  {
    accessorKey: "device",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Device" />
    },
    cell: ({ row }) => {
      const device = row.getValue("device") as Device
      return <div className="font-medium">{device.deviceNumber}</div>
    },
    meta: {
      label: "Device",
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
