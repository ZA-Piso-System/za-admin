import { QueryKey } from "@/common/types/query-key.type"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchDashboard } from "@/services/admin/dashboard.service"
import { useQuery } from "@tanstack/react-query"

export const TotalUsersCard = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.Dashboard],
    queryFn: fetchDashboard,
    refetchInterval: 10_000,
  })

  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Users</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {data?.totalUsers ?? "-"}
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
