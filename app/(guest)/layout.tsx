"use client"

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="w-full p-4">{children}</main>
}
