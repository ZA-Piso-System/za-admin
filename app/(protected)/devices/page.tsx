import { DeviceList } from "@/app/(protected)/devices/_components/device-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Devices() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
          <p className="text-muted-foreground">Manage devices</p>
        </div>
        <div className="flex items-center justify-end">
          <Button asChild>
            <Link href="/devices/create">Create</Link>
          </Button>
        </div>
      </div>
      <DeviceList />
    </div>
  )
}
