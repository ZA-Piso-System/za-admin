export type DeviceSession = {
  status: DeviceSessionStatus
  startAt: string | null
  endAt: string | null
  lastSeen: string | null
}

export const DeviceSessionStatus = {
  Pending: "pending",
  Active: "active",
  Expired: "expired",
  Terminated: "terminated",
} as const

export type DeviceSessionStatus =
  (typeof DeviceSessionStatus)[keyof typeof DeviceSessionStatus]
