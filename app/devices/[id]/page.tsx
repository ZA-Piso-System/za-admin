"use client"

import { AddTimeDialog } from "@/app/devices/[id]/components/add-time.dialog"
import { StopSessionDialog } from "@/app/devices/[id]/components/stop-session.dialog"
import { Button } from "@/components/ui/button"

export default function ViewDevice() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div>
        <div>Device ID: todo</div>
        <div>PC No: todo</div>
        <div>Status: todo</div>
        <div>Remaining Time: todo</div>
        <div>Start Time: todo</div>
        <div>End Time: todo</div>
      </div>
      <div className="flex flex-col gap-2">
        <AddTimeDialog />
        <Button>Update Time</Button>
        <Button>Pause Session</Button>
        <StopSessionDialog />
      </div>
    </div>
  )
}
