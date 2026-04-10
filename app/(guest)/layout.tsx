"use client"

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="w-full">{children}</main>
}
