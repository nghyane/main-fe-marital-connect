import { Metadata } from "next"
import { SidebarNav } from "./components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { Shell } from "@/components/shell"
import { getProfile } from "@/app/actions/user"
import { UserProvider } from "./provider"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your appointments and profile"
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getProfile();

  // Redirect if no user or invalid role
  if (!user?.data || !['user', 'expert'].includes(user.data.role.name)) {
    return <div>You are not authorized to access this page</div>
  }

  return (
    <UserProvider initialUser={user}>
      <div className="flex min-h-screen flex-col bg-muted/5">
        <DashboardHeader />
        <Shell variant="dashboard" className="flex-1 items-start py-6">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-6">
            <aside className="hidden h-full w-full shrink-0 md:block">
              <SidebarNav />
            </aside>
            <main className="flex w-full flex-col">
              {children}
            </main>
          </div>
        </Shell>
      </div>
    </UserProvider>
  )
}