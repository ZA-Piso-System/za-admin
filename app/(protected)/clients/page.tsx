"use client"

import { ClientCard } from "@/app/(protected)/clients/_components/client-card"
import { fetchClients } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
  const { data } = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  })

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data?.items.map((client) => (
        <ClientCard key={client.deviceId} client={client} />
      ))}
    </div>
  )
}
