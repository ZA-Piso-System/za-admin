export const formatCurrency = (amount?: number | null): string => {
  if (amount === undefined || amount === null) return "-"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount)
}
