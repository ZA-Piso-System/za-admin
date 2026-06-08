"use client"

import { QueryKey } from "@/common/types/query-key.type"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { fetchTopPlayers } from "@/services/top-player.service"
import { useQuery } from "@tanstack/react-query"
import { Trophy } from "lucide-react"

const medals = ["👑", "🥈", "🥉"]

export const TopPlayers = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.TopPlayers],
    queryFn: fetchTopPlayers,
  })

  return (
    <Card className="w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Top Players
        </CardTitle>
        <CardDescription>Monthly top-up leaderboard</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {data?.items.map((topPlayer, index) => (
          <div
            key={topPlayer.id}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2",
              index === 0 &&
                "border border-yellow-500/50 bg-yellow-500/10 shadow-sm",
              index === 1 && "border border-slate-400/50 bg-slate-500/5",
              index === 2 && "border border-amber-700/50 bg-amber-700/5"
            )}
          >
            <div className="flex items-center gap-1">
              {medals[index] ? (
                <span className="text-lg">{medals[index]}</span>
              ) : (
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold">
                  #{index + 1}
                </span>
              )}
              <span className="text-base font-semibold">
                {topPlayer.username}
              </span>
            </div>
            <span className="font-mono text-lg font-semibold">
              {topPlayer.totalTopup}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
