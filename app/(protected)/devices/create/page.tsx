import { DeviceForm } from "@/app/(protected)/devices/create/_components/device-form"

export default function CreateDevice() {
  return (
    <div className="@container flex flex-col gap-8">
      <h1 className="text-xl font-bold">Create Device</h1>
      <DeviceForm />
    </div>
  )
}
