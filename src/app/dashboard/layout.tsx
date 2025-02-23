import { Metadata } from "next"
import { SidebarNav } from "./components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { Shell } from "@/components/shell"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your appointments and profile"
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}