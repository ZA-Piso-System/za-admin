"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchDevices } from "@/services/device.service"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function Page() {
  const { data } = useQuery({
    queryKey: ["devices"],
    queryFn: () => fetchDevices(),
  })

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data?.items.map((device) => (
        <Link key={device.id} href={`/devices/${device.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{device.id}</CardTitle>
              <CardDescription>{device.status}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
