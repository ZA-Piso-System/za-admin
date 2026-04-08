import { UserList } from "@/app/(guest)/topup/_components/user-list"
import { CurrentDate } from "@/components/shared/current-date"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

export default function TopUp() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <Button className="w-fit" variant="outline" size="lg" asChild>
          <Link href="/">
            <ChevronLeftIcon />
            Back
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Select User
        </h1>
        <CurrentDate />
      </div>
      <UserList />
    </div>
  )
}
