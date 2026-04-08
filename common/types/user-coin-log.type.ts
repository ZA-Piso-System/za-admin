import { User } from "@/common/types/user.type"

export type UserCoinLog = {
  id: string
  amount: number
  user: User | null
}
