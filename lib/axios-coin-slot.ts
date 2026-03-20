import axios from "axios"

const axiosCoinSlot = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_COIN_SLOT,
  withCredentials: true,
})

export default axiosCoinSlot
