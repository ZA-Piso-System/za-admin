import { CoinLog, CoinLogSearchParams } from "@/common/types/coin-log.type"
import {
  DashboardResponse,
  DashboardSearchParams,
} from "@/common/types/dashboard.type"
import { Option } from "@/common/types/option.type"
import { PaginatedResponse } from "@/common/types/pagination.type"
import axiosInstance from "@/lib/axios"

export const fetchDashboard = async (): Promise<DashboardResponse> => {
  const response = await axiosInstance.get("/admin/dashboard")
  return response.data
}

export const fetchSalesOverview = async (
  params: DashboardSearchParams
): Promise<Option[]> => {
  const response = await axiosInstance.get("/admin/dashboard/sales-overview", {
    params,
  })
  return response.data
}

// TODO: refactor
export const fetchCoinLogs = async (
  params: CoinLogSearchParams
): Promise<PaginatedResponse<CoinLog>> => {
  const response = await axiosInstance.get("/admin/dashboard/coin-logs", {
    params,
  })
  return response.data
}
