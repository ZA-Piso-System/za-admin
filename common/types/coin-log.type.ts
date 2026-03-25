import { Device } from "@/common/types/device.type"
import { PaginationFilter } from "@/common/types/pagination.type"

export type CoinLog = {
  id: string
  amount: number
  device: Device | null
}

export interface CoinLogSearchParams extends PaginationFilter {
  from?: string
  to?: string
}
