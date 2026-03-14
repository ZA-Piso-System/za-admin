import axiosInstance from "@/lib/axios"

interface SetPasswordFormData {
  password: string
}

export const setPassword = async (formData: SetPasswordFormData) => {
  const response = await axiosInstance.post("/account/set-password", formData)
  return response.data
}
