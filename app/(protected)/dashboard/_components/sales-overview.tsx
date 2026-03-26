"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import { Option } from "@/common/types/option.type"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { QueryKey } from "@/common/types/query-key.type"
import { fetchSalesOverview } from "@/services/admin/dashboard.service"

const ranges: Option[] = [
  {
    label: "This week",
    value: "this_week",
  },
  {
    label: "This month",
    value: "this_month",
  },
  {
    label: "Last 3 months",
    value: "last_3_months",
  },
  {
    label: "This year",
    value: "this_year",
  },
]

const chartConfig = {
  amount: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export const SalesOverview = () => {
  const [period, setPeriod] = useState<string>("this_week")

  const { data } = useQuery({
    queryKey: [QueryKey.SalesOverview, period],
    queryFn: () => fetchSalesOverview({ period }),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          Total sales for the selected time period
        </CardDescription>
        <CardAction>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="flex w-40" aria-label="Select a range">
              <SelectValue placeholder="This week" />
            </SelectTrigger>
            <SelectContent>
              {ranges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `₱${value.toLocaleString()}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-amount)" radius={8}>
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
