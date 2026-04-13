import { PaginationFilter } from "@/common/types/pagination.type"

export type User = {
  id: string
  name?: string
  email?: string
  balanceSeconds?: number
  points?: number
  username?: string
}

export interface UserSearchParams extends PaginationFilter {
  username?: string
  from?: string
  to?: string
}
