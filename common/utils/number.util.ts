export const formatCurrency = (amount?: number | null): string => {
  if (amount === undefined || amount === null) return "-"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount)
}

export const secondsToHMS = (value: number): string => {
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60

  const formatted = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":")

  return formatted
}
