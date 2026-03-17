import { DeviceSession } from "@/common/types/device-session.type"

export type Device = {
  id: string
  deviceNumber: number
  macAddress: string
  type: string
  registrationToken: string
  status: DeviceStatus
  deviceSessions: DeviceSession[]
}

export const DeviceStatus = {
  Pending: "pending",
  Offline: "offline",
  Online: "online",
} as const

export type CreateDevice = {
  deviceNumber: number | null
  type: string
}

export type DeviceStatus = (typeof DeviceStatus)[keyof typeof DeviceStatus]
