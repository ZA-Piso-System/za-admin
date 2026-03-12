import { PaginatedResponse } from "@/common/types/pagination.type"
import axiosInstance from "@/lib/axios"

interface Device {
  id: string
  status: string
}

export const fetchDevices = async (): Promise<PaginatedResponse<Device>> => {
  const response = await axiosInstance.get("/devices")
  return response.data
}

export const addTime = async (id: string, seconds: number) => {
  const response = await axiosInstance.post(`/devices/${id}/add-time`, {
    seconds,
  })
  return response.data
}

export const stopSession = async (id: string) => {
  const response = await axiosInstance.post(`/devices/${id}/stop`)
  return response.data
}
