import { PaginatedResponse } from "@/common/types/pagination.type"
import { User, UserSearchParams } from "@/common/types/user.type"
import axiosInstance from "@/lib/axios"

export const fetchUsers = async (
  params: UserSearchParams
): Promise<PaginatedResponse<User>> => {
  const response = await axiosInstance.get("/users", { params })
  return response.data
}
