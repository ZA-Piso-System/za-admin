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
    <div className="@container">
      <div className="grid grid-cols-2 gap-4 p-4 @md:grid-cols-3 @lg:grid-cols-4">
        {data?.items
          .sort((a, b) => a.pcNo - b.pcNo)
          .map((client) => (
            <ClientCard key={client.deviceId} client={client} />
          ))}
      </div>
    </div>
  )
}
