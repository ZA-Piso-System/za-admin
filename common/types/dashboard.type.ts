export interface DashboardResponse {
  revenue: {
    today: number
    monthly: number
  }
  totalUsers: number
}

export interface DashboardSearchParams {
  period: string
}
