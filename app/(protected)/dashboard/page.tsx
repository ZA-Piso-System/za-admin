import { DeviceCoinLogs } from "@/app/(protected)/dashboard/_components/device-coin-logs"
import { SalesOverview } from "@/app/(protected)/dashboard/_components/sales-overview"
import { SectionCards } from "@/app/(protected)/dashboard/_components/section-cards"
import { UserCoinLogs } from "@/app/(protected)/dashboard/_components/user-coin-logs"
import { Suspense } from "react"

export default function Dashboard() {
  return (
    <Suspense>
      <div className="@container/main flex flex-col gap-6 p-4">
        <SectionCards />
        <SalesOverview />
        <div className="grid grid-cols-1 gap-4 @3xl/main:grid-cols-2">
          <DeviceCoinLogs />
          <UserCoinLogs />
        </div>
      </div>
    </Suspense>
  )
}
