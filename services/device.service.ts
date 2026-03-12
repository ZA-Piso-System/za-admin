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
