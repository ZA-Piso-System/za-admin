import { DeviceList } from "@/app/(guest)/insert-coin/_components/device-list"
import { FullscreenButton } from "@/app/(guest)/insert-coin/_components/fullscreen-button"

export default function InsertCoin() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col select-none">
        <h1 className="text-2xl font-semibold tracking-tight">
          Available Devices
        </h1>
        <p className="text-muted-foreground">
          Pumili ng device na gusto mong gamitin
        </p>
      </div>
      <div className="absolute top-4 right-4">
        <FullscreenButton />
      </div>
      <DeviceList />
    </div>
  )
}
