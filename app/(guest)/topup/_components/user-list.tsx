"use client"

import { TopUpDialog } from "@/app/(guest)/topup/_components/top-up.dialog"
import { QueryKey } from "@/common/types/query-key.type"
import { User } from "@/common/types/user.type"
import { SearchInput } from "@/components/shared/input/search.input"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getQueryClient } from "@/lib/react-query"
import { insertCoin } from "@/services/coin-slot.service"
import { fetchUsers } from "@/services/user.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const COUNTDOWN = 30
const COOLDOWN = 5

export const UserList = () => {
  const queryClient = getQueryClient()

  const searchParams = useSearchParams()
  const username = searchParams.get("username") ?? undefined

  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [countdown, setCountdown] = useState<number>(COUNTDOWN)
  const [cooldown, setCooldown] = useState<number>(COOLDOWN)

  const { data } = useQuery({
    queryKey: [QueryKey.Users, searchParams.toString()],
    queryFn: () => fetchUsers({ username }),
    enabled: !!username,
  })

  const insertCoinMutation = useMutation({
    mutationFn: (user: User) => insertCoin(user.id, "user"),
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    },
    onSuccess: (_, user) => {
      setSelectedUser(user)
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          setSelectedUser(null)
          queryClient.resetQueries({ queryKey: [QueryKey.CoinSlots] })
          return 0
        }
        return prev - 1
      })

      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCountdown(COUNTDOWN)
    setCooldown(COOLDOWN)
  }, [selectedUser])

  const handleClick = (user: User) => {
    insertCoinMutation.mutate(user)
  }

  return (
    <div className="@container flex flex-col gap-4">
      <SearchInput searchKey="username" placeholder="Search username" />
      <div className="grid grid-cols-2 gap-4 @md:grid-cols-3 @lg:grid-cols-4">
        {data?.items.map((user) => (
          <div key={user.id} onClick={() => handleClick(user)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl font-bold">
                  {user.username}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <TopUpDialog
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        countdown={countdown}
        setCountdown={setCountdown}
        cooldown={cooldown}
        setCooldown={setCooldown}
      />
    </div>
  )
}
