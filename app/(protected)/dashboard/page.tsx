import { RecentTransactions } from "@/app/(protected)/dashboard/_components/recent-transactions"
import { SectionCards } from "@/app/(protected)/dashboard/_components/section-cards"

export default function Dashboard() {
  return (
    <div className="@container/main flex flex-col gap-6">
      <SectionCards />
      <RecentTransactions />
    </div>
  )
}
