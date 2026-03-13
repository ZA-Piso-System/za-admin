"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchClients } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

export default function Page() {
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  })

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data?.items.map((client) => (
        <Link key={client.deviceId} href={`/clients/${client.deviceId}`}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {client.pcNo}
              </CardTitle>
              <CardDescription>{client.status}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
