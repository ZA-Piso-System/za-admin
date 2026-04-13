import { UserList } from "@/app/(protected)/users/_components/user-list"

export default function Users() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage users</p>
        </div>
      </div>
      <UserList />
    </div>
  )
}
