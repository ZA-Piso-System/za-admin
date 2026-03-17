import axiosInstance from "@/lib/axios"

interface SetPasswordFormData {
  password: string
}

export const setPassword = async (formData: SetPasswordFormData) => {
  const response = await axiosInstance.post(
    "/admin/account/set-password",
    formData
  )
  return response.data
}
