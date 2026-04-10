import { DeviceList } from "@/app/(guest)/pc-list/_components/device-list"
import { PromoBanner } from "@/app/(guest)/pc-list/_components/prombo-banner"
import { CurrentDate } from "@/components/shared/current-date"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import Link from "next/link"

export default function PcList() {
  return (
    <div className="relative h-dvh">
      <div className="flex flex-col gap-8 p-4">
        <div className="flex items-center justify-between">
          <Button className="w-fit" variant="outline" size="lg" asChild>
            <Link href="/">
              <ChevronLeftIcon />
              Back
            </Link>
          </Button>
          <h1 className="font-[AudioWide] text-4xl font-bold tracking-widest uppercase">
            PC List
          </h1>
          <CurrentDate />
        </div>
        <DeviceList />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-br from-gray-900 via-purple-900 to-blue-800 py-4 text-white">
        <PromoBanner />
      </div>
    </div>
  )
}
