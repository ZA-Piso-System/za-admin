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
