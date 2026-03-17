import { DeviceList } from "@/app/(protected)/devices/_components/device-list"

export default function Devices() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>
        <p className="text-muted-foreground">Manage devices</p>
      </div>
      <DeviceList />
    </div>
  )
}
