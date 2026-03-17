import { CreateDevice, Device } from "@/common/types/device.type"
import { PaginatedResponse } from "@/common/types/pagination.type"
import axiosInstance from "@/lib/axios"

export const fetchDevices = async (): Promise<PaginatedResponse<Device>> => {
  const response = await axiosInstance.get("/admin/devices")
  return response.data
}

export const createDevice = async (formData: CreateDevice) => {
  const response = await axiosInstance.post("/admin/devices", formData)
  return response.data
}

export const fetchDeviceById = async (id: string): Promise<Device> => {
  const response = await axiosInstance.get(`/admin/devices/${id}`)
  return response.data
}

export const addTime = async (id: string, seconds: number) => {
  const response = await axiosInstance.post(`/admin/devices/${id}/add-time`, {
    seconds,
  })
  return response.data
}

export const stopSession = async (id: string) => {
  const response = await axiosInstance.post(`/admin/devices/${id}/stop`)
  return response.data
}
