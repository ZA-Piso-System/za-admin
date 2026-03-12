import { type LucideIcon } from "lucide-react"

export interface Menu {
  title: string
  url: string
  icon: LucideIcon
  items?: {
    title: string
    url: string
  }[]
}
