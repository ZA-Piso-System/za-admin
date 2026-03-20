import { DeviceList } from "@/app/(guest)/insert-coin/_components/device-list"

export default function CoinSlot() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">
          Available Devices
        </h1>
        <p className="text-muted-foreground">
          Piliin lang ang device na gusto mong gamitin
        </p>
      </div>
      <DeviceList />
    </div>
  )
}
