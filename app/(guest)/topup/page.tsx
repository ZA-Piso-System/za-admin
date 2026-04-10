import { UserList } from "@/app/(guest)/topup/_components/user-list"
import { CurrentDate } from "@/components/shared/current-date"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default function TopUp() {
  return (
    <Suspense>
      <div className="flex flex-col gap-8 p-4">
        <div className="flex items-center justify-between">
          <Button className="w-fit" variant="outline" size="lg" asChild>
            <Link href="/">
              <ChevronLeftIcon />
              Back
            </Link>
          </Button>
          <h1 className="font-[AudioWide] text-4xl font-bold tracking-widest uppercase">
            Top Up
          </h1>
          <CurrentDate />
        </div>
        <UserList />
      </div>
    </Suspense>
  )
}
