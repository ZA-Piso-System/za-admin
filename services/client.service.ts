import { Client } from "@/common/types/client.type"
import { PaginatedResponse } from "@/common/types/pagination.type"
import axiosInstance from "@/lib/axios"

export const fetchClients = async (): Promise<PaginatedResponse<Client>> => {
  const response = await axiosInstance.get("/clients")
  return response.data
}

export const fetchClientById = async (id: string): Promise<Client> => {
  const response = await axiosInstance.get(`/clients/${id}`)
  return response.data
}

export const addTime = async (id: string, seconds: number) => {
  const response = await axiosInstance.post(`/clients/${id}/add-time`, {
    seconds,
  })
  return response.data
}

export const stopSession = async (id: string) => {
  const response = await axiosInstance.post(`/clients/${id}/stop`)
  return response.data
}
