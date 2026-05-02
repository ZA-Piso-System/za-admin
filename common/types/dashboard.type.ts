export interface DashboardResponse {
  revenue: {
    today: number
  }
  totalUsers: number
}

export interface DashboardSearchParams {
  period: string
}
