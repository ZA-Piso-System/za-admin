import { FullscreenButton } from "@/components/shared/fullscreen-button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IdCardIcon, MonitorIcon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="relative flex flex-col gap-8 p-4">
      <div className="flex justify-center">
        <h1 className="font-[AudioWide] text-4xl font-bold tracking-widest uppercase">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
      </div>
      <div className="flex justify-center pt-20">
        <div className="grid w-5xl grid-cols-2 gap-8">
          <Link href="/pc-list">
            <Card>
              <CardHeader className="space-y-2">
                <div className="mx-auto">
                  <MonitorIcon size={96} />
                </div>
                <CardTitle className="text-center text-4xl font-bold uppercase">
                  PC List
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-center font-medium uppercase">
                Select PC
              </CardFooter>
            </Card>
          </Link>
          <Link href="/topup">
            <Card>
              <CardHeader className="space-y-2">
                <div className="mx-auto">
                  <IdCardIcon size={96} />
                </div>
                <CardTitle className="text-center text-4xl font-bold uppercase">
                  Top Up
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-center font-medium uppercase">
                Top up and earn points
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <FullscreenButton />
      </div>
    </div>
  )
}
