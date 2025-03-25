import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Shell } from "@/components/shell"
import { AppointmentTabs } from "./components/appointment-tabs"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Appointments | Dashboard",
  description: "Manage your appointments and sessions"
}

interface AppointmentsPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function AppointmentsPage({
  searchParams,
}: AppointmentsPageProps) {

  const params = await searchParams
  const defaultTab = params.tab === 'past' || params.tab === 'calendar' 
    ? params.tab 
    : 'upcoming'

  return (
    <Shell>
      <div className="container max-w-6xl py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">My Appointments</h1>
            <p className="text-sm text-muted-foreground">
              Schedule and manage your upcoming sessions
            </p>
          </div>
          <Link href="/">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Book New Session
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <AppointmentTabs defaultTab={defaultTab} />
        </Card>
      </div>
    </Shell>
  )
} 