import { CoinLog, CoinLogSearchParams } from "@/common/types/coin-log.type"
import { PaginatedResponse } from "@/common/types/pagination.type"
import axiosInstance from "@/lib/axios"

interface DashboardResponse {
  revenue: {
    today: number
  }
}

export const fetchDashboard = async (): Promise<DashboardResponse> => {
  const response = await axiosInstance.get("/admin/dashboard")
  return response.data
}

export const fetchCoinLogs = async (
  params: CoinLogSearchParams
): Promise<PaginatedResponse<CoinLog>> => {
  const response = await axiosInstance.get("/admin/dashboard/coin-logs", {
    params,
  })
  return response.data
}
