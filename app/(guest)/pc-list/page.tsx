import { DeviceList } from "@/app/(guest)/pc-list/_components/device-list"
import { CurrentDate } from "@/components/shared/current-date"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

export default function PcList() {
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
          Select PC
        </h1>
        <CurrentDate />
      </div>
      <DeviceList />
    </div>
  )
}
