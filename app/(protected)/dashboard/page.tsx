import { RecentTransactions } from "@/app/(protected)/dashboard/_components/recent-transactions"
import { SalesOverview } from "@/app/(protected)/dashboard/_components/sales-overview"
import { SectionCards } from "@/app/(protected)/dashboard/_components/section-cards"
import { Suspense } from "react"

export default function Dashboard() {
  return (
    <Suspense>
      <div className="@container/main flex flex-col gap-6 p-4">
        <SectionCards />
        <SalesOverview />
        <RecentTransactions />
      </div>
    </Suspense>
  )
}
