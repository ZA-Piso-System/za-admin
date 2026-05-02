import { QueryKey } from "@/common/types/query-key.type"
import { formatCurrency } from "@/common/utils/number.util"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchDashboard } from "@/services/admin/dashboard.service"
import { useQuery } from "@tanstack/react-query"

export const RevenueCard = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.Dashboard],
    queryFn: fetchDashboard,
    refetchInterval: 10_000,
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription>Revenue Today</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(data?.revenue.today ?? 0)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Monthly Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatCurrency(data?.revenue.monthly ?? 0)}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
