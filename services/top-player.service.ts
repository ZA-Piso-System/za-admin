import { PaginatedResponse } from "@/common/types/pagination.type"
import { TopPlayer } from "@/common/types/top-player.type"
import axiosInstance from "@/lib/axios"

export const fetchTopPlayers = async (): Promise<
  PaginatedResponse<TopPlayer>
> => {
  const response = await axiosInstance.get("/top-players")
  return response.data
}
