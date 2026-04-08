"use client"

import { format } from "date-fns"

export const CurrentDate = () => {
  return <div>{format(new Date(), "PPP")}</div>
}
