"use client"

import { QueryKey } from "@/common/types/query-key.type"
import { fetchPointsPackages } from "@/services/points-packages.service"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import Marquee from "react-fast-marquee"

export const PromoBanner = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.PointsPackages],
    queryFn: () => fetchPointsPackages(),
  })

  const pointsPackage = useMemo(() => {
    if (!data || data.items.length < 1) return null
    return data.items.find((item) => item.displayOrder === 1) ?? null
  }, [data])

  return (
    <Marquee className="flex text-3xl font-bold">
      <span>🔥 Top up na! ₱5 = 15 mins + 5 points</span>
      {pointsPackage ? (
        <>
          <span className="mx-4">•</span>
          <span>
            🎁 {pointsPackage.pointsCost} points = FREE{" "}
            {pointsPackage.timeSeconds / 3600} hour 🚀
          </span>
        </>
      ) : null}
    </Marquee>
  )
}
